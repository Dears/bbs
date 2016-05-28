'use strict'

const account = require('../service/account');

exports.get = function(req, res) {
  res.render('signup');
}

// ユーザ情報登録
exports.post = function(req, res, next) {
  //　情報受け取る
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // ユーザ登録する
  account.regist(username, email, password, function(err) {
    if(err)
      return next(err);

    // ログイン処理
    account.login(email, password, function(err, user){
      if(err)
        return next(err);

      // session を作る
      account.sessionGenerate(res, email, password);

      res.redirect('posts');
    });
  });
}
