import mongoose from "mongoose";
import dotenv from "dotenv";

import Venue from "./models/Venue.js";
import Member from "./models/Member.js";
import Booking from "./models/Booking.js";
import Transaction from "./models/Transaction.js";

dotenv.config();

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await Venue.deleteMany();
    await Member.deleteMany();
    await Booking.deleteMany();
    await Transaction.deleteMany();

    /* =======================
       VENUES
       ======================= */
    await Venue.insertMany([
      { venue_id: 1, name: "Grand Slam Arena", location: "North Hills" },
      { venue_id: 2, name: "City Kickers Turf", location: "Downtown" },
      { venue_id: 3, name: "AquaBlue Pool Center", location: "Westside" },
      { venue_id: 4, name: "Smash Point Badminton", location: "East District" },
      { venue_id: 5, name: "Legends Cricket Ground", location: "Suburbs" }
    ]);

    /* =======================
       MEMBERS
       ======================= */
    await Member.insertMany([
      {
        member_id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        status: "active",
        membershipType: "basic"
      },
      {
        member_id: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        status: "active",
        membershipType: "premium"
      },
      {
        member_id: 3,
        name: "Amit Patel",
        email: "amit.patel@example.com",
        status: "inactive",
        membershipType: "basic"
      },
      {
        member_id: 4,
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
        status: "active",
        membershipType: "premium"
      },
      {
        member_id: 5,
        name: "Vikram Malhotra",
        email: "vikram.malhotra@example.com",
        status: "active",
        membershipType: "basic"
      },
      {
        member_id: 6,
        name: "Anjali Desai",
        email: "anjali.desai@example.com",
        status: "inactive",
        membershipType: "basic"
      },
      {
        member_id: 7,
        name: "John Doe",
        email: "john.doe@example.com",
        status: "active",
        membershipType: "basic"
      },
      {
        member_id: 8,
        name: "Sarah Lee",
        email: "sarah.lee@example.com",
        status: "active",
        membershipType: "premium"
      }
    ]);

    /* =======================
       BOOKINGS
       ======================= */
    await Booking.insertMany([
      {
        booking_id: 1,
        venue_id: 1,
        member_id: 1,
        date: new Date("2025-12-12T10:00:00"),
        amount: 500,
        status: "completed"
      },
      {
        booking_id: 2,
        venue_id: 2,
        member_id: 2,
        date: new Date("2025-12-13T14:00:00"),
        amount: 1200,
        status: "confirmed"
      },
      {
        booking_id: 3,
        venue_id: 3,
        member_id: 7,
        date: new Date("2025-12-13T07:00:00"),
        amount: 300,
        status: "confirmed"
      },
      {
        booking_id: 4,
        venue_id: 4,
        member_id: 4,
        date: new Date("2025-12-13T18:00:00"),
        amount: 400,
        status: "confirmed"
      },
      {
        booking_id: 5,
        venue_id: 5,
        member_id: 5,
        date: new Date("2025-12-14T09:00:00"),
        amount: 1500,
        status: "confirmed"
      },
      {
        booking_id: 6,
        venue_id: 1,
        member_id: 1,
        date: new Date("2025-12-13T10:00:00"),
        amount: 500,
        status: "confirmed"
      },
      {
        booking_id: 7,
        venue_id: 2,
        member_id: 8,
        date: new Date("2025-12-15T16:00:00"),
        amount: 600,
        status: "confirmed"
      },
      {
        booking_id: 8,
        venue_id: 3,
        member_id: 3,
        date: new Date("2025-12-10T15:00:00"),
        amount: 300,
        status: "cancelled"
      }
    ]);

    /* =======================
       TRANSACTIONS
       ======================= */
    await Transaction.insertMany([
      {
        transaction_id: 101,
        booking_id: 1,
        amount: 500,
        status: "success"
      },
      {
        transaction_id: 102,
        booking_id: 2,
        amount: 1200,
        status: "success"
      },
      {
        transaction_id: 103,
        booking_id: 3,
        amount: 270,
        status: "success"
      },
      {
        transaction_id: 104,
        booking_id: 4,
        amount: 200,
        status: "success"
      },
      {
        transaction_id: 105,
        booking_id: 5,
        amount: 1500,
        status: "success"
      },
      {
        transaction_id: 106,
        booking_id: 6,
        amount: 450,
        status: "success"
      },
      {
        transaction_id: 107,
        booking_id: 7,
        amount: 600,
        status: "failed"
      },
      {
        transaction_id: 108,
        booking_id: 8,
        amount: 300,
        status: "failed"
      }
    ]);

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedData();
