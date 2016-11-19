const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date
});

module.exports = mongoose.model('Post', postSchema);