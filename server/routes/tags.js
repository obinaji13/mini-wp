var express = require('express');
var router = express.Router();
const tag = require('../controllers/tags')
const { checkLogin } = require('../middlewares')

router.use(checkLogin)
router
  .get('/', tag.getAll)
  .post('/', tag.create)

module.exports = router;
