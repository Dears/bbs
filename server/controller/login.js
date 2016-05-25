'use strict'

const account = require('../service/account');

exports.get = function(req, res) {
  res.render('login');
}

// ログイン情報を受け取る
exports.post = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  // ログイン認証処理
  account.login(email, password);

  // session を作る

  // ログイン成功
  res.redirect('/posts');
}
