const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlware/auth');
const multer = require('../middlware/multer-config');


router.get('/', auth, postCtrl.get);
router.post('/', auth, multer, postCtrl.save);
router.get('/:id', auth, postCtrl.getOne);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', postCtrl.likePost)





module.exports = router;