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