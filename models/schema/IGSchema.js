const mongoose = require("mongoose");

const IGSchema = new mongoose.Schema({
  igId: { type: String, required: true, unique: true },
  igDivision: { type: String, required: true },
  digIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "DIG" }], // Reference to DIGs
  password: { type: String, required: true },
});

module.exports = mongoose.model("IG", IGSchema);
