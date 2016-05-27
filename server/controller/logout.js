'use strict'

const account = require('../service/account');

exports.post = function(req, res) {

  // session 破棄
  account.sessionDestroy(req, res);

  res.redirect('/login');
}
