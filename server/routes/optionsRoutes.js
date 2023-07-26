const express = require('express');
const router = express.Router();
const optionsController = require('../controller/optionsController');
const { verifyToken, isNotUser, isAdmin } = require("../middleware/auth")

// Route for inserting sectors
router.post('/sectors', verifyToken, isNotUser, optionsController.insertSectors);

// Route for inserting products
router.post('/products', verifyToken, isNotUser, optionsController.insertProducts);

// Route for inserting departments
router.post('/departments', verifyToken, isNotUser, optionsController.insertDepartments);

// Route for inserting categories
router.post('/categories', verifyToken, isNotUser, optionsController.insertCategories);

// Route for inserting licenses
router.post('/licenses', verifyToken, isNotUser, optionsController.insertLicenses);

// Route for inserting auctionMaterial
router.post('/auctionmaterials', verifyToken, isNotUser, optionsController.insertAuctionMaterial);


// Route for removing a value from sectors array
router.delete('/sectors/:value', verifyToken, isNotUser, optionsController.removeSector);

// Route for removing a value from products array
router.delete('/products/:value', verifyToken, isNotUser, optionsController.removeProduct);

// Route for removing a value from departments array
router.delete('/departments/:value', verifyToken, isNotUser, optionsController.removeDepartment);

// Route for removing a value from categories array
router.delete('/categories/:value', verifyToken, isNotUser, optionsController.removeCategory);

// Route for removing a value from licenses array
router.delete('/licenses/:value', verifyToken, isNotUser, optionsController.removeLicenses);

// Route for removing a value from auctionMaterial array
router.delete('/auctionmaterials/:value', verifyToken, isNotUser, optionsController.removeAuctionMaterial);

// Route for getting all arrays
router.get('/alloptions', verifyToken, optionsController.getAllOptions);

module.exports = router;
