'use strict'

// shouldとassertの両方の書き方がある
const assert = require('chai').assert;
//const should = require('chai').should();

// テスト対象
const util = require('../service/util');
describe('util', function() {
  describe('getRamdomStr', function() {
    it('should return currect length (=arg)', function() {
      let random = Math.floor(Math.random() * (20 - 1 + 1)) + 1; //１~20の整数
      assert(random == util.getRandomStr(random).length);
      //util.getRandomStr(random).length.should.equal(random);
    });
    it('should throw exceptions when arg ==  null', function() {
      assert.throws(function() {
        util.getRandomStr(null)
      }, Error, 'Type of numeric is expected.');
      //(function() {util.getRandomStr(null)}).should.throw(Error, 'Type of numeric is expected.');
    })
    it('should throw exceptions when arg ==  0', function() {
      assert.throws(function() {
        util.getRandomStr(0)
      }, Error, 'Type of numeric is expected.');
      //(function() {util.getRandomStr(0)}).should.throw(Error, 'Type of numeric is expected.');
    })
    it('should throw exceptions when arg ==  -1', function() {
      assert.throws(function() {
        util.getRandomStr(-1)
      }, Error, 'Type of numeric is expected.');
      //(function() {util.getRandomStr(-1)}).should.throw(Error, 'Type of numeric is expected.');
    })
    it('should throw exceptions when arg ==  string', function() {
      assert.throws(function() {
        util.getRandomStr('aaa')
      }, Error, 'Type of numeric is expected.');
      //(function() {util.getRandomStr(-1)}).should.throw(Error, 'Type of numeric is expected.');
    })
  });
});
