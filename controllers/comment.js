const Comment = require('../models/Comment')
const BlogPost = require('../models/BlogPost')

module.exports = {
    createComment: async (req, res)=>{
        try{
            console.log(req.body)
            await Comment.create({
                body: req.body.commentBody,
                date: new Date(),
                postId: req.params.postId,
                userId: req.user.id})
            console.log('Comment has been posted!')
            const blogPost = BlogPost.find({_id: req.body.postId})
            const comments = Comment.find({postId: req.params.postId}).sort({date: "desc"}).lean()
            res.render('displayOnePost.ejs', {blogPost: blogPost, postId: blogPost.userId, comments: comments, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    editComment: async (req, res)=>{
        try{
            await Comment.findOneAndUpdate({_id: req.params.id}, {
                body: req.body.postBody,
                date: req.body.date,
                userId: req.user.id})
            console.log(`Blog post ${req.params.id} has been updated!`)
            res.redirect('/blogpost')
        }catch(err){
            console.log(err)
        }
    },
    deleteComment: async (req, res)=>{
        try{
            await Comment.findOneAndDelete({_id: req.body.postIdFromJSFile})
            console.log('Deleted Comment')
            res.json('Deleted It')
            
        }catch(err){
            console.log(err)
        }
    }
}
