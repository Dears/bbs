'use strict'

const http = require('http');
const express = require('express');
const app = express();
const logger = require('morgan');
const post = require('./routes/post');
const ect = require('ect');
const ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' })
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

// logを出力
app.use(logger('dev'));


app.get('/', post.login);

app.listen(3000);
console.log('server listening...');
