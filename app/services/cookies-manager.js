'use strict';

// cookie manager used to set, get, remove the cookies used in the application
angular
.module('SalesRepApp')
.service('cookiesManager', function($cookies) {
  return {
    set: function(key, value) {
      $cookies.putObject(key, value, {path: '/'});
    },
    get: function(key) {
      return $cookies.getObject(key);
    },
    remove: function(key) {
      $cookies.remove(key, {path: '/'});
    }
  };
});