const DIG = require("../models/schema/DIGSchema");
const SP = require("../models/schema/SPSchema");

// Create a new DIG
const createDIGController = async (req, res) => {
  try {
    const newDIG = new DIG(req.body);
    const savedDIG = await newDIG.save();
    res.status(201).json(savedDIG);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DIG Login
const DIGLoginController = async (req, res) => {
  const { digId, password } = req.body;
  try {
    const dig = await DIG.findOne({ digId });
    if (!dig)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (dig.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(dig.digId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get DIG
const getDIGDataController = async (req, res) => {
  const { digId } = req.body;
  try {
    const dig = await DIG.findOne({ digId }).populate({
      path: "spIds", // Populate SP documents
      populate: {
        path: "dspIds", // Populate Dsp documents
        populate: {
          path: "stationIds", // Populate Station documents
        },
      },
    });
    if (!dig) return res.status(401).json({ message: "Invalid DIG" });
    return res.status(200).json(dig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add SP To DIG
const addSPToDIGController = async (req, res) => {
  try {
    const { digId, spId } = req.body;
    const dig = await DIG.findOne({ digId });
    if (!dig) {
      return res.status(404).json({ message: "DIG not found" });
    }
    const sp = await SP.findOne({ spId });
    if (!sp) {
      return res.status(404).json({ message: "SP not found" });
    }

    if (dig.spIds.includes(sp._id)) {
      return res
        .status(400)
        .json({ message: "SP is already added to this DIG" });
    }
    dig.spIds.push(sp._id);
    sp.digId = dig._id;
    await dig.save();
    await sp.save();
    return res.status(200).json({
      message: "SP added to DIG successfully",
      dig,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All DIG SP
const DIGGetSPController = async (req, res) => {
  try {
    const { digId } = req.params;
    const dig = await DIG.findOne({ digId }).populate({
      path: "spIds", // Populate SP documents
      populate: {
        path: "dspIds", // Populate Dsp documents
        populate: {
          path: "stationIds", // Populate Station documents
        },
      },
    });

    if (!dig) {
      return res.status(404).json({ message: "DIG not found" });
    }

    return res.status(200).json({
      message: "SP retrieved successfully",
      stations: dig.spIds,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all DIGs
// exports.getAllDIGs = async (req, res) => {
//   try {
//     const digs = await DIG.find().populate("spIds").populate("igId");
//     res.status(200).json(digs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get DIG by ID
// exports.getDIGById = async (req, res) => {
//   try {
//     const dig = await DIG.findById(req.params.id)
//       .populate("spIds")
//       .populate("igId");
//     if (!dig) return res.status(404).json({ message: "DIG not found" });
//     res.status(200).json(dig);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update DIG by ID
// exports.updateDIG = async (req, res) => {
//   try {
//     const updatedDIG = await DIG.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedDIG) return res.status(404).json({ message: "DIG not found" });
//     res.status(200).json(updatedDIG);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete DIG by ID
// exports.deleteDIG = async (req, res) => {
//   try {
//     const deletedDIG = await DIG.findByIdAndDelete(req.params.id);
//     if (!deletedDIG) return res.status(404).json({ message: "DIG not found" });
//     res.status(200).json({ message: "DIG deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createDIGController,
  DIGLoginController,
  addSPToDIGController,
  DIGGetSPController,
  getDIGDataController,
};
