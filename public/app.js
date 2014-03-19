/**
 * Created by asgard on 18/03/14.
 */
'use strict;'
var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/mycomp', {
            templateUrl: 'mycomp.html',
            controller: 'MyCompCtrl'
        })
        .when('/allcomp', {
            templateUrl: 'allcomp.html',
            controller: 'AllCompCtrl'
        })
        .when('/configure', {
            templateUrl: 'configure.html',
            controller: 'ConfigureCtrl'
        })
        .when('/export', {
            templateUrl: 'export.html',
            controller: 'ExportCtrl'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'RegisterCtrl'
        })
        .when('/login', {
          templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        });
});

app.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };
}]);

app.controller('MyCompCtrl', function ($scope, $http) {
    //TODO : Charger les competences ratachée au user uniquement.

    var competences = [];
    $scope.competences = competences;
    $http.get('http://comp.xcid.fr/competences')
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

app.controller('AllCompCtrl', function ($scope, $http) {
    var competences = [];
    $scope.competences = competences;
    $http.get('http://comp.xcid.fr/competences')
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
app.controller('LoginCtrl', function ($scope, $http, $location, $cookies) {
    $scope.login = function (username, password) {
        $http.post('http://comp.xcid.fr/users/login', {
            'username': username,
            'password': password
        })
            .success(function (data, status, headers, config) {
                $cookies.user = data;
                $location.path('/mycomp');
            })
            .error(function (data, status, headers, config) {
                alert('Une erreur s\'est produite');
            });
    };
});

app.controller('RegisterCtrl', function ($scope, $http, $location) {

    $scope.username = '';
    $scope.password = '';
    $scope.password2 = '';

    $scope.register = function (username, password) {
        $http.post('http://comp.xcid.fr/users', {
            'username': username,
            'password': password
        })
        .success(function (data, status, headers, config) {
            $location.path('/login');
        })
        .error(function (data, status, headers, config) {
           alert('Une erreur s\'est produite');
        });
    };

});

app.controller('ConfigureCtrl', function ($scope, $http) {

});

app.controller('ExportCtrl', function ($scope, $http) {
    $scope.competences = [1,2,3,4,5];
});