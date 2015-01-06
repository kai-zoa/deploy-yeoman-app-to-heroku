'use strict';

/**
 * @ngdoc overview
 * @name deployYeomanAppToHerokuApp
 * @description
 * # deployYeomanAppToHerokuApp
 *
 * Main module of the application.
 */
angular
  .module('deployYeomanAppToHerokuApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
