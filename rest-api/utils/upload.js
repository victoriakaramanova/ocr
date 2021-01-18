const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: "stopify-cloud-v",
  api_key: "184924596437519",
  api_secret: "iopbfctihPcfkRBjuXj228KEqjQ"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ocr'
  },
  //folder: 'ocr',
  allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
  transformation: [{width: 500, height: 500, crop: 'limit'}]
});

const upload = multer({ storage: storage });
module.exports = upload;