const express = require("express");
const router = express.Router();
const spController = require("../controllers/SPController");

// Create a new SP
router.post("/", spController.createSPController);

// Login SP
router.post("/login", spController.SPLoginController);

// get SP data
router.post("/getsp", spController.getSPDataController);

// Add DSP to SP
router.post("/adddsp", spController.addDSPToSPController);

// Get SP DSP
router.get("/:spId/dsp", spController.SPGetDSPController);
// // Get all SPs
// router.get("/", spController.getAllSPs);

// // Get SP by ID
// router.get("/:id", spController.getSPById);

// // Update SP by ID
// router.put("/:id", spController.updateSP);

// // Delete SP by ID
// router.delete("/:id", spController.deleteSP);

module.exports = router;
