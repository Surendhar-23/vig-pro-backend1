const DSP = require("../models/schema/DSPSchema");
const Station = require("../models/schema/StationSchema");

// Create a new DSP
const createDSPController = async (req, res) => {
  try {
    const newDSP = new DSP(req.body);
    const savedDSP = await newDSP.save();
    res.status(201).json(savedDSP);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DSP Login
const DSPLoginController = async (req, res) => {
  const { dspId, password } = req.body;
  try {
    const dsp = await DSP.findOne({ dspId });
    // const dsp = await DSP.findOne({ dspId }).populate("stationIds");

    if (!dsp)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (dsp.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(dsp.dspId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get DSP data
const getDSPDataController = async (req, res) => {
  const { dspId } = req.body;
  try {
    const dsp = await DSP.findOne({ dspId }).populate("stationIds");

    if (!dsp) return res.status(401).json({ message: "Invalid dsp" });
    return res.status(200).json(dsp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add station To DSP
const addStationToDSPController = async (req, res) => {
  try {
    const { dspId, stationId } = req.body;
    const dsp = await DSP.findOne({ dspId });
    if (!dsp) {
      return res.status(404).json({ message: "DSP not found" });
    }
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    if (dsp.stationIds.includes(station._id)) {
      return res
        .status(400)
        .json({ message: "Station is already added to this DSP" });
    }
    dsp.stationIds.push(station._id);
    station.dspId = dsp._id;
    await dsp.save();
    await station.save();
    return res.status(200).json({
      message: "Station added to DSP successfully",
      dsp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all DSP Stations
const DSPGetStationsController = async (req, res) => {
  try {
    const { dspId } = req.params;
    const dsp = await DSP.findOne({ dspId }).populate("stationIds");
    if (!dsp) {
      return res.status(404).json({ message: "DSP not found" });
    }
    return res.status(200).json({
      message: "Stations retrieved successfully",
      stations: dsp.stationIds,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all DSPs
// exports.getAllDSPs = async (req, res) => {
//   try {
//     const dsps = await DSP.find().populate("stationIds").populate("spId");
//     res.status(200).json(dsps);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get DSP by ID
// exports.getDSPById = async (req, res) => {
//   try {
//     const dsp = await DSP.findById(req.params.id)
//       .populate("stationIds")
//       .populate("spId");
//     if (!dsp) return res.status(404).json({ message: "DSP not found" });
//     res.status(200).json(dsp);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update DSP by ID
// exports.updateDSP = async (req, res) => {
//   try {
//     const updatedDSP = await DSP.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedDSP) return res.status(404).json({ message: "DSP not found" });
//     res.status(200).json(updatedDSP);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete DSP by ID
// exports.deleteDSP = async (req, res) => {
//   try {
//     const deletedDSP = await DSP.findByIdAndDelete(req.params.id);
//     if (!deletedDSP) return res.status(404).json({ message: "DSP not found" });
//     res.status(200).json({ message: "DSP deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createDSPController,
  DSPLoginController,
  addStationToDSPController,
  DSPGetStationsController,
  getDSPDataController,
};
