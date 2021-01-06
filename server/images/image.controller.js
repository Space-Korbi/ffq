const multer = require('multer');
const fs = require('fs');

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
  /**
   * Returns the image name in the filesystem
   * in order to save it in the corresponding question document.
   */
  return res.status(200).json({ success: true, filename: req.file.filename, path: req.file.path });
};

const deleteImages = (imageNames) => {
  imageNames.forEach((imageName) => {
    fs.unlink(`uploads/${imageName}`, (err) => {
      if (err) throw err;
    });
  });
};

const deleteImagesOfQuestion = (options) => {
  if (!options || !options.length) {
    return;
  }
  const imageNames = options.reduce((filtered, option) => {
    if (option.imageName) {
      const { imageName } = option;
      filtered.push(imageName);
    }
    return filtered;
  }, []);
  deleteImages(imageNames);
};

module.exports = {
  upload,
  getImageName,
  deleteImagesOfQuestion
};
