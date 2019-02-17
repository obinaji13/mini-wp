const { verify } = require('../helpers')
const { User, Article, Comment } = require('../models')

module.exports = {
    checkLogin(req, res, next) {
        let { token } = req.headers
        try {
            let decoded = verify(token)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        req.author = user
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'user not found'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: 'Internal server err',
                        err: err
                    })
                })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal server err',
                err: err
            })
        }
    },
    checkOwner(req, res, next) {
        Article
            .findById(req.params.articleId)
            .then(article => {
                if (article) {
                    if (article.author.toString() === req.author._id.toString()) {
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'this is not youre article'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'article not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    checkCommentOwner(req, res, next) {
        Comment
            .findById(req.params.commentId)
            .then(comment => {
                if (comment) {
                    if (comment.userId.toString() === req.author._id.toString()) {
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'this is not youre comment'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'comment not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
}