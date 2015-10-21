'use strict';

angular
  .module('SalesRepApp')
  .controller('LoginCtrl', function($rootScope, $scope, $state, api) {

  var encryptPassword = function(password) {
    return password;
  };

    $scope.submitted = false;

    $scope.login = function () {
      $scope.submitted = true;
      if ($scope.loginForm.$valid) {

        api
        .authenticate({
          "token" : "QCiTzbXCAYA3AvDgYN3MuBwY/1i89q6TfW7aVS1Av1c=",
          "digest" : "6R1HZqYJFfRQUA0L/hqCEA==",
          "user" : {
            "username" : $scope.user.name,
            "password" : encryptPassword($scope.user.password)
          } })
        .then(function(d) {
          $rootScope.sessionID = d.sessionId;
          $state.go("workspace.customers");
        });

      }
    };
  });