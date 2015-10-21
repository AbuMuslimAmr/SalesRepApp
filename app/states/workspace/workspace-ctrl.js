'use strict';

angular
.module('SalesRepApp')
.controller('WorkspaceCtrl', function($scope, $rootScope, $timeout, auth, blocker) {
  $scope.logout = function () {
    blocker.block('Good bye, ' + $rootScope.user.firstname + '...'); // initial blocker message

    $timeout(function() {
      blocker.stop();
      auth.kickout(); // logging out logic
    }, 2000);
  };
});