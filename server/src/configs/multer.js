const multer = require('multer');

// Multer setup 
var uploadMemory = multer({
    storage: multer.memoryStorage()
})

var uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/uploads/");
        },
        filename: function (req, file, cb) {
            // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            // cb(null, file.fieldname + '-' + uniqueSuffix)
            cb(null, `${Date.now()} - ${file.originalname}`)
        },
    })
})

// var upload = multer({ storage: storage });

module.exports = {
    uploadMemory,
    uploadDisk
};