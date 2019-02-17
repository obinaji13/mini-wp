const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featuredImage: {
        type: String
    },
    tags: Array
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article