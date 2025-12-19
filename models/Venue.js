import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  venue_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true }
});

export default mongoose.model("Venue", venueSchema);
