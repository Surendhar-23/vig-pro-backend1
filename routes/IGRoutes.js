const express = require("express");
const router = express.Router();
const igController = require("../controllers/IGController");

// Create a new IG
router.post("/", igController.createIGController);

// Login IG
router.post("/login", igController.IGLoginController);

// get IG Data
router.post("/getig", igController.getIGDataController);

// Add DIG to IG
router.post("/adddig", igController.addDIGToIGController);

// Get DIG SP
router.get("/:igId/dig", igController.IGGetDIGController);

// Get all IGs
// router.get("/", igController.getAllIGs);

// // Get IG by ID
// router.get("/:id", igController.getIGById);

// // Update IG by ID
// router.put("/:id", igController.updateIG);

// // Delete IG by ID
// router.delete("/:id", igController.deleteIG);

module.exports = router;
