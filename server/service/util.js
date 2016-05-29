'use strict'

const jsonschema = require('jsonschema').Validator;
const validator = new jsonschema();

const naturalNumberSchema = require('../schema').naturalNumberSchema;

const seed = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// length文字のランダムな文字列を返す
exports.getRandomStr = function(length){
  //Validation　Check
  if(!validator.validate(length, naturalNumberSchema).valid)
    throw new Error("Type of numeric is expected.");

  let seedLength = seed.length;
  let randomStr = '';
  for (var i = 0; i < length; i++) {
    let index = Math.floor((Math.random() * seedLength));
    randomStr += seed.charAt(index);
  }
  return randomStr;
};
