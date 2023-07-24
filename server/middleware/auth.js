const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/userModel");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.auth;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userRole = decoded.data.userRole;
    req.userId = decoded.data.userId;
    req._id = decoded.data._id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid token." });
  }
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers.auth || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.data.userRole != "admin") {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Invalid token." });
  }
};

exports.isNotUser = (req, res, next) => {
  const token = req.headers.auth || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const role = decoded.data.userRole;
    if (role == "admin" || role == "hr" || role == "employee" || role == "franchise") {
      next();
    } else {
      return res.status(403).json({ error: "Access denied." });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Invalid token." });
  }
};

exports.checkSubscription = async (req, res, next) => {
  const token = req.headers.auth;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.data._id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    req.userSubscription = user.subscription;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token.",
    });
  }
};
