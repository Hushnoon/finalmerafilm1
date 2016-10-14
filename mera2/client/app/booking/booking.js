'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booking/:tid/slot/:sid/date/:showdt/time/:showtime', {
        template: '<booking></booking>'
      });
  });
