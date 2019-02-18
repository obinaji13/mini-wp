const { Comment } = require('../models')

module.exports = {
    create(req, res) {
        const newComment = {
            userId: req.author._id,
            articleId: req.params.articleId,
            comment: req.body.comment
        }
        Comment
            .create(newComment)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    getArticleComments(req, res) {
        Comment
            .find({articleId: req.params.articleId})
            .populate('userId')
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    update(req, res) {
        const newComment = {
            comment: req.body.comment
        }
        Comment
            .findByIdAndUpdate(req.params.commentId, newComment)
            .populate('userId')
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    },
    delete(req, res) {
        Comment
            .findByIdAndDelete(req.params.commentId)
            .then(comment => {
                req.status(200).json(comment)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    }
}