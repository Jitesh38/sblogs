const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
        console.log('File in multer : ', file);
    }
})

const upload = multer({ storage: storage })
module.exports = upload