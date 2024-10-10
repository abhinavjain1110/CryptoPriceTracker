const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const fetchPrices = require('./jobs/fetchPrices');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');

const app = express();

app.use(express.json());

app.use('/api', statsRoute);
app.use('/api', deviationRoute);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    fetchPrices();  
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
