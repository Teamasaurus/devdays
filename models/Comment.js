const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Comment', CommentSchema)
