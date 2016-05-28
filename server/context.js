'use strict'

const mongoose = require('mongoose');
exports.connection = mongoose.connect('mongodb://localhost/bbs');
