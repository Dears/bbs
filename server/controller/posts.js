'use strict'

const postAdapter = require('../service/adapter/post');

exports.get = function(req, res, next) {
  // mongoDBからデータを渡す
  postAdapter.getPostsAll(function(err, posts) {
    if (err)
      return next(err);
    res.render('posts', { posts: posts });
  });
}

exports.post = function(req, res, next) {
  let text = req.body.text;

// お試しでmongoにも入れてみる
  postAdapter.insert('ogawa', text, function(err) {
    if(err)
      return next(err);
    res.redirect('/posts');
  });
}
