app.controller('RegisterCtrl', function ($scope, $http, $location) {

    $scope.username = '';
    $scope.password = '';
    $scope.password2 = '';

    $scope.register = function (username, password) {
        $scope.isLoading = true;
        $http.post(apiURL + '/users', {
            'username': username,
            'password': password
        })
            .success(function () {
                $location.path('/login');
            })
            .error(function (error) {
                $scope.isLoading = false;
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
            });
    };

});