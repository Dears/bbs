'use strict'

const jsonschema = require('jsonschema').Validator;
const validator = new jsonschema();

const account = require('../service/account');
const registSchema = require('../schema').registSchema;

exports.get = function(req, res) {
  res.render('signup');
}

// ユーザ情報登録
exports.post = function(req, res, next) {
  //Validation　Check
  if(!validator.validate(req.body, registSchema).valid){
    console.log(validator.validate(req.body, registSchema));
    return next(new Error("不正な入力です"));
  };

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
