const express = require('express');
const { createPost, showPost, showAllPost, updatePost, deletePost, searchPost, savePost, likePost, showSavedPosts } = require('../controllers/post.conrtroller');
const varifyJWT = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.post('/',varifyJWT,upload.single('postImage'), createPost);
router.get('/', showAllPost);
router.get('/search', searchPost);
router.post('/save', varifyJWT,savePost);
router.get('/v/:id',varifyJWT, showPost);
router.put('/like',varifyJWT, likePost);
router.get('/bookmarks',varifyJWT, showSavedPosts);
// router.put('/:id',varifyJWT, updatePost);
// router.delete('/:id',varifyJWT, deletePost);


module.exports = router;