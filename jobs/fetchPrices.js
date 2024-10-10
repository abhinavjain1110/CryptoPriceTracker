const axios = require('axios');
const Crypto = require('../models/cryptoModel');
const cron = require('node-cron');
const { COINGECKO_API_URL } = require('../config');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchPrices() {
  try {
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    const priceData = coins.map((coin) => ({
      coinId: coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    }));

    await Crypto.insertMany(priceData);
    console.log('Prices fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

cron.schedule('0 */2 * * *', fetchPrices);

module.exports = fetchPrices;
