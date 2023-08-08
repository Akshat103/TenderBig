const express = require("express");
const router = express.Router();
const s3Controller = require("../controller/s3Controller");
const {verifyToken , isNotUser} = require("../middleware/auth")

//Get Url to upload files
router.post("/uploadurl", verifyToken, s3Controller.signS3URL);

module.exports = router;