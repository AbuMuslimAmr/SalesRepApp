'use strict';

angular
  .module('SalesRepApp')
  .run(function(Restangular, $templateCache) {
    Restangular.setBaseUrl('/SRA');
    Restangular.setDefaultHttpFields({withCredentials: true});

    // Customers Grid Actions Cell
    $templateCache.put('customers-actions-cell.html',
      '<div class="ui-grid-cell-contents">' +
      ' <a ng-click="grid.appScope.goToCustomerDetails(row.entity.id)" class="clickable">Details</a>' +
      '</div>'
    );
  });