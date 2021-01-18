const router = require('express').Router();
const users = require('./users');
const images = require('./images');
// const posts = require('./posts');
// const likes = require('./likes');
// const test = require('./test');

router.use('/users', users);
router.use('/images', images);
// router.use('/posts', posts);
// router.use('/likes', likes);
// router.use('/test', test);

module.exports = router;
