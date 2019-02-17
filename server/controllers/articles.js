const { Article, Tag } = require('../models')

module.exports = {
    create(req, res) {
        let data = JSON.parse(req.body.data)
        Tag.find()
            .then(tags => {
                tags = tags.map(tag => tag.text)
                const newTagsPromises = []
                data.tags.forEach(tag => {
                    if (tags.indexOf(tag) === -1) {
                        newTagsPromises.push(Tag.create({text: tag}))
                    }
                })
                return Promise.all(newTagsPromises)
            })
            .then(responses => {
                const newArticle = {
                    title: data.title,
                    content: data.content,
                    tags: data.tags,
                    author: req.author._id,
                }
                if (req.file) {
                    newArticle.featuredImage = req.file.cloudStoragePublicUrl
                }
                Article
                    .create(newArticle)
                    .then(article => {
                        res.status(201).json(article)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            msg: 'Internal server err',
                            err: err
                        })
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    getAll(req, res) {
        Article
            .find({})
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    getMyArticles(req, res) {
        Article
            .find({author: req.author._id})
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    getOne(req, res) {
        Article
            .findById(req.params.articleId)
            .populate('author')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    update(req, res) {
        let data = JSON.parse(req.body.data)
        Tag.find()
            .then(tags => {
                tags = tags.map(tag => tag.text)
                const newTagsPromises = []
                data.tags.forEach(tag => {
                    if (tags.indexOf(tag) === -1) {
                        newTagsPromises.push(Tag.create({text: tag}))
                    }
                })
                return Promise.all(newTagsPromises)
            })
            .then(() => {
                const newArticle = {
                    title: data.title,
                    content: data.content,
                    tags: data.tags,
                    author: req.author._id,
                }
                if (req.file) {
                    newArticle.featuredImage = req.file.cloudStoragePublicUrl
                }
                Article
                    .findByIdAndUpdate(req.params.articleId, newArticle, {new: true})
                    .then(article => {
                        res.status(200).json(article)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            msg: 'Internal server err',
                            err: err
                        })
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    },
    delete(req, res) {
        Article
            .findByIdAndDelete(req.params.articleId)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    }
}