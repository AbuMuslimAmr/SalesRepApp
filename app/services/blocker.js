'use strict';

// a blocker which is shown while changes are in progress
angular
.module('SalesRepApp')
.service('blocker', function ($rootScope) {
  function block(msg) { // initializes the blocker message with the given on or set it to default message
    if (msg) {
      $rootScope.loadingText = msg;
    } else {
      $rootScope.loadingText = 'Loading...';
    }

    $rootScope.blocking = true; // shows the blocker
  }

  function stop() { //to hide the blocker
    $rootScope.blocking = false;
  }

  return {
    block: block,
    stop: stop
  };
});