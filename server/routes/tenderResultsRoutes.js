const express = require("express");
const router = express.Router();
const tenderResultController = require("../controller/tenderResultsController");
const { verifyToken, isNotUser, checkSubscription } = require("../middleware/auth")

// tender results giving admin
router.post("/add-tenderResults", tenderResultController.postAddTenderResults);

//update tender Results form 
router.put("/update/:TenderResultId", tenderResultController.updateResultsFormById);

// tender Results form
router.delete("/delete/:TenderResultId", tenderResultController.deleteResultsFormById);

// getting all tenderResults
router.get("/alltenderResults", tenderResultController.getTenderResults)

router.get("/byid/:TenderResultId", tenderResultController.getTenderResultsByTenderId);

router.get("/search", tenderResultController.search);

module.exports = router;