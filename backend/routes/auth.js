import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Check capitalization
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, role });
    res.json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// other routes...

export default router;
