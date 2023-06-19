const multer = require("multer");
const path = require("path");

// upload book image
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
      let ext = path.extname(file.originalname);
      callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  });
  
  const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Please Choose an Image to Upload not files."), false);
    }
    cb(null, true);
  };
  const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
  });

  module.exports = upload