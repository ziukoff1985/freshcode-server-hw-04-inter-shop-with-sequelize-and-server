const path = require('path');
// ----------------------------------
const multer = require('multer');
// ----------------------------------
const { staticPath } = require('../config/staticConfig');

const storageBrandImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(staticPath, 'images', 'brands'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const filterBrandImage = (req, file, cb) => {
    const MIMETYPE_REGEXP = /^image\/(jpeg|png|gif|webp)$/;
    if (MIMETYPE_REGEXP.test(file.mimetype)) {
        return cb(null, true);
    }
    cb(null, false);
};

module.exports.uploadImages = multer({
    storage: storageBrandImage,
    fileFilter: filterBrandImage,
});
