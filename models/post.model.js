const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (obj, next) => {

    const post = new Post(obj.body);

    post.updateOne({ post_id: obj.post_id}, function(err, post) {
        next(err, post)
    })
}

exports.findPost = (obj, next) => {

    const post = new Post(obj.body);

    post.findOne({ post_id: obj.post_id}, function(err, post) {
        next(err, post)
    })
}

exports.findAllPosts = (obj, next) => {

    const post = new Post(obj.body);

    // Find posts by author
    post.find({}, function(err, post) {
        next(err, post)
    })

}