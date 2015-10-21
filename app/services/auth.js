'use strict';

// handles logging user out and removes its stored cookies
angular
.module('SalesRepApp')
.service('auth', function ($rootScope, api, $state, cookiesManager) {
  function kickout() {
    api
      .logout()
      .then(function() {
        cookiesManager.remove('sessionId');
        $state.go("login");
        $rootScope.user = null;
      });
  }

  return {
    kickout: kickout
  };
});