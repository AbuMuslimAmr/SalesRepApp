'use strict';

// utilities function
angular
.module('SalesRepApp')
.service('utils', function () {

  // returns Base64 of MD5 encoded input
  function encrypt(password) {
    var hash = CryptoJS.MD5(password);
    return hash.toString(CryptoJS.enc.Base64);
  }

  //generates random token to be used for user login authentication
  function randomToken() {
    var tokenLength = 32,
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+',
        token = '';

    _.times(tokenLength, function() {
      token += chars[Math.round(Math.random() * (chars.length - 1))];
    });

    return token;
  }

  return {
    encrypt: encrypt,
    randomToken: randomToken
  };
});