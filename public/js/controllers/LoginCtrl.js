app.controller('LoginCtrl', function ($scope, $http, $location, apiURL) {

    $scope.isLogin = false;

    $http.get(apiURL + '/users/me')
        .success(function (data) {
            if(data == ""){
                $scope.isLogin = false;
                window.localStorage.setItem('user', JSON.stringify(data));
            }else{
                window.localStorage.clear();
                $scope.isLogin = true;
            }
    });

    $scope.login = function (username, password) {
        $http.post(apiURL + '/users/login', {
            'username': username,
            'password': password
        })
            .success(function (data, status, headers, config) {
                $location.path('/mycomp');    
            })
            .error(function (data, status, headers, config) {
                alert('Une erreur s\'est produite');
            });
    };

    $scope.logout = function () {
        $http.get(apiURL + '/users/logout')
        .success(function (data) {
            window.localStorage.clear();
            $scope.isLogin = false;
        });
    }
});