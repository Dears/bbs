'use strict'

const Post = require('../../model/post');
console.log(Post);
/*
  const postSchema = new Schema({
    username: String,
    time: Date,
    text: String,
  });
*/

// 記事追加
exports.insert = function(username, text) {
  let data = {
    username: username,
    text: text,
    time: new Date()
  };

  Post.collection.insert(data, function(err, result) {
    console.log(result);
  });
};

// 記事一覧の取得
exports.getDataAll = function(){

};

// 記事削除
exports.delete = function(){

};
