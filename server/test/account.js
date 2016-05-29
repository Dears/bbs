'use strict'

const assert = require('chai').assert; // こっちではshould記法は略。 util.jsを参照
const User = require('../model/user');
const userAdapter = require('../service/adapter/user');

// テスト対象
const account = require('../service/account');

const testName = 'test';
const testEmail = 'test@test.jp';
const testPass = 'testpass';
const testName2 = 'test2';
const testEmail2 = 'test2@test.jp';
const testPass2 = 'testpass2';

const crypto = require('crypto');
const cryptoPassword = 'passw0rd';
const salt = 'asdf';

// 各itテスト前に毎回実行される
beforeEach(function(done) {
  User.remove({}, function(err) {
    if (err)
      console.log("mongo delete error");
    done();
  });
});

describe('account', function() {
  describe('regist', function() {
    it('should registed currect user data', function(done){
      account.regist(testName, testEmail, testPass, function(err) {
        userAdapter.getUserByEmail(testEmail, function(err, registedData){
          assert.ok(!err);
          assert.ok(registedData);
          assert.equal(registedData.username, testName);
          // 復号化してから比較する
          let decipher = crypto.createDecipher('aes192', cryptoPassword);
          decipher.update(registedData.password, 'hex', 'utf8');
          let discipheredPass = decipher.final('utf8');
          assert.equal(discipheredPass, salt + testPass);
        });
        done();
      });
    });
    // 非同期での異常系チェック-------------------------
    it('should return exception when username dont match schema', function(done) {
      account.regist(1111, 'test@test.jp', 'testpass', function(err) {
        assert.throws(function() { throw err; },　Error, 'Type of numeric is expected.');
        done();
      });
    });
    it('should return exception when email dont match schema', function(done) {
      account.regist('test', 'test', 'testpass', function(err) {
        assert.throws(function() { throw err; },　Error, 'Type of numeric is expected.');
        done();
      });
    });
    it('should return exception when password dont match schema', function(done) {
      account.regist('test', 'test@test.jp', 1111, function(err) {
        assert.throws(function() { throw err; },　Error, 'Type of numeric is expected.');
        done();
      });
    });
  });

  describe('login', function() {
    it('should return exception when input non registed password', function(done){
      account.regist(testName, testEmail, testPass, function(err){
        if(err)
          console.log('regist error');
        account.login(testEmail, testPass2, function(err, user){
            assert.ok(err);
            assert.ok(!user);
            done();
        });
      });
    });
    it('should return exception when input non registed email', function(done){
      account.regist(testName, testEmail, testPass, function(err){
        if(err)
          console.log('regist error');
        account.login(testEmail2, testPass, function(err, user){
            assert.ok(err);
            assert.ok(!user);
            done();
        });
      });
    });

  });
});
