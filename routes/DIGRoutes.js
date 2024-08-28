const express = require("express");
const router = express.Router();
const digController = require("../controllers/DIGController");

// Create a new DIG
router.post("/", digController.createDIGController);

// Login DIG
router.post("/login", digController.DIGLoginController);

// get DIG Data
router.post("/getdig", digController.getDIGDataController);

// Add SP to DIG
router.post("/addsp", digController.addSPToDIGController);

// Get DIG SP
router.get("/:digId/sp", digController.DIGGetSPController);
// // Get all DIGs
// router.get("/", digController.getAllDIGs);

// // Get DIG by ID
// router.get("/:id", digController.getDIGById);

// // Update DIG by ID
// router.put("/:id", digController.updateDIG);

// // Delete DIG by ID
// router.delete("/:id", digController.deleteDIG);

module.exports = router;
