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