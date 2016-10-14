'use strict';

angular.module('mera2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatermovie', {
        template: '<theatermovie></theatermovie>'
      });
  });
