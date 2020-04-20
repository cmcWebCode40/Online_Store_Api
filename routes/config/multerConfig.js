const multer = require('multer');

// multer.diskStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.minetype === 'image/jpeg' || file.mimetype === 'image/png') return cb(null, './file/images/');
    return cb({ message: 'this file is neither a video or image file' }, false);
  },
  fiilename: (req, file, cb) => {
    cb(null, file.orginalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
