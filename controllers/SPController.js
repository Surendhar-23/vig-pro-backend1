const SP = require("../models/schema/SPSchema");
const DSP = require("../models/schema/DSPSchema");

// Create a new SP
const createSPController = async (req, res) => {
  try {
    const newSP = new SP(req.body);
    const savedSP = await newSP.save();
    res.status(201).json(savedSP);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SP Login
const SPLoginController = async (req, res) => {
  const { spId, password } = req.body;
  try {
    const sp = await SP.findOne({ spId });
    // const sp = await SP.findOne({ spId }).populate({
    //   path: "dspIds", // Path to populate
    //   populate: {
    //     path: "stationIds", // Nested path to populate within each Dsp
    //   },
    // });
    if (!sp)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (sp.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(sp.spId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get SP data
const getSPDataController = async (req, res) => {
  console.log(req.body);

  const { spId } = req.body;
  try {
    const sp = await SP.findOne({ spId }).populate({
      path: "dspIds", // Path to populate
      populate: {
        path: "stationIds", // Nested path to populate within each Dsp
      },
    });
    if (!sp) return res.status(401).json({ message: "Invalid SP" });
    return res.status(200).json(sp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add DSP To SP
const addDSPToSPController = async (req, res) => {
  try {
    const { spId, dspId } = req.body;
    const sp = await SP.findOne({ spId });
    if (!sp) {
      return res.status(404).json({ message: "SP not found" });
    }
    const dsp = await DSP.findOne({ dspId });

    if (!dsp) {
      return res.status(404).json({ message: "DSP not found" });
    }

    if (sp.dspIds.includes(dsp._id)) {
      return res
        .status(400)
        .json({ message: "DSP is already added to this SP" });
    }
    sp.dspIds.push(dsp._id);
    dsp.spId = sp._id;
    await sp.save();
    await dsp.save();
    return res.status(200).json({
      message: "DSP added to SP successfully",
      sp,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All SP DSP
const SPGetDSPController = async (req, res) => {
  try {
    const { spId } = req.params;
    const sp = await SP.findOne({ spId }).populate({
      path: "dspIds", // Path to populate
      populate: {
        path: "stationIds", // Nested path to populate within each Dsp
      },
    });

    if (!sp) {
      return res.status(404).json({ message: "SP not found" });
    }
    console.log(sp);

    return res.status(200).json({
      message: "DSP retrieved successfully",
      stations: sp.dspIds,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// // Get all SPs
// exports.getAllSPs = async (req, res) => {
//   try {
//     const sps = await SP.find().populate("dspIds").populate("digId");
//     res.status(200).json(sps);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get SP by ID
// exports.getSPById = async (req, res) => {
//   try {
//     const sp = await SP.findById(req.params.id)
//       .populate("dspIds")
//       .populate("digId");
//     if (!sp) return res.status(404).json({ message: "SP not found" });
//     res.status(200).json(sp);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update SP by ID
// exports.updateSP = async (req, res) => {
//   try {
//     const updatedSP = await SP.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedSP) return res.status(404).json({ message: "SP not found" });
//     res.status(200).json(updatedSP);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete SP by ID
// exports.deleteSP = async (req, res) => {
//   try {
//     const deletedSP = await SP.findByIdAndDelete(req.params.id);
//     if (!deletedSP) return res.status(404).json({ message: "SP not found" });
//     res.status(200).json({ message: "SP deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createSPController,
  SPLoginController,
  addDSPToSPController,
  SPGetDSPController,
  getSPDataController,
};
