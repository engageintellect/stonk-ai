#!/usr/bin/env python3

from fastapi import FastAPI, Query, HTTPException
import json
import pandas as pd
import os
import uvicorn
import logging
from openai import OpenAI
import yfinance as yf
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import datetime
from scipy.stats import norm

app = FastAPI()

logging.basicConfig(filename='log.txt', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

config_file_path = '/etc/python-gpt.json'
openai_api_key = None

if os.path.exists(config_file_path):
    with open(config_file_path) as config_file:
        openai_api_key = json.load(config_file).get('OPENAI_API_KEY', "")
else:
    raise FileNotFoundError(f"Config file not found at {config_file_path}")

client = OpenAI(api_key=openai_api_key)


@app.get("/", tags=["root"])
def root():
    msg = {"message": "Hello, World!", "version": "0.0.5"}
    logging.info("GET / called")
    return msg


@app.get("/api/hello")
def hello():
    msg = {"message": "Hello, World!", "version": "0.0.5"}
    logging.info("GET /api/hello called")
    return msg


@app.post("/api/chat")
def chat(data: dict):
    message = data.get("message")
    logging.info(f"GET /api/chat AI API called with message.")

    if message:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            temperature=0.7,
            messages=[
                {"role": "system", "content": "You are a helpful assistant. You also happen to be great at finding value. Give your opinion on the stock data provided to you."},
                {"role": "user", "content": message}
            ]
        )
        logging.info(
            f"GET /api/chat AI API responding with: {response.choices[0].message.content}")
        return {
            "message": response.choices[0].message.content,
        }
    else:
        raise HTTPException(
            status_code=400, detail="Invalid request to OpenAI")


@app.get("/api/interestRates")
def fetch_treasury_bill_rate():
    tbill_data = yf.Ticker('^IRX')
    tbill_history = tbill_data.history(period='1y')
    recent_rate = tbill_history['Close'].iloc[-1]
    return recent_rate


@app.get("/api/stock/{ticker}")
def get_stock_data(ticker: str):
    try:
        logging.info(f"GET /api/stock API called for ticker: {ticker}")
        # stock_data = yf.download(ticker, period="10y")

        stock_data = yf.download(tickers=ticker, period='10y', interval='1d')
        pd.set_option('display.max_rows', None)
        df = pd.DataFrame(stock_data)
        close_prices = df
        # convert close_prices to dictionary
        close_prices = close_prices.to_dict()
        # Convert DataFrame to a list of dictionaries
        close_prices_list = df.reset_index().to_dict(orient='records')

        # Format the timestamp as string
        for item in close_prices_list:
            item['Date'] = item['Date'].strftime('%Y-%m-%d %H:%M:%S')
            # Print the list of dictionaries

        ticker_data = yf.Ticker(ticker)
        ticker_info_dict = ticker_data.info
        news = ticker_data.news
        dividends = ticker_data.dividends
        actions = ticker_data.actions
        major_holders = ticker_data.major_holders
        options = ticker_data.options
        # financials = ticker_data.financials
        # financials_list = []
        # financials_dict = financials.to_dict()
        # for index, values in financials_dict.items():
        # for metric, value in values.items():
        # if not pd.isnull(value):
        # financials_list.append({
        # "timestamp": index.strftime('%Y-%m-%d'),
        # "metric": metric,
        # "value": value
        # })
        # print(financials_list)

        logging.info(f"GET /api/stock API Returning stock data for {ticker}")

        payload = {
            "ticker": ticker,
            "ticker_info": ticker_info_dict,
            "dividends": dividends,
            "major_holders": major_holders,
            "news": news,
            "actions": actions,
            "price_history": close_prices_list,
            "options": options,
            # "financials": financials_list
        }
        return payload

    except Exception as e:
        logging.error(f"Error fetching stock data for {ticker}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/predict/{ticker}")
def get_stock_prediction(ticker: str):
    try:
        logging.info(
            f"GET /api/predict AI prediction API called for ticker: {ticker}")
        stock_data = yf.download(ticker, period="1y")
        close_prices = np.array(stock_data['Close']).reshape(-1, 1)
        scaler = MinMaxScaler(feature_range=(0, 1))
        close_prices_scaled = scaler.fit_transform(close_prices)

        X, y = [], []
        look_back = 90
        for i in range(look_back, len(close_prices_scaled)):
            X.append(close_prices_scaled[i-look_back:i, 0])
            y.append(close_prices_scaled[i, 0])
        X, y = np.array(X), np.array(y)

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42)

        X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
        X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

        model = Sequential([
            LSTM(units=50, return_sequences=True,
                 input_shape=(X_train.shape[1], 1)),
            LSTM(units=50),
            Dense(units=1)
        ])
        model.compile(optimizer='adam', loss='mean_squared_error')
        model.fit(X_train, y_train, epochs=20, batch_size=32, verbose=0)

        predicted_prices_scaled = []
        last_days = close_prices_scaled[-look_back:]
        for _ in range(30):
            prediction = model.predict(np.array([last_days]))
            predicted_prices_scaled.append(prediction[0, 0])
            last_days = np.roll(last_days, shift=-1)
            last_days[-1] = prediction

        predicted_prices = scaler.inverse_transform(
            np.array(predicted_prices_scaled).reshape(-1, 1))
        predicted_prices = [price for sublist in predicted_prices.tolist()
                            for price in sublist]

        current_date = datetime.date.today()
        dates_ascending = [
            current_date + datetime.timedelta(days=i) for i in range(len(predicted_prices))
        ]

        price_objects = [{"id": i+1, "date": str(date), "price": price}
                         for i, (date, price) in enumerate(zip(dates_ascending, predicted_prices))]

        payload = {
            "predicted_prices": price_objects
        }
        logging.info(f"GET /api/predict prediction for ticker {ticker}")

        return payload

    except Exception as e:
        logging.error(f"Error predicting stock data for ticker {ticker}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/options/{ticker}/{date}")
def get_stock_data(ticker: str, date: str):
    try:
        logging.info(f"GET /api/options API called for ticker: {ticker}")

        stock = yf.Ticker(ticker)
        options = stock.options
        logging.info(f"Options for {ticker}: {options}")

        opt = stock.option_chain(
            date

        )
        # Replace NaN values with None
        calls = opt.calls.replace({np.nan: None}).to_dict(orient='records')
        puts = opt.puts.replace({np.nan: None}).to_dict(orient='records')

        logging.info(f"GET /api/options Returning stock data for {ticker}")

        payload = {
            "options": {
                "calls": calls,
                "puts": puts
            }
        }
        return payload

    except Exception as e:
        logging.error(f"Error fetching stock data for {ticker}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/options/getDelta/")
async def calculate_option_delta(
    S: float = Query(..., description="Current price of the underlying asset (e.g., stock price)"),
    K: float = Query(..., description="Strike price of the option"),
    T: float = Query(..., description="Time to expiration in years"),
    r: float = Query(..., description="Risk-free interest rate"),
    sigma: float = Query(...,
                         description="Volatility of the underlying asset"),
):
    # Calculate d1
    d1 = (np.log(S / K) + (r + (sigma ** 2) / 2) * T) / (sigma * np.sqrt(T))

    # Calculate delta
    delta = norm.cdf(d1)

    return {"option_delta": delta}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    # uvicorn.run("main:app", host="0.0.0.0", port=8000, ssl_keyfile="/etc/letsencrypt/live/engage-dev.com/privkey.pem", ssl_certfile="/etc/letsencrypt/live/engage-dev.com/fullchain.pem")
