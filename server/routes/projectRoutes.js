const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const { verifyToken, isNotUser, checkSubscription } = require("../middleware/auth")

// Submit form
router.post('/submit', verifyToken, projectController.submitForm);

// Get all projects
router.get('/getall', verifyToken, projectController.getAllProjects);

// Get project by ID
router.get('/byid/:id', verifyToken, projectController.getProjectById);

// Search projects by sector, country, or both
router.get('/search',verifyToken, checkSubscription, projectController.searchProjects);

router.put('/:id', verifyToken, projectController.updateProjectById);

router.put('/:id', verifyToken, projectController.deleteProjectById);

module.exports = router;
