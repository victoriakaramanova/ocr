const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { imageController, authController } = require('../controllers');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const upload = require('../utils/upload');

// middleware that is specific to this router

router.get('/', imageController.getImages);
//router.get('/all/:id', auth(),imageController.getUserImages);

router.get('/all', auth(),imageController.getUserImages);
//router.post('/upload',imageController.uploadImage);
router.post('/upload', upload.single('file'),auth(), imageController.uploadImage);
router.get('/reckon',auth(), imageController.recognizeImage);

router.get('/detail/:imageId', auth(), imageController.getImage);
router.put('/detail', auth(), imageController.editImage);
router.delete('/delete', auth(), imageController.deleteImage);///:imageId/:public_id

module.exports = router