require('dotenv').config(); // Load environment variables

if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.error('Missing required environment variables.');
    process.exit(1);
}

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware (should always come last)
app.use(errorHandler);

console.log({ userRoutes, errorHandler });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
