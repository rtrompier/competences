/**
 * Created by XciD on 23/03/2014.
 */
'use strict;'

var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies' ,'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/mysituation', {
            templateUrl: 'partials/mysituations.html',
            controller: 'MySituationsCtrl'
        })
        .when('/allcomp', {
            templateUrl: 'partials/allcompetences.html',
            controller: 'AllCompetencesCtrl'
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
        .when('/editsituation/:id', {
            templateUrl: 'partials/situation.html',
            controller: 'SituationCtrl'
        })
        .when('/newsituation/:competenceid', {
            templateUrl: 'partials/situation.html',
            controller: 'SituationCtrl'
        })
        .when('/viewcompetence/:id', {
            templateUrl: 'partials/competence.html',
            controller: 'CompetenceCrtl'
        })
        .otherwise({
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
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

app.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };
}]);

app.constant('apiURL', 'http://comp.xcid.fr');