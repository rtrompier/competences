/**
 * Created by XciD on 23/03/2014.
 */
'use strict;'

var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies' ,'ui.bootstrap','ngResource']);

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
        .when('/viewsituation/:id', {
            templateUrl: 'partials/viewsituation.html',
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

app.run(function ($rootScope, $location, User) {
        $rootScope.$on("$routeChangeStart", function(event, current, previous, resolve) {
            if (!current.access.isFree && !User.getUser().isLogged) {
                $location.path('/login');
            }
        });
});

app.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };
}]);

app.constant('apiURL', 'http://comp.xcid.fr');


