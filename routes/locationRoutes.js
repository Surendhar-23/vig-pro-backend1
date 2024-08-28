const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// Create a new Location
router.post("/", locationController.createLocation);

// Get all Locations
router.get("/", locationController.getAllLocations);

// Get Location by ID
router.get("/:id", locationController.getLocationById);

// Update Location by ID
router.put("/:id", locationController.updateLocation);

// Delete Location by ID
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
