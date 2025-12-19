import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true },
  booking_id: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed'], default: 'success' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);