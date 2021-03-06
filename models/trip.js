const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tripSchema = new Schema({
  name: { type: String, required: true },
  vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle" },
  startTime: { type: Number, required: true },
  repeat: { type: String, required: true }, // daily , weekdays , weekends
  status: { type: Boolean, required: true, default: true },
});
module.exports = mongoose.model("Trip", tripSchema);
