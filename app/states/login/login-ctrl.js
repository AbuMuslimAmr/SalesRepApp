'use strict';

angular
.module('SalesRepApp')
.controller('LoginCtrl', function($scope, $rootScope, $state, $timeout, api, utils, cookiesManager, blocker,
                                  GENERAL_ERROR_MESSAGE) {
  // login function fired when pressing login btn
  $scope.login = function() {
    blocker.block('Logging...'); // initializes the blocker
    $scope.errorMessage = null;
    $scope.successMessage = null;

    // getting password hash and random token from the utilities
    var passwordHash = utils.encrypt($scope.user.password),
        randomToken = utils.randomToken();

    // calling api for authenticating user and logging in
    api
    .authenticate({
      token: randomToken,
      digest : utils.encrypt($scope.user.name + ',' + passwordHash + ',' + randomToken),
      user : {
        username : $scope.user.name,
        password : passwordHash
      }
    })
    .then(function(data) {

      // if success
      if (data.code === 0) {

        //setting sessionId and user cookies
        cookiesManager.set('sessionId', data.sessionId);
        cookiesManager.set('sra-user', data.data);
        $rootScope.user = data.data;

        //setting the sucess message text to be shown
        $scope.successMessage = 'Successful login!';

        // slight delay for user to read the message
        $timeout(function() {
          $state.go("workspace.customers");
          blocker.stop();
        }, 2000);
      }  else { // if the data code reflects an error
        $scope.errorMessage = data.message; //set error message
        blocker.stop();
      }
    }, function() {
      $scope.errorMessage = GENERAL_ERROR_MESSAGE;
      blocker.stop();
    });
  };
});