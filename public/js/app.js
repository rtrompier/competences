/**
 * Created by XciD on 23/03/2014.
 */
'use strict;'

var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies' ,'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/mysituation', {
            templateUrl: 'partials/mysituations.html',
            controller: 'MySituationsCtrl',
            access: {
                isFree: false
            }
        })
        .when('/allcomp', {
            templateUrl: 'partials/allcompetences.html',
            controller: 'AllCompetencesCtrl',
            access: {
                isFree: false
            }
        })
        .when('/configure', {
            templateUrl: 'partials/configure.html',
            controller: 'ConfigureCtrl',
            access: {
                isFree: false
            }
        })
        .when('/export', {
            templateUrl: 'partials/export.html',
            controller: 'ExportCtrl',
            access: {
                isFree: false
            }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'RegisterCtrl',
            access: {
                isFree: true
            }
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            access: {
                isFree: true
            }
        })
        .when('/editsituation/:id', {
            templateUrl: 'partials/situation.html',
            controller: 'SituationCtrl',
            access: {
                isFree: false
            }
        })
        .when('/newsituation/:competenceid?', {
            templateUrl: 'partials/situation.html',
            controller: 'SituationCtrl',
            access: {
                isFree: false
            }
        })
        .when('/viewcompetence/:id', {
            templateUrl: 'partials/competence.html',
            controller: 'CompetenceCrtl',
            access: {
                isFree: false
            }
        })
        .otherwise({
            templateUrl: 'partials/mysituations.html',
            controller: 'MySituationsCtrl',
            access: {
                isFree: false
            }
        });

    $httpProvider.defaults.withCredentials = true;
});

app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, current, previous, resolve) {
        var user = JSON.parse(window.localStorage.getItem('user'));
        if (!current.access.isFree && !user) {
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


app.service('exportSituation', function() {
    var situations = {};
    return {
        getSituations: function() {
            return situations;
        },
        setSituations: function(value) {
            situations = value
        }
    }
});

