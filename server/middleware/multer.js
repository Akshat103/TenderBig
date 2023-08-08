const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.memoryStorage()
  
exports.upload = multer({ storage: storage });