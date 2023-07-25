const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const { verifyToken, isNotUser, checkSubscription } = require("../middleware/auth")

// Submit form
router.post('/submit', projectController.submitForm);

// Get all projects
router.get('/getall', projectController.getAllProjects);

// Get project by ID
router.get('/byid/:id', projectController.getProjectById);

// Search projects by sector, country, or both
router.get('/search',verifyToken, checkSubscription, projectController.searchProjects);

router.put('/:id', projectController.updateProjectById);

router.put('/:id', projectController.deleteProjectById);


module.exports = router;
