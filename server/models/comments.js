const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
