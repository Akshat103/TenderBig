const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/logout", authController.postLogout);
router.post("/forgot-password", authController.sendOTP);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
