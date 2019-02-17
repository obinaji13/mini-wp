var express = require('express');
var router = express.Router();
const comment = require('../controllers/comments')
const { checkLogin, checkCommentOwner } = require('../middlewares')

router.use(checkLogin)
router
  .get('/:articleId', comment.getArticleComments)
  .post('/:articleId', comment.create)
  .put('/:commentId', checkCommentOwner, comment.update)
  .delete('/:commentId', checkCommentOwner, comment.delete)

module.exports = router;
