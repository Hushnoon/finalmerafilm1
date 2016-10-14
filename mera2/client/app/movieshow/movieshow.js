'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<movieshow></movieshow>'
      });
  });
