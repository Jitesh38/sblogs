const express = require('express');
const { createPost, showPost, showAllPost, updatePost, deletePost } = require('../controllers/post.conrtroller');
const varifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/',varifyJWT, createPost);
router.get('/', showAllPost);
router.get('/:id',varifyJWT, showPost);
router.put('/:id',varifyJWT, updatePost);
router.delete('/:id',varifyJWT, deletePost);


module.exports = router;