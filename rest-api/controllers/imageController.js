const { imageModel } = require('../models');
//const multer = require('multer');
const request = require('request');
const fs = require('fs');
const { Model } = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { create } = require('express-handlebars');
const Tesseract = require('tesseract.js');
const userModel = require('../models/userModel');
const { text } = require('body-parser');
const { isContext } = require('vm');
const { callbackify } = require('util');

function getUserImages(req, res, next) {
  //const userId=req.params.id;
  //console.log(req);
 const { _id: userId } = req.user;
// imageModel.find(userId).lean()
//   .then((images) => res.json(images))
//   .catch(next);
  userModel.findById( userId )
    .populate('images')
    .then(({images}) => res.json(images))
    .catch(next);
}

function getImages(req, res, next) {
  imageModel.find()
      .populate('userId')
      .then(images => res.json(images))
      .catch(next);
};



function recognizeImage (req, res, next) {
  const uri= req.query.url//.replace(/['"]+/g,'');
  const language=req.query.language//.replace(/['"]+/g,'');
  //console.log(req);
  
  // const filename='pic.png';
  // var writeFile = fs.createWriteStream(filename)
  // request(uri).pipe(writeFile).on('close', function() {
  //   Tesseract.recognize(filename, lang)
  //     //.progress(function (p) { console.log('progress', p) })
  //     .catch(err => console.error(err))
  //     .then(({data: {text}})=>res.status(200)
  //          .json({message: text.replace(/[\n]+/g,' ')}))
  //       process.exit(0)
  //     })
  
  
  // const image = imageModel.findOne({url: uri});

  //const tsr = () => {
  Tesseract.recognize(uri, language)
    .then(({ data: { text } }) => { 
      imageModel.findOneAndUpdate({url: uri}, {$set: {recognizedText:text.replace(/[\n]+/g, ' '),
            language: language}}, {new: true})
     
        .then(image=>{
           res.status(200).json({ message: image.recognizedText })
        })
      .catch(next)
      //res.status(200).json({ message: text.replace(/[\n]+/g, ' ') }))
    })
}

function addImgToUser(userId, image) {
  return Promise.all([
    userModel.findOneAndUpdate({_id: userId}, {$push: {images: image._id}}),
    imageModel.findOneAndUpdate({_id: image._id}, {$set: {recognizedText: '123', language: '456'}})
  ])
};

function uploadImage (req, res, next) {
  //const data = {image: req.body.picture};
  // console.log(req); 
  // console.log(req.file.filename);
  // console.log(req.file.filename.slice(4))
  const url=req.file.path;
  const public_id = req.file.filename;
  //console.log('req.file.filename', req.file.filename)
    
  const originalname=req.file.originalname; 
    //const language = req.file.language;
    const { _id: userId } = req.user;
  
  //cloudinary.uploader.upload(data, function(result) {
    imageModel.create({ url,originalname, userId, language:'', recognizedText: '', public_id})
    .then(createdImage => {
      addImgToUser(userId, createdImage)
      //userModel.findOneAndUpdate({_id: userId}, {$push: {images: createdImage._id}}),
      //res.status(200).json(createdImage)
      .then(([_,image]) => res.status(200).json(image))
    })
    
    // .then(image=> res.status(200).json(image))
    // .then(img=> {
    // (userModel.updateOne({_id: userId}, 
    //   {$push: {images: img._id}}, 
    //   {new: true}))})
    
    .catch(next);
}

function getImage(req, res, next) {
  const { imageId } = req.params;

  imageModel.findOne({_id: imageId})
        .then(image => res.json(image) )
      .catch(next);
};

function editImage(req, res, next) {
  const { _id: imageId, recognizedText } = req.body;
  const { _id: userId } = req.user;
    //const pub_id = 'public_id'
  // const pub_id = 
    // imageModel
    //  .findOne({_id:imageId}, pub_id, function(err, data) {
    //    if (!data) {
    //      callbackify('No data', null)
    //    } else {
    //      callbackify(err, data)
    //    }
    //  })
    
    //.catch(next)
  //console.log(pub_id)

// console.log(req.body,'!!!!REQUEST BODY!!!!!!');
// console.log(req.user,'!!!!REQUEST USER!!!!!!');
// console.log(imageId,'!!!!IMAGE ID!!!!!!');
// console.log(userId,'!!!! USER IDDDD!!!!!!');

  // if the userId is not the same as this one of the post, the post will not be updated
 imageModel.findOneAndUpdate({ _id: imageId, userId }, {recognizedText: recognizedText }, { new: true })
      .then(updatedImage => {
          if (updatedImage) {
            console.log(updatedImage.public_id)
              res.status(200).json(updatedImage);
          }
          else {
              res.status(401).json({ message: `Not allowed!` });
          }
      })
      .catch(next);
};

function deleteImage(req, res, next) {
  const { imageId, public_id } = req.query;
  const { _id: userId } = req.user;
//const public_id = imageId.public_id
//console.log(req)

  Promise.all([
      imageModel.findOneAndDelete({ _id: imageId, userId }),
      userModel.findOneAndUpdate({ _id: userId }, { $pull: { images: imageId } }),
      //console.log('imageId.public_id: ', public_id),
      cloudinary.uploader.destroy(public_id, function(err,result) {
        console.log(result,err);
      })
  ])
      .then(([deletedOne, _, __]) => {
          if (deletedOne) {
              res.status(200).json(deletedOne)
          } else {
              res.status(401).json({ message: `Not allowed!` });
          }
      })
      .catch(next);
}

module.exports = {
  getUserImages,
  getImages,
  getImage,
  uploadImage,
  recognizeImage,
  editImage,
  deleteImage
}