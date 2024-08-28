const mongoose = require("mongoose");

const SPSchema = new mongoose.Schema({
  spId: { type: String, required: true, unique: true },
  spDivision: { type: String, required: true },
  dspIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "DSP" }], // Reference to DSPs
  password: { type: String, required: true },
  digId: { type: mongoose.Schema.Types.ObjectId, ref: "DIG" }, // Reference to DIG
});

module.exports = mongoose.model("SP", SPSchema);
