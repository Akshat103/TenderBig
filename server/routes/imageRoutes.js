// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');

// Define the route for uploading images
router.post('/upload', imageController.uploadImages);
router.get('/allimages', imageController.getImages);
router.delete('/delete/:filename', imageController.deleteImage);

module.exports = router;
