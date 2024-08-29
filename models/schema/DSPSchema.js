const mongoose = require("mongoose");
const DSPSchema = new mongoose.Schema({
  dspId: { type: String, required: true, unique: true },
  dspDistrict: { type: String, required: true },
  dspDivision: { type: String, required: true },
  stationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Station" }], // Reference to Stations
  divisionCoords: { coords: { lat: { type: Number }, lon: { type: Number } } },
  password: { type: String, required: true },
  spId: { type: mongoose.Schema.Types.ObjectId, ref: "SP" }, // Reference to SP
});

module.exports = mongoose.model("DSP", DSPSchema);
