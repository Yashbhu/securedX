import express from 'express';
import Alert from '../models/Alert.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new alert
router.post('/', authenticate, async (req, res) => {
  const { type, message } = req.body;
  try {
    const alert = await Alert.create({ type, message, userId: req.user.id });
    res.status(201).json({ message: 'Alert created', alert });
  } catch (err) {
    res.status(500).json({ message: 'Error creating alert', error: err.message });
  }
});

// Get all alerts for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alerts', error: err.message });
  }
});

// Delete an alert by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const alert = await Alert.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json({ message: 'Alert deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting alert', error: err.message });
  }
});

export default router;
