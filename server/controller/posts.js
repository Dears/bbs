'use strict'

const postAdapter = require('../service/adapter/post');
const userAdapter = require('../service/adapter/user');

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
  let email = req.cookies.email;
  userAdapter.getUserByEmail(email, function(err, user){
    if(err)
      return next(err);

    // お試しでmongoにも入れてみる
    postAdapter.insert(user.username, text, function(err) {
      if(err)
        return next(err);
      res.redirect('/posts');
    });
  });
}
