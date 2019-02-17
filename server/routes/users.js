var express = require('express');
var router = express.Router();
const user = require('../controllers/users')
const { multer, sendUploadToGCS  } = require('../middlewares/image')

router
  .post('/verifyToken', user.verifyToken)
  .post('/login', user.login)
  .post('/register', multer.single('file'), sendUploadToGCS, user.register)
  .post('/googleLogin', user.googleLogin)

module.exports = router;
