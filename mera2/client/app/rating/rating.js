'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rating/:title/:year', {
        template: '<rating></rating>'
      });
  });
