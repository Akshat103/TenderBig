// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');
const { verifyToken, isNotUser, isAdmin } = require("../middleware/auth")

// Define the route for uploading images
router.post('/upload', verifyToken, isNotUser, imageController.uploadImages);
router.get('/allimages', verifyToken, imageController.getImages);
router.delete('/delete/:filename', verifyToken, isNotUser, imageController.deleteImage);

module.exports = router;
