'use strict'

const Post = require('../../model/post');

// 記事追加
exports.insert = function(username, text, callback) {
  let post = new Post({
    username: username,
    text: text,
    time: new Date()
  });
  post.save(callback);
};

// 記事一覧の取得
exports.getPostsAll = function(callback) {
  Post.find({}).exec(callback);
};
