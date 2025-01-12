const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['image', 'video'], // Add more types if needed
  },
  size: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Enabled', 'Disabled'],
    default: 'Enabled',
  },
  imagePath: {
    type: String, // Path where the image is stored
    required: function () {
      return this.type === 'image';
    },
  },
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
