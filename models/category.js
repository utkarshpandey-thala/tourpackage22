const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  serialNumber: { type: Number, required: false }, 
  name: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ["Active", "Inactive"], 
    default: "Active" 
  },
});

module.exports = mongoose.model("Category", categorySchema);
