const config = require('./config');
const mongoose = require('mongoose');
const rdyString = `${'*'.repeat(10)}Database is ready${'*'.repeat(10)}`;


module.exports = () => {
  return mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  console.log(rdyString)
  )
};