'use strict';

angular
.module('SalesRepApp')
.controller('CustomersCtrl', function($scope, $state, $q, api, $templateCache, auth, blocker, $timeout,
                                      GENERAL_ERROR_MESSAGE) {
  // initializing variables
  $scope.loading = false;
  $scope.errorMessage = null;
  $scope.visits = [];

  $scope.load = function() {
    blocker.block('Loading customers...'); // initialize blocker message
    $scope.errorMessage = null;
    $scope.loading = true;

    $timeout(function() {
      api // api for getting list of customers
      .listCustomers()
      .then(function(data) {
        if (data.code === 0) { // success
          $scope.customersList = data.data;
          $scope.gridOptions.data = $scope.customersList;
        } else {
          $scope.errorMessage = GENERAL_ERROR_MESSAGE + ' Message: ' + data.message + '.';

          // @todo APIs should return meaningful error codes or return HTTP STATUS CODE 401/403
          if (data.message.toLowerCase().indexOf('unauthenticated') !== -1) {
            auth.kickout(); // session expired
          }
        }
      }, function() {
        $scope.errorMessage = GENERAL_ERROR_MESSAGE;
      })['finally'](function() {
        blocker.stop();
        $scope.loading = false;
      });
    }, 2000);
  };

  $scope.load(); // injected to $scope to use for 'Refresh' button

  // grid options variable used by ng-grid library
  $scope.gridOptions = {
    enableFiltering: true,
    columnDefs: [{
      field:'customername',
      displayName:'Name'
    },{
      field:'id',
      displayName:'ID'
    },{
      field:'productname',
      displayName:'Product Name'
    },{
      field:'status',
      displayName:'Status'
    },{
      field:'username',
      displayName:'Details',
      cellTemplate: $templateCache.get('customers-actions-cell.html'),
      enableSorting: false,
      enableFiltering: false
    }]
  };

  // navigates to selected customer details view
  $scope.goToCustomerDetails = function(customerId) {
    $state.go('workspace.customer-details.notes', {id: customerId});
  };

  $scope.isCalendarOpen = false;
  $scope.calendar = {
    open: function() {
      $scope.isCalendarOpen = true;
    }
  };
});