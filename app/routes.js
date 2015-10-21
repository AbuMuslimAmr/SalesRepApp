'use strict';

angular
.module('SalesRepApp')
.config(function ($stateProvider, $urlRouterProvider, DEFAULT_STATE) {
// unmatched routes
$urlRouterProvider.otherwise(DEFAULT_STATE);
$urlRouterProvider.when('/', DEFAULT_STATE);
$urlRouterProvider.when('/customers/:id', '/customers/:id/notes');

$stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'public/app/states/login/login.html'
  })
  .state('workspace', {
    url: '/workspace',
    templateUrl: 'public/app/states/workspace/workspace.html'
  })
    .state('workspace.customers', {
      url: '/customers',
      templateUrl: 'public/app/states/workspace/customers/customers.html'
    })
    .state('workspace.customer-details', {
      url: '/customers/:id',
      templateUrl: 'public/app/states/workspace/customer-details/customer-details.html'
    })
      .state('workspace.customer-details.notes', {
        url: '/notes',
        templateUrl: 'public/app/states/workspace/customer-details/tabs/notes.html'
      })
      .state('workspace.customer-details.visits', {
        url: '/visits',
        templateUrl: 'public/app/states/workspace/customer-details/tabs/visits.html'
      });
});