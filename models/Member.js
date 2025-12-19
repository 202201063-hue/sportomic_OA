import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  member_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  membershipType: { type: String, default: 'basic' }, // e.g., basic, premium
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Member', memberSchema);