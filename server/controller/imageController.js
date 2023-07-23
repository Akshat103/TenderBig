// src/controllers/imageController.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up the multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'dist/uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

const upload = multer({ storage }).array('images', 10);

const uploadImages = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.files);
  });
};

const getImages = (req, res) => {
    const uploadsPath = 'dist/uploads';
    try {
      fs.readdir(uploadsPath, (err, files) => {
        if (err) {
          return res.status(500).json(err);
        }
        console.log(files)
        const imageUrls = files.map((file) => `uploads/${file}`);
        return res.status(200).json(imageUrls);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  const deleteImage = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join('dist/uploads', filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: 'Image deleted successfully' });
    });
  };
  
  module.exports = {
    uploadImages,
    getImages,
    deleteImage,
  };

  
