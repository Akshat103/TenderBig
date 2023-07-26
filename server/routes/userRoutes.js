const express = require("express");
const router = express.Router();
const usersController = require("../controller/userController");
const { isAdmin, verifyToken, isNotUser } = require("../middleware/auth")

//Get user deatils
router.get("/single-user/:userId", verifyToken, usersController.getSingleUser);

//To get all users
router.get("/allusers", verifyToken, isNotUser, usersController.getAllUser);

//To update user role
router.put("/updaterole", verifyToken, isNotUser, usersController.updateUserRole);

//Delete user
router.delete("/delete/:userId", verifyToken, usersController.deleteUser);

//New users
router.get("/created/:weeks", verifyToken, isNotUser, usersController.newUsers);

//Users By role
router.get("/users/:userRole", verifyToken, isNotUser, usersController.ByUserRole);

//statistics
router.get("/statistics", verifyToken, isNotUser, usersController.statistics);

// getting all forms by id
router.get("/DetailsbyId/:id", verifyToken, isNotUser, usersController.DetailsById);

router.put('/update-status/:userId', verifyToken, isNotUser, usersController.updateSubscriptionStatus);

module.exports = router;
