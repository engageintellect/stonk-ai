# ( UNDER CONSTRUCTION...)

# stonk-ai

## Description

An AI-powered stock market analysis and prediction engine that uses OpenAI's GPT-3.5/4/4o to analyze historic financial data, news headlines, and YouTube videos and predict future stock prices and performance.

[![Stonk AI Logo](/assets/stonkai.png)](https://stonkai.xyz)

## Features

- [x] Search for stock symbols and get detailed information about the stock
- [x] AI sentiment analysis of stock news headlines
- [x] AI future price predictions
- [x] Get the latest news about a stock
- [x] Get the latest YouTube videos about a stock
- [x] Options data
- [x] Custom Themes
- [ ] User Authentication - Coming soon...
- [ ] User Posts - Coming soon...
- [ ] User Sentiment - Coming soon...
- [ ] Market fear and greed - Coming soon...

[![Stonk AI Logo](/assets/stonkai-sentiment.png)](https://stonkai.xyz)

## Installation:

### First things first, some info...

This is a full-stack repository that contains both the client and server code.

You can run both the client and the server code locally. For deployment, I recommend using a cloud service like Vercel for the client and Heroku or a VPS for the server. The current deployment of this application is as follows:

- Client: Vercel
- Server: Ubuntu 20.04 VPS (Nginx, Uvicorn, SystemD)

### Prerequisites

#### Client

##### Environment Variables

1. YOUTUBE_API_KEY: You will need to create a YouTube API key and set it as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

2. OPENAI_API_KEY: You will need to create an OpenAI API key and set it as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

3. SERVER_URL: You will need to set the server url as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

```bash
SERVER_URL=YOUR_SERVER_URL (e.g. http://localhost:8000)
```

#### Server

1. A way to run Python code (e.g. a VPS, Heroku, etc.)
2. A way to run FastAPI (e.g. Uvicorn, Gunicorn, etc.)
3. A way to proxy requests to the FastAPI server (e.g. Nginx, Caddy, etc.)

## Getting Started:

## Running client

1. Clone the repository

```bash
git clone https://github.com/engageintellect/stonk-ai.git
cd stonk-ai/client
```

2. Create a .env (or .env.local) file in the root of the project and add the following line:

```bash
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
SERVER_URL=YOUR_SERVER_URL
```

3. Install the dependencies

```bash
pnpm install
```

4. Run the development server

```bash
pnpm run dev
```

## Deployment

### Client

#### Build client

```bash
pnpm run build
```

### Server

1. Navigate to the server directory

```bash
cd stonk-ai/server
```

2. Create a new Python virtual environment

```bash
python3 -m venv venv && source venv/bin/activate
```

3. Install the dependencies

```
pip3 install -r requirements.txt
```

4. Run the server code

```
python3 main.py
```

**NOTE:** Take note of the server URL. You will need it to set the SERVER_URL environment variable in the client.

#### Logs

server logs can be found in `/stonk-ai/server/log.txt`.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request

## License

MIT License

## Acknowledgements

- [OpenAI](https://openai.com)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs)
- [Alpha Vantage API](https://www.alphavantage.co/documentation/)
- [IEX Cloud API](https://iexcloud.io/docs/api/)
- [Polygon.io API](https://polygon.io/docs/getting-started)
- [Yahoo Finance API](https://www.yahoofinanceapi.com/)
- [Finage API](https://finage.co.uk/docs)
- [Finnhub API](https://finnhub.io/docs/api)
- [Stock News API](https://stocknewsapi.com/)
- [Stocktwits API](https://api.stocktwits.com/developers/docs)
- [Twitter API](https://developer.twitter.com/en/docs)
- [Reddit API](https://www.reddit.com/dev/api/)
- [News API](https://newsapi.org/docs)
