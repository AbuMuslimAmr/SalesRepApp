'use strict';

angular
.module('SalesRepApp')
.run(function($rootScope, $templateCache, $state, Restangular, cookiesManager, API_PREFIX) {
  Restangular.setBaseUrl(API_PREFIX);

  $rootScope.user = cookiesManager.get('sra-user');

  // state checker
  $rootScope.state = $state;
  $rootScope.state.is = function(state) {
    return $state.current.name.indexOf(state) !== -1;
  };

  // Customers Grid Actions Cell
  $templateCache.put('customers-actions-cell.html',
    '<div class="ui-grid-cell-contents">' +
    ' <a ng-click="grid.appScope.goToCustomerDetails(row.entity.id)" class="clickable">Details</a>' +
    '</div>'
  );

  $rootScope.bowser = bowser;
});