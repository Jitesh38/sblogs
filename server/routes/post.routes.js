const express = require('express');
const { createPost, showPost, showAllPost, updatePost, deletePost, searchPost } = require('../controllers/post.conrtroller');
const varifyJWT = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.post('/',varifyJWT,upload.single('postImage'), createPost);
router.get('/', showAllPost);
router.get('/search', searchPost);
router.get('/v/:id',varifyJWT, showPost);
router.put('/:id',varifyJWT, updatePost);
router.delete('/:id',varifyJWT, deletePost);


module.exports = router;