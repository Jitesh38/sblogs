const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const commentRouter = require('./comment.routes');
const { Router } = require('express');

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/post', postRouter)
router.use('/api/comment', commentRouter)


module.exports = router