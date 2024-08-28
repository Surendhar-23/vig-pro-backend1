const IG = require("../models/schema/IGSchema"); // Assuming you have a model file for IG
const DIG = require("../models/schema/DIGSchema");

// Create a new IG
const createIGController = async (req, res) => {
  try {
    const ig = new IG(req.body);
    const savedIG = await ig.save();
    res.status(201).json(savedIG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// IG Login
const IGLoginController = async (req, res) => {
  const { igId, password } = req.body;
  try {
    const ig = await IG.findOne({ igId });
    if (!ig)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (ig.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(ig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get IG data
const getIGDataController = async (req, res) => {
  const { igId } = req.body;
  try {
    const ig = await IG.findOne({ igId });
    if (!ig) return res.status(401).json({ message: "Invalid IG" });
    return res.status(200).json(ig.igId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add DIG To IG
const addDIGToIGController = async (req, res) => {
  try {
    const { igId, digId } = req.body;
    const ig = await IG.findOne({ igId });
    if (!ig) {
      return res.status(404).json({ message: "IG not found" });
    }
    const dig = await DIG.findOne({ digId });
    if (!dig) {
      return res.status(404).json({ message: "DIG not found" });
    }

    if (ig.digIds.includes(dig._id)) {
      return res
        .status(400)
        .json({ message: "DIG is already added to this IG" });
    }

    ig.digIds.push(dig._id);
    dig.igId = ig._id;
    await ig.save();
    await dig.save();
    return res.status(200).json({
      message: "DIG added to IG successfully",
      ig,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All IG DIG
const IGGetDIGController = async (req, res) => {
  try {
    const { igId } = req.params;
    const ig = await IG.findOne({ igId }).populate({
      path: "digIds", // Populate DIG documents
      populate: {
        path: "spIds", // Populate SP documents within DIG
        populate: {
          path: "dspIds", // Populate Dsp documents within SP
          populate: {
            path: "stationIds", // Populate Station documents within Dsp
          },
        },
      },
    });
    if (!ig) {
      return res.status(404).json({ message: "IG not found" });
    }

    return res.status(200).json({
      message: "DIG retrieved successfully",
      stations: ig.digIds,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// // Get all IGs
// exports.getAllIGs = async (req, res) => {
//   try {
//     const igs = await IG.find();
//     res.status(200).json(igs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get IG by ID
// exports.getIGById = async (req, res) => {
//   try {
//     const ig = await IG.findById(req.params.id);
//     if (!ig) {
//       return res.status(404).json({ message: "IG not found" });
//     }
//     res.status(200).json(ig);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update IG by ID
// exports.updateIG = async (req, res) => {
//   try {
//     const updatedIG = await IG.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedIG) {
//       return res.status(404).json({ message: "IG not found" });
//     }
//     res.status(200).json(updatedIG);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete IG by ID
// exports.deleteIG = async (req, res) => {
//   try {
//     const deletedIG = await IG.findByIdAndDelete(req.params.id);
//     if (!deletedIG) {
//       return res.status(404).json({ message: "IG not found" });
//     }
//     res.status(200).json({ message: "IG deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  createIGController,
  IGLoginController,
  addDIGToIGController,
  IGGetDIGController,
  getIGDataController,
};
