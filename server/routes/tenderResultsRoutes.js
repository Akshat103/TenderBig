const express = require("express");
const router = express.Router();
const tenderResultController = require("../controller/tenderResultsController");
const { verifyToken, checkSubscription, isNotUser } = require("../middleware/auth")

// tender results giving admin
router.post("/add-tenderResults",verifyToken,isNotUser, tenderResultController.postAddTenderResults);

//update tender Results form 
router.put("/update/:TenderResultId", verifyToken,isNotUser, tenderResultController.updateResultsFormById);

// tender Results form
router.delete("/delete/:TenderResultId",verifyToken, isNotUser,tenderResultController.deleteResultsFormById);

// getting all tenderResults
router.get("/alltenderResults",verifyToken,isNotUser, tenderResultController.getTenderResults)

router.get("/byid/:TenderResultId",verifyToken, checkSubscription, tenderResultController.getTenderResultsByTenderId);

router.get("/search", verifyToken, checkSubscription, tenderResultController.search);

module.exports = router;