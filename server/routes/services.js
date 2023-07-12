const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer')
const employerController = require('../controller/services/employerFormController');
const seekerController = require('../controller/services/seekerFormController');
const registrationController = require('../controller/services/registrationFormController');
const companyCertificationController = require('../controller/services/companyCerificationFormController');
const individualCertificationController = require('../controller/services/individualCerificationFormController');
const auctionMaterialsController = require('../controller/services/auctionMaterialFormController');
const jointventureController = require('../controller/services/jointventureController');
const tenderOfflineController = require("../controller/services/offlineTenderFormController");
const gemregistrationController = require("../controller/services/gemregistrationFormController");
const tenderOnlineController = require("../controller/services/onlineTenderFormController");
const { verifyToken } = require('../middleware/auth');

//Career & Man Power

//Employer
// Route for form submission
router.post('/employer/submit-form', verifyToken, employerController.submitForm);

// Route for getting all forms
router.get('/employer/forms', employerController.getAllForms);

// Route for getting a single form
router.get('/employer/forms/:id', employerController.getSingleForm);

//update request for employer
router.put('/employer/forms/:id', employerController.updateSingleForm);

//delete request for employer
router.delete('/employer/forms/:id', employerController.deleteSingleForm);


//Seeker 
// Route for form submission
router.post('/seeker/submit-form', verifyToken, seekerController.submitForm);

// Route for getting all forms
router.get('/seeker/forms', seekerController.getAllForms);

// Route for getting a single form
router.get('/seeker/forms/:id', seekerController.getSingleForm);
// route for updating details
router.put('/seeker/forms/:id', seekerController.updateSingleForm);
//delete route for details
router.delete('/seeker/forms/:id', seekerController.deleteSingleForm);


//Registration/Certificate

//Registration
// Route for submitting a registration form
router.post('/register/registration', verifyToken, registrationController.submitForm);

// Route for getting all registration forms
router.get('/register/registration', registrationController.getAllForms);

// Route for getting a single registration form by ID
router.get('/register/registration/:id', registrationController.getFormById);

// route for update and delete 
router.put('/register/registration/:id', registrationController.updateFormById);
router.delete('/register/registration/:id', registrationController.deleteFormById);



//Company Certification
// Route for submitting a certification form
router.post('/ccert/certification', verifyToken, upload.any(), companyCertificationController.submitForm);

// Route for getting all certification forms
router.get('/ccert/certification', companyCertificationController.getAllForms);

// Route for getting a single certification form by ID
router.get('/ccert/certification/:id', companyCertificationController.getFormById);

// Routes fpr update
router.put('/ccert/certification/:id', companyCertificationController.updateFormById);

// Routes for deleting company info
router.delete('/ccert/certification/:id', companyCertificationController.deleteFormById);


//Individual Certification
// Route for submitting a certification form
router.post('/icert/certification', verifyToken, upload.any(), individualCertificationController.submitForm);

// Route for getting all certification forms
router.get('/icert/certification', individualCertificationController.getAllForms);

// Route for getting a single certification form by ID
router.get('/icert/certification/:id', individualCertificationController.getFormById);

// update and delete for individual certification
router.put('/icert/certification/:id', individualCertificationController.updateFormById);
router.delete('/icert/certification/:id', individualCertificationController.deleteFormById);

//Auction Materials
// Route for submitting an auction material form
router.post('/aumt/auction-material', verifyToken, auctionMaterialsController.submitForm);

// Route for getting all auction material forms
router.get('/aumt/auction-material', auctionMaterialsController.getAllForms);

// Route for getting a single auction material form by ID
router.get('/aumt/auction-material/:id', auctionMaterialsController.getFormById);

// update and delete for auctuion material
router.put('/aumt/auction-material/:id', auctionMaterialsController.updateFormById);
router.delete('/aumt/auction-material/:id', auctionMaterialsController.deleteFormById);


//Joint Venture
// Submit Joint Venture form
router.post("/jv/submitjv", verifyToken, jointventureController.submitForm);

// Get all Joint Venture forms
router.get("/jv/getjv", jointventureController.getAllForms);

// Get a single Joint Venture form
router.get("/jv/:id", jointventureController.getFormById);

//update joint venture form 
router.put("/jv/:id", jointventureController.updateFormById);

// Delete Joint Venture form
router.delete("/jv/:id", jointventureController.deleteFormById);

//Tender Offline
// Submit Tender Offline Form
router.post("/tender/offline", verifyToken, tenderOfflineController.submitForm);

// Get All Tender Offline Forms
router.get("/tender/offline/getall", tenderOfflineController.getAllForms);

// Get Single Tender Offline Form by ID
router.delete("/tender/offline/:id", tenderOfflineController.getSingleForm);
// router.put("/tender/offline/:id", tenderOfflineController.updateSingleForm);
// router.delete("/tender/offline/:id", tenderOfflineController.deleteSingleForm);


//Tender Online
// Submit Tender Online Form
router.post("/tender/online", verifyToken, tenderOnlineController.submitForm);

// Get All Tender Online Forms
router.get("/tender/online/getall", tenderOnlineController.getAllForms);

// Get Single Tender Online Form by ID
router.get("/tender/online/:id", tenderOnlineController.getFormById);

router.put("/tender/online/:id", tenderOnlineController.updateFormById);
router.delete("/tender/online/:id", tenderOnlineController.deleteFormById);


//Gem Registration
// Submit Gem Registration Form
router.post("/gem/submit", verifyToken, gemregistrationController.submitForm);

// Get All Gem Registration Forms
router.get("/gem/getall", gemregistrationController.getAllForms);

// Get Single Gem Registration by ID
router.get("/gem/:id", gemregistrationController.getFormById);
router.put("/gem/:id", gemregistrationController.updateFormById);
router.delete("/gem/:id", gemregistrationController.deleteFormById);



module.exports = router;
