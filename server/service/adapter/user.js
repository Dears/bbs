'use strict'

const User = require('../../model/user');

// ユーザ登録
exports.insert = function(username, password, email, callback) {
  let user = new User({
    username: username,
    password: password,
    email: email,
    addtime: new Date()
  });
  user.save(callback);
};

// 特定ユーザの取得
exports.getUserByEmail = function(email, callback) {
  User.findOne({email:email}).exec(callback);
};
