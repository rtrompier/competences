app.controller('RegisterCtrl', function ($scope, $rootScope, $http, $location) {
    $rootScope.isLoading = false;
    $scope.username = '';
    $scope.password = '';
    $scope.password2 = '';

    $scope.register = function (username, password) {
        $rootScope.isLoading = true;
        $http.post(apiURL + '/users', {
            'username': username,
            'password': password
        })
            .success(function () {
                $location.path('/login');
            })
            .error(function (error) {
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
            });
    };

});