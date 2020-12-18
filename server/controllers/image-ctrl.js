/* eslint-disable no-underscore-dangle */
const multer = require('multer');

/**
 * * Image controller
 * This class contains the functions to
 * create, update, delete and get images
 */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 7
  },
  fileFilter
}).single('imageData');

const getImageName = (req, res) => {
  console.log('HOOOOO', req.file);
  /**
   * Returns the image name in the filesystem in order to save bind it to a question instance.
   */
  return res.status(200).json({ success: true, filename: req.file.filename, path: req.file.path });
};

module.exports = {
  upload,
  getImageName
};
