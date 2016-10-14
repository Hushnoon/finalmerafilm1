'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviebytheater/:id/:title/:year', {
        template: '<moviebytheater></moviebytheater>'
      });
  });
