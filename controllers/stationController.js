const Station = require("../models/schema/StationSchema");

// Station login
const stationLoginController = async (req, res) => {
  console.log(req.body);

  const { stationId, password } = req.body;
  try {
    const station = await Station.findOne({ stationId });
    if (!station)
      return res.status(401).json({ message: "Invalid user id or password" });
    if (station.password !== password)
      return res.status(401).json({ message: "Invalid password" });
    return res.status(200).json(station.stationId);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get Station data
const getStationDataController = async (req, res) => {
  console.log(req.body);

  const { stationId } = req.body;
  try {
    const station = await Station.findOne({ stationId });
    if (!station) return res.status(401).json({ message: "Invalid station" });
    return res.status(200).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new Station
const createStationController = async (req, res) => {
  try {
    const newStation = new Station(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Idol to station
const addIdolToStationController = async (req, res) => {
  try {
    const { stationId } = req.params;
    const idolData = req.body;
    console.log(req.body);

    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Check for duplicate idol_id
    const existingIdol = station.stationIdol.find(
      (idol) => idol.idol_id === idolData.idol_id
    );
    if (existingIdol) {
      return res
        .status(409)
        .json({ message: "Idol with this ID already exists in the station" });
    }
    station.stationIdol.push(idolData);
    const updatedStation = await station.save();
    // res.status(200).json(updatedStation);
    res.status(200).json({ id: idolData.idol_id, idol: idolData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update Idol To Station

const updateIdolToStationController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const updateData = req.body; // Assume the update data is sent in the request body

    // Find the station by its ID
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Find the idol within the station
    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found" });
    }

    // Update the idol details with the provided data
    Object.assign(idol, updateData);

    // Save the updated station
    await station.save();

    res.status(200).json({ message: "Idol updated successfully", idol });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIdolFromStationController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;

    // Find the station by stationId
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    // Find the idol by idolId and remove it
    const idolIndex = station.stationIdol.findIndex(
      (idol) => idol.idol_id === idolId
    );
    if (idolIndex === -1) {
      return res.status(404).json({ message: "Idol not found." });
    }

    // Remove the idol from the array
    station.stationIdol.splice(idolIndex, 1);

    // Save the updated station document
    await station.save();

    res.status(200).json({ message: "Idol successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload idol application
const uploadIdolApplicationController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found." });
    }

    idol.idolApplication = req.file.location; // Save S3 file location
    await station.save();

    res.status(200).json({
      message: "Idol application successfully uploaded.",
      idol,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during upload." });
  }
};

// Upload idol image
const uploadIdolImageController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found." });
    }

    idol.idolImage = req.file.location; // Save S3 file location
    await station.save();

    res.status(200).json({
      message: "Idol image successfully uploaded.",
      idol,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during upload." });
  }
};

// Upload applicant image
const uploadApplicantImageController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found." });
    }

    idol.applicantImage = req.file.location; // Save S3 file location
    await station.save();

    res.status(200).json({
      message: "Applicant image successfully uploaded.",
      idol,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during upload." });
  }
};

const addIdolFileController = async (req, res) => {
  try {
    console.log(req.files);

    const { stationId, idolId } = req.params;
    const { files } = req;
    // if (!files || !files.idolApplication || !files.idolImage) {
    //   return res.status(400).json({
    //     message: "Both idol application and idol image are required.",
    //   });
    // }

    // Find the station by ID
    const station = await Station.findOne({ stationId });

    if (!station) {
      return res.status(404).json({ message: "Station not found." });
    }

    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found." });
    }
    if (!files) {
      return res.status(400).json({ message: "No files uploaded.", idol });
    }

    // Update only if the respective file exists
    if (files.idolApplication && files.idolApplication.length > 0) {
      idol.idolApplication = files.idolApplication[0].location;
    }

    if (files.idolImage && files.idolImage.length > 0) {
      idol.idolImage = files.idolImage[0].location;
    }

    if (files.applicantImage && files.applicantImage.length > 0) {
      idol.applicantImage = files.applicantImage[0].location;
    }

    await station.save();

    res.status(200).json({
      message: "Files successfully uploaded and added to the idol.",
      idol,
    });
    // If error is related to conflict or duplicate data
    if (error.code === 409) {
      return res.status(409).json({ message: "Resource conflict." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading files." });
  }
};

// Get a Station Idol
const getStationIdolController = async (req, res) => {
  try {
    const { stationId, idol_id } = req.params;
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    const idol = station.stationIdol.find((idol) => idol.idol_id === idol_id);
    if (!idol) {
      return res.status(404).json({ message: "Idol not found" });
    }
    res.status(200).json(idol);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display Station Idol
const displayStationIdolsController = async (req, res) => {
  try {
    const { stationId } = req.params;
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const idols = station.stationIdol;
    res.status(200).json(idols);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark Station Idol Immersed
const markStationIdolImmersedController = async (req, res) => {
  try {
    const { stationId, idolId } = req.params;
    const station = await Station.findOne({ stationId });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // const idol = station.stationIdol.id(idolId);
    const idol = station.stationIdol.find((idol) => idol.idol_id === idolId);

    if (!idol) {
      return res.status(404).json({ message: "Idol not found" });
    }

    idol.isImmersed = !idol.isImmersed;
    await station.save();
    res.status(200).json({ message: "Idol marked as immersed", idol });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Stations
// exports.getAllStations = async (req, res) => {
//   try {
//     const stations = await Station.find().populate("dspId");
//     res.status(200).json(stations);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get Station by ID
// exports.getStationById = async (req, res) => {
//   try {
//     const station = await Station.findById(req.params.id).populate("dspId");
//     if (!station) return res.status(404).json({ message: "Station not found" });
//     res.status(200).json(station);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Update Station by ID
// exports.updateStation = async (req, res) => {
//   try {
//     const updatedStation = await Station.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedStation)
//       return res.status(404).json({ message: "Station not found" });
//     res.status(200).json(updatedStation);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete Station by ID
// exports.deleteStation = async (req, res) => {
//   try {
//     const deletedStation = await Station.findByIdAndDelete(req.params.id);
//     if (!deletedStation)
//       return res.status(404).json({ message: "Station not found" });
//     res.status(200).json({ message: "Station deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createStationController,
  stationLoginController,
  addIdolToStationController,
  displayStationIdolsController,
  markStationIdolImmersedController,
  addIdolFileController,
  getStationIdolController,
  getStationDataController,
  updateIdolToStationController,
  uploadIdolApplicationController,
  uploadIdolImageController,
  uploadApplicantImageController,
  deleteIdolFromStationController,
};
