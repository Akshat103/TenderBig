const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post("/logout", authController.postLogout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
