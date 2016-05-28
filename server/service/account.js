'use strict'

const util = require('./util');
const userAdapter = require('./adapter/user');

const crypto = require('crypto');
const cryptoPassword = 'passw0rd';
const salt = 'asdf';

const tokenMap = {};

const tokenLength = 20;
const tokenExpireTime = 30*60*1000; // 30m

// ユーザ登録する
exports.regist = function(username, email, password, callback){
  // 暗号化して登録
  let cipher = crypto.createCipher('aes192', cryptoPassword);
  cipher.update(salt + password, 'utf8', 'hex');
  let cipheredPass = cipher.final('hex');

  userAdapter.insert(username, cipheredPass, email, callback);
};

// ログイン認証処理
exports.login = function(email, password, callback){
  userAdapter.getUserByEmail(email, function(err, user){
    if(err)
      return callback(err);
    if(user ==　null)
      return callback(new Error('未登録のユーザーです'));

    // 復号化してから比較する
    let decipher = crypto.createDecipher('aes192', cryptoPassword);
    decipher.update(user.password, 'hex', 'utf8');
    let discipheredPass = decipher.final('utf8');
    if(discipheredPass != salt + password)
      return callback(new Error('パスワードが違います'));

    // ユーザ認証に成功
    callback(null, user);
  });
};

// セッション作る
exports.sessionGenerate = function(res, email, password){
  // データを照合してログイン
  let token = util.getRamdomStr(tokenLength);
  tokenMap[token] = email;
  res.cookie('token', token, {maxAge: tokenExpireTime});
  res.cookie('email', email, {maxAge: tokenExpireTime});
};

// セッションチェック
exports.sessionCheck = function(req, res, next) {
  let token = req.cookies.token || 'no token';
  let email = req.cookies.email || 'no email';
  if (tokenMap[token] == email) { // req.session.user セッション情報があるかどうか
    next();
  } else {
    res.redirect('/login');
  }
};

// セッション破棄
exports.sessionDestroy = function(req, res){
  let token = req.cookies.token;
  delete tokenMap[token]; // (≒ tokenMap[token] = null;) // サーバー側のデータ削除
  res.clearCookie('token');  // ユーザ側のクッキー削除
  res.clearCookie('email');
};
