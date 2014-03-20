/**
 * Created by asgard on 18/03/14.
 */
'use strict;'
var app = angular.module('CompetenceApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $httpProvider) {
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
        .when('/editComp/:id', {
            templateUrl: 'edit_comp.html',
            controller: 'EditCompCtrl'
        })
        .otherwise({
            templateUrl: 'home.html',
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

app.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (path) {
        return $location.path() == path;
    };
}]);

<<<<<<< HEAD
app.controller('MyCompCtrl', function ($scope, $http, apiURL) {
=======
app.controller('MyCompCtrl', function ($scope, $http, $cookies) {
>>>>>>> FETCH_HEAD
    //TODO : Charger les competences ratachée au user uniquement.
    $scope.cookies = $cookies.user;

    var user = JSON.parse(window.localStorage.getItem('user'));
    console.log(user);

    var situations = [];
    $scope.situations = situations;
    $http.get(apiURL + '/situations')
        .success(function (data) {
            situations = data;
            $scope.situations = situations;
        })
        .error(function () {

        });

    $scope.proceedToConfiguration = function () {
        console.log('On va exporter ---> ');
        console.log(competences);
        for (var i = 0; i < situations.length; i++) {
            var situation = situations[i];
            if (situation.isActive) {
                console.log(situation.competence.name);
            } else {
                console.log('on export pas ' + situation.competence.name);
            }
        }
    }

});

app.controller('AllCompCtrl', function ($scope, $http, apiURL) {
    var competences = [];
    $scope.competences = competences;
    $http.get(apiURL + '/competences', {
        'xsrfCookieName' : 'sid'
    })
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

app.controller('EditCompCtrl', function ($scope, $routeParams, $http, apiURL) {
    $http.get(apiURL + '/situations/' + $routeParams.id, {
        'xsrfCookieName' : 'sid'
    })
        .success(function (data) {
            $scope.situation = data;
        })
        .error(function (data) {
            alert('Error');
        });

    $scope.updateSituation = function (situation) {
        $http.put(apiURL + '/situations/' + situation.id, situation, {
            'xsrfCookieName' : 'sid'
        })
            .success(function (data) {
                $scope.situation = data;
                $scope.msgNotification = 'It has been saved';
                $scope.ok = true;
            })
            .error(function () {
                $scope.msgNotification = 'An error has occured';
                $scope.ok = false;
            })
    }

});

app.controller('LoginCtrl', function ($scope, $http, $location, apiURL) {

    $scope.isLogin = false;
    var user = window.localStorage.getItem('user');
    if (user) {
        $scope.isLogin = true;
    }

    $scope.login = function (username, password) {
        $http.post(apiURL + '/users/login', {
            'username': username,
            'password': password
        })
            .success(function (data, status, headers, config) {

                $http.get(apiURL  + '/users/' + data.uid)
                    .success(function (data) {
                        window.localStorage.setItem('user', JSON.stringify(data));
                        $location.path('/mycomp');
                })
                .error(function () {

                })
            })
            .error(function (data, status, headers, config) {
                alert('Une erreur s\'est produite');
            });
    };

    $scope.logout = function () {
        window.localStorage.clear();
        $scope.isLogin = false;
    }
});

app.controller('RegisterCtrl', function ($scope, $http, $location) {

    $scope.username = '';
    $scope.password = '';
    $scope.password2 = '';

    $scope.register = function (username, password) {
        $http.post(apiURL + '/users', {
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