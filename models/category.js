const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  serialNumber: { type: Number, required: false }, // Optional S.N., auto-generated if needed
  name: { type: String, required: true }, // Name of the category
  status: { 
    type: String, 
    enum: ["Active", "Inactive"], 
    default: "Active" // Default status is "Active"
  },
});

module.exports = mongoose.model("Category", categorySchema);
