const mongoose = require('mongoose');

const bookingLogSchema = new mongoose.Schema({
  trx: { type: String, required: true },               // Transaction ID
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User schema
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true }, // Reference to TourPackage schema
  seat: { type: Number, required: true },              // Number of seats booked
  price: { type: Number, required: true },             // Total price of the booking
  departureTime: { type: Date, required: true },       // Departure time for the booked plan
  bookingTime: { type: Date, default: Date.now },      // Booking timestamp
});

module.exports = mongoose.model('BookingLog', bookingLogSchema);
