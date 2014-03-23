/**
 * Created by XciD on 23/03/2014.
 */
'use strict;'

var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/mycomp', {
            templateUrl: 'partials/mycomp.html',
            controller: 'MyCompCtrl'
        })
        .when('/allcomp', {
            templateUrl: 'partials/allcomp.html',
            controller: 'AllCompCtrl'
        })
        .when('/configure', {
            templateUrl: 'partials/configure.html',
            controller: 'ConfigureCtrl'
        })
        .when('/export', {
            templateUrl: 'partials/export.html',
            controller: 'ExportCtrl'
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .when('/editComp/:id', {
            templateUrl: 'partials/edit_comp.html',
            controller: 'EditCompCtrl'
        })
        .otherwise({
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });

    $httpProvider.defaults.withCredentials = true;
});

app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, current, previous, resolve) {
        var user = JSON.parse(window.localStorage.getItem('user'));
        if (!user && current.$$route.originalPath !== '/register') {
            $location.path('/login');
        }
    });
})

app.constant('apiURL', 'http://comp.xcid.fr');

