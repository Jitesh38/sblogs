const express = require('express');
const { createComment,
    showAllComment,
    showComment,
    updateComment,
    deleteComment, } = require('../controllers/comment.controller');

const router = express.Router();

router.post('/', createComment);
router.get('/:id', showComment);
router.get('/', showAllComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);


module.exports = router;