'use strict';

angular
.module('SalesRepApp')
.controller('WorkspaceCtrl', function($rootScope, $scope, $state, api, $stateParams, $templateCache) {

  var listCustomers = function () {
    api
    .listCustomers({
      "sessionId" : $rootScope.sessionID
    })
    .then(function(d) {
      $scope.customersList = d.data;
      $scope.gridOptions.data = $scope.customersList;
    });
  };

  listCustomers();

  $scope.gridOptions = {
    columnDefs: [
      {field:'customername', displayName:'Name'},
      {field:'id', displayName:'ID'},
      {field:'productname', displayName:'Product Name'},
      {field:'status', displayName:'Status'}, {
        field:'username',
        displayName:'details',
        cellTemplate: $templateCache.get('customers-actions-cell.html')
      }
    ]};

  $scope.goToCustomerDetails = function(customerId) {
    $state.go('workspace.customer-details.notes', {id: customerId});
  };

  $scope.logout = function () {
      api
      .logout({
        "sessionId" : $rootScope.sessionID
      })
      .then(function(d) {
        $rootScope.sessionID = d.sessionId;
        $state.go("login");
      });

  };

  $scope.currentCustomer = $stateParams.id;
  var getCustomerDetails= function() {
    console.log("hello");
    api
    .customerDetails({
      "sessionId" : $rootScope.sessionID,
      "customerid" : $scope.currentCustomer
    })
    .then(function(d) {
      $scope.customerDetails = d.data;
      console.log($scope.customerDetails);
    });
  };
  getCustomerDetails();


  $scope.saveNotes = function() {
    api
    .saveNotes({
      "sessionId" : $rootScope.sessionID,
      "customerid" : $scope.currentCustomer,
      "status" : "InProgress",
      "notes" : $scope.notes.notes
    })
    .then(function(d) {
      console.log(d);
    });
  };
});