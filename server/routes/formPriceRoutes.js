const express = require('express');
const router = express.Router();
const formController = require('../controller/formPriceController');
const { verifyToken, isAdmin, isNotUser} = require("../middleware/auth")

// GET form price by form name
router.get('/:formName/price', verifyToken, formController.getFormPrice);

// PUT update form price by form name
router.put('/:formName/price', verifyToken, isNotUser, formController.updateFormPrice);

// POST submit a form
router.post('/submit', verifyToken, isNotUser, formController.submitForm);

router.get('/getall', verifyToken, isNotUser, formController.getAllFormPrices);

module.exports = router;
