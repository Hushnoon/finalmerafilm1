'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/success/:eid/:date', {
        template: '<payment></payment>'
      });
  });
