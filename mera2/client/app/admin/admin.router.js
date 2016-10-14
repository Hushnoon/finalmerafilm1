'use strict';

angular.module('mera2App.admin')
  .config(function($routeProvider) {
    $routeProvider.when('/admin', {
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    });
  });
