const mongoose = require('mongoose');

const seminarPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  departure: { type: Date, required: true },
  return: { type: Date, required: true },
  sold: { type: Number, default: 0 },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('SeminarPlan', seminarPlanSchema);
