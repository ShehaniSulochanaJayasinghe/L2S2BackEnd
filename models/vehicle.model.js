const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  carModel: {
    type: String,
    required: false,
  },
  sheets: {
    type: Number,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;
