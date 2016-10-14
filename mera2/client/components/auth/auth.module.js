'use strict';

angular.module('mera2App.auth', ['mera2App.constants', 'mera2App.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
