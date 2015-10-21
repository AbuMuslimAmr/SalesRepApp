'use strict';

angular
.module('SalesRepApp')
.controller('CustomerDetailsCtrl', function($scope, $rootScope, $state, api, $stateParams, blocker, $timeout, auth,
                                            GENERAL_ERROR_MESSAGE) {

  // initializing variables
  $scope.currentCustomerId = $stateParams.id;
  $scope.loading = false;
  $scope.errorMessage = null;

  //loads customer details
  $scope.load = function() {
    blocker.block('Loading Customer Details...'); // initializes the blocker
    $scope.loading = true;

    $timeout(function() {
      api // calls api for getting customer details
      .customerDetails({
        customerid: $scope.currentCustomerId
      })
      .then(function(data) {
        if (data.code === 0) { // success
          $scope.customer = data.data;

          if ($scope.customer.visit) { // validating customer input time and date
            if(!isNaN(Date.parse($scope.customer.visit.time))) {
              $scope.customer.visit.time = new Date($scope.customer.visit.time);
            }

            $scope.customer.visit.date = new Date($scope.customer.visit.date);
          }

          // init selected status
          if ($scope.customer.status) {
            $scope.selectedStatus = getStatus($scope.customer.status);
          } else {
            $scope.selectedStatus = $scope.customerStatus[0];
          }

          // init selected action
          if ($scope.customer.visit && $scope.customer.visit.action) {
            $scope.selectedAction = getAction($scope.customer.visit.action);
          } else {
            $scope.selectedAction = $scope.customerActions[0];
          }
        } else { // error
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

  $scope.load();

  function getStatus(value) { // gets the status object using its value
    return _.find($scope.customerStatus, function(status) {
      return status.value === value;
    });
  }

  function getAction(value) { // gets the action object using its value
    return _.find($scope.customerActions, function(action) {
      return action.value === value;
    });
  }

  // Calendar
  $scope.isCalendarOpen = false;
  $scope.calendar = {
    open: function() {
      $scope.isCalendarOpen = true;
    }
  };

  function saveNotes() { // saving notes function
    blocker.block('Saving notes...');
    $scope.errorMessage = null;
    $scope.successMessage = null;

    $timeout(function() {
      api
      .saveNotes({
        customerid : $scope.currentCustomerId,
        status : $scope.selectedStatus.value,
        notes : $scope.customer.notes
      })
      .then(function(data) {
        if (data.code === 0) { // success
          $scope.successMessage = 'Notes saved successfully!';
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
      });
    }, 2000);
  }

  function saveVisits() { // saving visits function
    blocker.block('Saving visits...');
    $scope.errorMessage = null;
    $scope.successMessage = null;

    $timeout(function() {
      api
      .saveVisits({
        customerid : $scope.currentCustomerId,
        visit : {
          date:  $scope.customer.visit.date,
          time: $scope.customer.visit.time,
          action: $scope.selectedAction.value,
          notes: $scope.customer.visit.notes
        }})
      .then(function(data) {
        if (data.code === 0) { // success
          $scope.successMessage = 'Visits saved successfully!';
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
      });
    }, 2000);
  }

  $scope.save = function() { // general save functions, chooses the correct save function to be called
    if($rootScope.state.is('notes')) {
      saveNotes();
    } else {
      $scope.visitsSubmitted = true;

      /* @todo that validation because the submit-button is required to be in the footer, it should be inside the
         the form, so we can make use of angular validations
      */
      if(!$scope.customer.visit || isNaN(Date.parse($scope.customer.visit.date)) || isNaN(Date.parse($scope.customer.visit.date))) {
        return;
      }

      saveVisits();
    }
  };

  $scope.setSelectedStatus = function(status) {
    $scope.selectedStatus = status;
  };

  $scope.setSelectedAction = function(action) {
    $scope.selectedAction = action;
  };

  // customer status select box values
  $scope.customerStatus = [{
    name: 'New',
    value: 'New'
  },{
    name: 'In Progress',
    value: 'InProgress'
  },{
    name: 'Order Placed',
    value: 'OrderPlaced'
  },{
    name: 'Support',
    value: 'Support'
  },{
    name: 'Cancelled',
    value: 'Cancelled'
  },{
    name: 'Rejected',
    value: 'Rejected'
  }];

  // customer actions select box values
  $scope.customerActions = [{
    name: 'Offer',
    value: 'Offer'
  },{
    name: 'Lead',
    value: 'Lead'
  },{
    name: 'Opportunity',
    value: 'Oppourtunity'
  },{
    name: 'New Customer',
    value: 'New Customer'
  }];
});