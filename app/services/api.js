'use strict';

// api layer that wraps restangular logic
angular
  .module('SalesRepApp')
  .service('api', function ($state, Restangular, cookiesManager) {

    function getSessionID() { // checks and returns session id from cookie
      var sessionId = cookiesManager.get('sessionId');

      if(! sessionId) {
        $state.go('login');
      }

      return {
        sessionId: sessionId
      };
    }

    function authenticate(data) {
      return Restangular
        .all('/authenticate')
        .post(data);
    }

    function logout() {
      return Restangular
        .all('/logout')
        .post(getSessionID());
    }

    function listCustomers() {
      return Restangular
        .all('/customer/list')
        .post(getSessionID());
    }

    function customerDetails(params) {
      return Restangular
        .all('/customer/details')
        .post(_.defaults(getSessionID(), params));
    }

    function saveNotes(params) {
      return Restangular
        .all('/customer/savenotes')
        .post(_.defaults(getSessionID(), params));
    }

    function saveVisits(params) {
      return Restangular
        .all('/customer/savevisit')
        .post(_.defaults(getSessionID(), params));
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