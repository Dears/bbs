'use strict'

// mongoDBに接続
const mongoose = require('mongoose');
const connection = require('../context').connection;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  addtime: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
