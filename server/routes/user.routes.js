const express = require('express');
const { createUser, showUser, showAllUser, updateUser, deleteUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/:id', showUser);
router.get('/', showAllUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;