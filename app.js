/**
 * Created by asgard on 18/03/14.
 */
'use strict;'
var app = angular.module('CompetenceApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        })
        .when('/configure', {
            templateUrl: 'configure.html',
            controller: 'ConfigureCtrl'
        })
        .when('/export', {
            templateUrl: 'export.html',
            controller: 'ExportCtrl'
        })
        .otherwise({
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        });
});

app.controller('HomeCtrl', function ($scope, $http) {
    var competences = ['lol', 'lil', 'lal'];
    $scope.competences = competences;
    $http.get('http://192.168.0.93:3000/competences')
        .success(function (data) {
            $scope.competences = data;
        })
        .error(function () {

        });

    $http.get('foo.json').then(function(result) {
        return result.data;
    });
});

app.controller('ConfigureCtrl', function ($scope, $http) {

});

app.controller('ExportCtrl', function ($scope, $http) {

});