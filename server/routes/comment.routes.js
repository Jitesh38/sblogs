const express = require('express');
const { createComment,
    showAllComment,
    showComment,
    updateComment,
    deleteComment, } = require('../controllers/comment.controller');
const varifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/',varifyJWT, createComment);
router.get('/:id',varifyJWT, showComment);
router.get('/', showAllComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);


module.exports = router;