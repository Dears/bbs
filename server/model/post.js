'use strict'

// mongoDBに接続
const mongoose = require('mongoose');
const connection = require('../context').connection;

const Schema = mongoose.Schema;
const postSchema = new Schema({
  username: String,
  time: Date,
  text: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
