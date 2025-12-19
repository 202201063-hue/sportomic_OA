# Sportomic OA

A Node.js application for managing sports venue bookings using Express and MongoDB.

## Setup

1. Install dependencies: `npm install`
2. Set up MongoDB locally or use a cloud instance and update `.env` with MONGO_URI.
3. Run the server: `node index.js`
4. Seed the database: `node seed.js`

## API Endpoints

- Venues: GET/POST/PUT/DELETE /venues
- Members: GET/POST/PUT/DELETE /members
- Bookings: GET/POST/PUT/DELETE /bookings
- Transactions: GET/POST/PUT/DELETE /transactions

## Models

- Venue: name, location, capacity, type
- Member: name, email, phone, membershipType
- Booking: member, venue, date, startTime, endTime, status
- Transaction: booking, amount, currency, status, paymentMethod