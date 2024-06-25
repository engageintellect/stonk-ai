# stonk-ai

## Description

An AI-powered stock market analysis and prediction engine that uses OpenAI's GPT-3.5/4/4o to analyze historic financial data, news headlines, and YouTube videos and predict future stock prices and performance.

![Stonk AI Logo](/assets/images/stonkai.png)

## Installation:

### Prerequisites

#### Client

1. YOUTUBE_API_KEY: You will need to create a YouTube API key and set it as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

2. OPENAI_API_KEY: You will need to create an OpenAI API key and set it as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

#### Server

1.
2.
3.

## Getting Started:

### Client

```bash
YOUTUBE_API_KEY=your_api_key
```

OPENAI_API_KEY: You will need to create an OpenAI API key and set it as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

```bash
OPENAI_API_KEY=your_api_key
```

SERVER_URL: You will need to set the server url as an environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

```bash
SERVER_URL=your_server_url (e.g. http://localhost:8000)
```

## Running client

```bash
cd ai-stock-client
```

### Install dependencies

```bash
pnpm install
```

### Run client

```bash
pnpm run dev
```

### Build client

```bash
pnpm run build
```

### Server

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
