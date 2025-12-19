import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  booking_id: { type: Number, required: true, unique: true },
  venue_id: { type: Number, required: true },
  member_id: { type: Number, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'completed', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);