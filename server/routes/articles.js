var express = require('express');
var router = express.Router();
const article = require('../controllers/articles')
const { checkLogin, checkOwner } = require('../middlewares')
const { multer, sendUploadToGCS  } = require('../middlewares/image')

router.use(checkLogin)
router
  .get('/', article.getAll)
  .get('/myarticles', article.getMyArticles)
  .get('/:articleId', article.getOne)
  .post('/', multer.single('file'), sendUploadToGCS, article.create)
  .put('/:articleId', checkOwner, multer.single('file'), sendUploadToGCS, article.update)
  .delete('/:articleId', checkOwner, article.delete)

module.exports = router;
