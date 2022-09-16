const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')


router.post('/createComment/:postId', ensureAuth, commentController.createComment)

router.delete('/deleteComment', ensureAuth, commentController.deleteComment)

module.exports = router
