const { json } = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const imageSchema = new mongoose.Schema({
//   image: {type: JSON},
  userId: {
      type: ObjectId,
      ref: "User"
  },
  recognizedText: {type: String},
  //title: String,
  //description: String,
  url: {
    type: String,
    required: true
  },
  language: {
    type: String
  },
  //public_id: String,
  originalname:{
    type: String,
    required: true
  }

}, { timestamps: { createdAt: 'created_at' }})

module.exports = mongoose.model('Image', imageSchema);
