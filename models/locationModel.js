const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  actions: {
    type: [String],
    required: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
