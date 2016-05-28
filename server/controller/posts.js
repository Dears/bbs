'use strict'

const jsonschema = require('jsonschema').Validator;
const validator = new jsonschema();

const postAdapter = require('../service/adapter/post');
const userAdapter = require('../service/adapter/user');
const postSchema = require('../schema').postSchema;

exports.get = function(req, res, next) {
  // mongoDBからデータを渡す
  postAdapter.getPostsAll(function(err, posts) {
    if (err)
      return next(err);
    res.render('posts', { posts: posts });
  });
}

exports.post = function(req, res, next) {

  //Validation　Check
  if(!validator.validate(req.body, postSchema).valid)
    return next(new Error("不正な入力です"));

  let text = req.body.text;
  let email = req.cookies.email;

  userAdapter.getUserByEmail(email, function(err, user){
    if(err)
      return next(err);

    // DBに記事登録
    postAdapter.insert(user.username, text, function(err) {
      if(err)
        return next(err);
      res.redirect('/posts');
    });
  });
}
