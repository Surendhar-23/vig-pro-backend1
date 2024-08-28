const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");
const upload = require("../middleware/multerconfig");

// Create Station
router.post("/", stationController.createStationController);

// Login Station
router.post("/login", stationController.stationLoginController);

// get Station
router.post("/getstation", stationController.getStationDataController);

// Add Idol to Station
router.post(
  "/:stationId/addidol",
  stationController.addIdolToStationController
);

// update Idol to Station
router.put(
  "/:stationId/:idolId/updateidol",
  stationController.updateIdolToStationController
);

// Delete Idol from Station
router.delete(
  "/:stationId/:idolId/deleteIdol",
  stationController.deleteIdolFromStationController
);

// Add Idol Files
router.post(
  "/:stationId/:idolId/addfiles",
  upload.fields([
    { name: "idolApplication", maxCount: 1 },
    { name: "idolImage", maxCount: 1 },
    { name: "applicantImage", maxCount: 1 },
  ]),
  stationController.addIdolFileController
);

// Upload idol application
router.post(
  "/:stationId/:idolId/uploadApplication",
  upload.single("idolApplication"),
  stationController.uploadIdolApplicationController
);

// Upload idol image
router.post(
  "/:stationId/:idolId/uploadImage",
  upload.single("idolImage"),
  stationController.uploadIdolImageController
);

// Upload applicant image
router.post(
  "/:stationId/:idolId/uploadApplicantImage",
  upload.single("applicantImage"),
  stationController.uploadApplicantImageController
);

// Get a Idol from station
router.get("/:stationId/:idol_id", stationController.getStationIdolController);

// Display Station Idol
router.get("/:stationId/idol", stationController.displayStationIdolsController);

// Mark Station Idol Immersed
router.patch(
  "/:stationId/idol/:idolId/immersed",
  stationController.markStationIdolImmersedController
);

// Get all Stations
// router.get("/", stationController.getAllStations);

// // Get Station by ID
// router.get("/:id", stationController.getStationById);

// // Update Station by ID
// router.put("/:id", stationController.updateStation);

// // Delete Station by ID
// router.delete("/:id", stationController.deleteStation);

module.exports = router;
