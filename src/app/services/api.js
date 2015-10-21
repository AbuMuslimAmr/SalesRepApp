'use strict';

angular
  .module('SalesRepApp')
  .service('api', function (Restangular) {

    function authenticate(data) {
      return Restangular
        .all('/authenticate')
        .post(data);
    }

    function logout(data) {
      return Restangular
        .all('/logout')
        .post(data);
    }

    function listCustomers(data) {
      return Restangular
        .all('/customer/list')
        .post(data);
    }

    function customerDetails(data) {
      return Restangular
      .all('/customer/details')
      .post(data);
    }

    function saveNotes(data) {
      return Restangular
      .all('/customer/savenotes')
      .post(data);
    }

    function saveVisits(data) {
      return Restangular
      .all('/customer/savevisits')
      .post(data);
    }

    return {
      authenticate: authenticate,
      logout: logout,
      listCustomers: listCustomers,
      customerDetails: customerDetails,
      saveNotes: saveNotes,
      saveVisits: saveVisits
    };
  });