const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const reviewRoutes = require('./routes/reviewRoutes');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for Review Service'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Review Service running on port ${PORT}`));
