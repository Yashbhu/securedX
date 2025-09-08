import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import alertsRoutes from './routes/alert.js'; // import alerts route

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertsRoutes); // connect alerts route

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected ✅');
    app.listen(5000, () => console.log('Server running on port 5000 ✅'));
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};

startServer();
