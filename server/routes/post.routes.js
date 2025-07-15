const express = require('express');
const { createPost, showPost, showAllPost, updatePost, deletePost } = require('../controllers/post.conrtroller');

const router = express.Router();

router.post('/', createPost);
router.get('/', showAllPost);
router.get('/:id', showPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


module.exports = router;