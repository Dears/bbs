'use strict'

const jsonschema = require('jsonschema').Validator;
const validator = new jsonschema();

const account = require('../service/account');
const loginSchema = require('../schema').loginSchema;

exports.get = function(req, res) {
  res.render('login');
}

// ログイン情報を受け取る
exports.post = function(req, res, next) {
  //Validation　Check
  if(!validator.validate(req.body, loginSchema).valid)
    return next(new Error("不正な入力です"));

  let email = req.body.email;
  let password = req.body.password;

  // ログイン認証処理
  account.login(email, password, function(err, user) {
    if(err)
      return next(err);

    // session を作る
    account.sessionGenerate(res, email, password);
    // ログイン成功
    res.redirect('/posts');
  });
}
