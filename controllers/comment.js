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
            const blogPost = await BlogPost.find({_id: req.body.postId}).lean()
            const comments = await Comment.find({postId: req.params.postId}).sort({date: "desc"}).lean()
            res.redirect(`/blogPost/display/${req.params.postId}`)
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
            console.log(req.body.commentIdFromJSFile)
            await Comment.findOneAndDelete({_id: req.body.commentIdFromJSFile})
            console.log('Deleted Comment')
            res.json('Deleted It')
            
        }catch(err){
            console.log(err)
            res.json('Why?!')
        }
    }
}
