const express = require("express");
const router = express.Router();
const s3Controller = require("../controller/s3Controller");
const {verifyToken , isNotUser} = require("../middleware/auth")

<<<<<<< HEAD
//Get Url to upload files
router.post("/uploadurl", verifyToken, s3Controller.signS3URL);
=======
//Buy Subscription
router.get("/uploadurl",s3Controller.signS3URL);
>>>>>>> 714f0838f679a43e8a3b4d00afb4f47ee5a74a3c

module.exports = router;