const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const { verifyToken, isNotUser } = require("../middleware/auth")

router.post("/post-contactform", verifyToken, contactController.postContactForm);
router.get("/get-allcontactforms", verifyToken, isNotUser, contactController.getContactForms);
router.get("/:selectedService", verifyToken, isNotUser, contactController.getByService);
router.delete("/byid/:id", verifyToken, isNotUser, contactController.deleteById);

module.exports = router;
