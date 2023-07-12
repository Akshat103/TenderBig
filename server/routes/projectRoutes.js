const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

// Submit form
router.post('/submit', projectController.submitForm);

// Get all projects
router.get('/getall', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Search projects by sector, country, or both
router.get('/search', projectController.searchProjects);


router.put('/:id', projectController.updateProjectById);

router.put('/:id', projectController.deleteProjectById);


module.exports = router;
