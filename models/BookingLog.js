const mongoose = require('mongoose');

const bookingLogSchema = new mongoose.Schema({
  trx: { type: String, required: true },              
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true }, 
  seat: { type: Number, required: true },              
  price: { type: Number, required: true },             
  departureTime: { type: Date, required: true },       
  bookingTime: { type: Date, default: Date.now },     
});

module.exports = mongoose.model('BookingLog', bookingLogSchema);
