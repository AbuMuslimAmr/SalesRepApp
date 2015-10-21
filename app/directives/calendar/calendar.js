'use strict';

//calender directive
angular
.module('SalesRepApp')
.directive('calendar', function(api, $q) {
  return {
    restrict: 'E',
    templateUrl: 'public/app/directives/calendar/calendar.html',
    scope: {
      options: '=',
      isOpen: '='
    },
    link: function(scope) {
      function load() { //loading current visits from the database
        scope.events = [];
        scope.eventSources = [scope.events];

        // api call for getting list of customers to get their details
        api
        .listCustomers()
        .then(function(data) {
          if (data.code === 0) {
            var customers = data.data;
            loadVisits(customers);
          }
        });
      }

      function loadVisits(customers) { //loop on each customer to get his saved visits
        _.forEach(customers, function(customer) {
          getCustomerById(customer.id)// given an id, get customer details including visits details
          .then(function(customerDetails) {
            if (customerDetails && customerDetails.visit) {
              var event = { //initialize event variable to be used in the calender
                title: customerDetails.customername,
                start: new Date(customerDetails.visit.date)
              };

              scope.events.push(event); //pushes the new visit to the events list
            }
          });
        });
      }

      function getCustomerById(id) { // gets specific customer details given its id
        var defer = $q.defer();

        // api call to get the customer details from database
        api
        .customerDetails({
          customerid: id.toString()
        })
        .then(function(data) {
          defer.resolve(data.data);
        });

        return defer.promise;
      }

      scope.calendarConfig = { //calender configuration variable used by the ng-calender library
        height: 450,
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        }
      };

      scope.testCalendar = function() { //function to produce random visits events to be listed in the calender for testing
        _.times(30, function(i) {
          var sampleDate = new Date(),
          randomNumber = Math.round(Math.random() * 20) - 10,
          date = sampleDate.setDate(sampleDate.getDate() + randomNumber);

          var event = {
            title: 'Sample Event ' + i,
            start: date
          };

          scope.events.push(event);
        });
      };

      scope.close = function() { // closes the calender view
        scope.isOpen = false;
      };

      load(); //loads the calender and its data
    }
  };
});