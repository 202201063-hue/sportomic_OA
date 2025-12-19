import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Venue from "./models/Venue.js";
import Member from "./models/Member.js";
import Booking from "./models/Booking.js";
import Transaction from "./models/Transaction.js";

dotenv.config();

const app = express();
app.use(express.json());

/* CONNECT TO DB */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

/* API ROUTES */

// 1. Total Revenue
app.get("/api/total-revenue", async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = result.length > 0 ? result[0].total : 0;
    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Member Status Count
app.get("/api/member-status", async (req, res) => {
  try {
    const active = await Member.countDocuments({ status: "active" });
    const inactive = await Member.countDocuments({ status: "inactive" });
    res.json({ active, inactive });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Trial Conversion Rate
app.get("/api/trial-conversion", async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const converted = await Member.countDocuments({ membershipType: "premium" });
    const rate = totalMembers > 0 ? (converted / totalMembers) * 100 : 0;
    res.json({ conversionRate: `${rate.toFixed(2)}%` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Revenue by Venue
app.get("/api/revenue-by-venue", async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { status: "success" } },
      {
        $lookup: {
          from: "bookings",
          localField: "booking_id",
          foreignField: "booking_id",
          as: "booking"
        }
      },
      { $unwind: "$booking" },
      {
        $lookup: {
          from: "venues",
          localField: "booking.venue_id",
          foreignField: "venue_id",
          as: "venue"
        }
      },
      { $unwind: "$venue" },
      {
        $group: {
          _id: "$venue.name",
          totalRevenue: { $sum: "$amount" }
        }
      },
      {
        $project: {
          venueName: "$_id",
          totalRevenue: 1,
          _id: 0
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
