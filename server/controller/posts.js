'use strict'

const postAdapter = require('../service/adapter/post');

//仮に表示するデータを配列で
const posts = [
  {id: '0', username:'ogawa', time:'ddd', text:'body0', },
  {id: '1', username:'ogawa1', time:'dddd', text:'body1', },
  {id: '2', username:'ogawa2', time:'ddddd', text:'body2', },
  {id: '3', username:'ogawa3', time:'dddddd', text:'body3', },
];

exports.get = function(req, res) {
  res.render('posts', { posts: posts });
}

exports.post = function(req, res) {
  let text = req.body.text;

  posts.push({
    id: posts.length,
    username: 'ogawa' + posts.length,
    time: 'ssss',
    text: text
  });

// お試しでmongoにも入れてみる
  postAdapter.insert('ogawa', text);

  res.redirect('/posts');
}
