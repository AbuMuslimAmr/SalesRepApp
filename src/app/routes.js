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
      templateUrl: 'app/states/login/login.html'
    })
    .state('workspace', {
      abstract: true,
      url: '/workspace',
      templateUrl: 'app/states/workspace/workspace.html'
    })
      .state('workspace.customers', {
        url: '/customers',
        templateUrl: 'app/states/workspace/customers/customers.html'
      })
      .state('workspace.customer-details', {
        abstract: true,
        url: '/customers/:id',
        templateUrl: 'app/states/workspace/customer-details/customer-details.html'
      })
        .state('workspace.customer-details.notes', {
          url: '/notes',
          templateUrl: 'app/states/workspace/customer-details/tabs/notes.html'
        })
        .state('workspace.customer-details.visits', {
          url: '/visits',
          templateUrl: 'app/states/workspace/customer-details/tabs/visits.html'
        });
  });