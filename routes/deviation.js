const express = require('express');
const Crypto = require('../models/cryptoModel');
const router = express.Router();

const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
};

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin parameter' });
  }

  try {
    const priceRecords = await Crypto.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100);

    if (priceRecords.length === 0) {
      return res.status(404).json({ error: 'Not enough data for standard deviation calculation' });
    }

    const prices = priceRecords.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
