import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "signup", "login"
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
