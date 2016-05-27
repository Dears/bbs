'use strict'

const seed = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// length文字のランダムな文字列を返す
exports.getRamdomStr = function(length){
  let seedLength = seed.length;
  let randomStr = '';
  for (var i = 0; i < length; i++) {
    let index = Math.floor((Math.random() * seedLength));
    randomStr += seed.charAt(index);
  }
  return randomStr;
};
