'use strict'

const util = require('./util');

const tokenMap = {};

const tokenLength = 20;
const tokenExpireTime = 30*60*1000; // 30m

// ログイン認証処理
exports.login = function(email, password){};


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
