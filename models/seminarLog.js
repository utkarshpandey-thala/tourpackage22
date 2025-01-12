const mongoose = require('mongoose');

const seminarLogSchema = new mongoose.Schema({
  trx: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'SeminarPlan', required: true },
  seat: { type: Number, required: true },
  price: { type: Number, required: true },
  startTime: { type: Date, required: true },
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' },
  bookingTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SeminarLog', seminarLogSchema);
