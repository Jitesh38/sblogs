const express = require('express');
const { createUser, showUser, showAllUser, updateUser, deleteUser,loginUser } = require('../controllers/user.controller');
const varifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id', showUser);
router.get('/',varifyJWT, showAllUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;