# Crypto Price Tracker

A Node.js application that tracks the current price, market cap, and 24-hour change for three cryptocurrencies: Bitcoin, Matic (Polygon), and Ethereum. The app fetches the data every 2 hours from the CoinGecko API and stores it in a MongoDB database. It also provides two APIs:

1. `/stats` - Fetches the latest cryptocurrency data.
2. `/deviation` - Returns the standard deviation of the price for the last 100 records.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [APIs](#apis)
  - [Get Latest Stats](#get-latest-stats)
  - [Get Price Deviation](#get-price-deviation)
- [Background Job](#background-job)
- [License](#license)

## Features

- Fetches and stores price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum.
- Runs a background job every 2 hours to update the data.
- Provides APIs to fetch the latest stats and calculate the standard deviation of cryptocurrency prices.

## Technologies Used

- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework for building the API.
- **MongoDB** - NoSQL database for storing cryptocurrency data.
- **Axios** - For making HTTP requests to the CoinGecko API.
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Node-Cron** - For scheduling the background job to fetch prices every 2 hours.
- **CoinGecko API** - Cryptocurrency price and market data provider.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
```

2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `config.js` file in the root of the project and add your MongoDB connection string:

```js
module.exports = {
  MONGODB_URI: 'your_mongodb_connection_string',  // Update this with your MongoDB URI
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3/simple/price',
};
```

4. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## Project Structure

```bash
crypto-price-tracker/
│
├── models/
│   └── cryptoModel.js      # Mongoose schema for storing cryptocurrency data
├── routes/
│   ├── stats.js            # API to get the latest stats of a cryptocurrency
│   └── deviation.js        # API to calculate standard deviation of the cryptocurrency prices
├── jobs/
│   └── fetchPrices.js      # Background job to fetch crypto prices every 2 hours
├── app.js                  # Main server file
├── config.js               # Configuration file for MongoDB URI and CoinGecko URL
├── package.json            # Project dependencies and scripts
└── package-lock.json       # Auto-generated file with detailed dependency tree
```

## APIs

### **Get Latest Stats**

**Endpoint:** `/api/stats`

**Method:** `GET`

**Query Params:**

- `coin`: Cryptocurrency name, either `bitcoin`, `matic-network`, or `ethereum`.

**Example Request:**

```bash
GET /api/stats?coin=bitcoin
```

**Response:**

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### **Get Price Deviation**

**Endpoint:** `/api/deviation`

**Method:** `GET`

**Query Params:**

- `coin`: Cryptocurrency name, either `bitcoin`, `matic-network`, or `ethereum`.

**Example Request:**

```bash
GET /api/deviation?coin=bitcoin
```

**Response:**

```json
{
  "deviation": 4082.48
}
```

## Background Job

The application includes a background job that fetches the latest price, market cap, and 24-hour change data for Bitcoin, Matic, and Ethereum. This job runs every 2 hours and stores the data in MongoDB.

To ensure the job is working:

1. Start the server using `npm start`.
2. The job will fetch the latest prices from CoinGecko and store them in the database. You can check the logs for updates.

## License

This project is licensed under the MIT License.
