'use strict'

const http = require('http');
const express = require('express');
const app = express();
const logger = require('morgan');
const ect = require('ect');
const ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' })
const bodyParser = require('body-parser');


app.set('views', __dirname + '/views');
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// logを出力
app.use(logger('dev'));
// postに必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const index = require('./controller/index');
const login = require('./controller/login');
const posts = require('./controller/posts');
const logout = require('./controller/logout');
const signup = require('./controller/signup');
app.get('/', index.get);
app.get('/login', login.get);
app.post('/login', login.post);
app.get('/posts', posts.get);
app.post('/posts', posts.post);
app.post('/logout', logout.post);
app.get('/signup', signup.get);
app.post('/signup', signup.post);

// エラー処理
app.use(function(err, req, res, next){
  res.send(err.message);
});

app.listen(3000);
console.log('server listening...');
