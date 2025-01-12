const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true }, 
  departure: { type: Date, required: true },
  return: { type: Date, required: true },
  capacity: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Sold Out', 'Upcoming'], default: 'Available' },
});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;
