const mongoose = require("mongoose");
const DIGSchema = new mongoose.Schema({
  digId: { type: String, required: true, unique: true },
  digDivision: { type: String, required: true },
  spIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "SP" }], // Reference to SPs
  password: { type: String, required: true },
  igId: { type: mongoose.Schema.Types.ObjectId, ref: "IG" }, // Reference to IG
});

module.exports = mongoose.model("DIG", DIGSchema);
