'use strict'

exports.post = function(req, res) {
  // session 破棄

  res.redirect('/login');
}
