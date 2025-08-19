const express = require('express');
const { createUser, showUser, currentUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/user.controller');
const varifyJWT = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

const router = express.Router();

router.post('/register',upload.single('avatar'), createUser);
router.post('/login', loginUser);
router.get('/logout',varifyJWT, logoutUser);
router.get('/', varifyJWT, currentUser);
router.put('/',varifyJWT,upload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);
router.get('/s/:uname', showUser);


module.exports = router;