var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const articleRouter = require('./articles')
const tagRouter = require('./tags')
const commentRouter = require('./comments')

router
  .use(userRouter)
  .use('/articles', articleRouter)
  .use('/tags', tagRouter)
  .use('/comments', commentRouter)

module.exports = router;
