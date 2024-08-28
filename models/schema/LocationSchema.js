const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
  placeName: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
