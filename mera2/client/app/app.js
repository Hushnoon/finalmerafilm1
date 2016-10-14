'use strict';

angular.module('mera2App', ['mera2App.auth', 'mera2App.admin', 'mera2App.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
