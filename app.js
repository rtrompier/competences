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
    var competences = [];
    $scope.competences = competences;
    $http.get('http://192.168.0.93:3000/competences')
        .success(function (data) {
            competences = data;
            $scope.competences = competences;
        })
        .error(function () {

        });

    $scope.proceedToConfiguration = function () {
        console.log('On va exporter ---> ');
        console.log(competences);
        for (var i = 0; i < competences.length; i++) {
            var competence = competences[i];
            if (competence.isActive) {
                console.log(competence.name);
            } else {
                console.log('on export pas ' + competence.name);
            }
        }
    }

});

app.controller('ConfigureCtrl', function ($scope, $http) {

});

app.controller('ExportCtrl', function ($scope, $http) {

});