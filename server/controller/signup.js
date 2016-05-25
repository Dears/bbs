'use strict'

const account = require('../service/account');

exports.get = function(req, res) {
  res.render('signup');
}

exports.post = function(req, res) {
  //　情報受け取る
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // ユーザ登録する

  // ログイン処理
  account.login(email, password);
  res.redirect('posts');
}
