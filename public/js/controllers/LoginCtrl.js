app.controller('LoginCtrl', function ($scope, $http, $location, apiURL) {

    $scope.isLogin = false;
    $scope.isLoading = true;

    $http.get(apiURL + '/users/me')
        .success(function (data) {
            if(data == ""){
                window.localStorage.clear();
                $scope.isLogin = false;
                $scope.isLoading = false;
            }else{
                $scope.user = data.username;
                $scope.isLoading = false;
                $scope.isLogin = true;
            }
        })
        .error(function (error) {
                $scope.isLoading = false;
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
        });
    

    $scope.login = function (username, password) {
        $scope.isLoading = true;
        $http.post(apiURL + '/users/login', {
            'username': username,
            'password': password
        })
            .success(function (data, status, headers, config) {
                window.localStorage.setItem('user', JSON.stringify(data));
                $scope.isLoading = false;
                $scope.user = username;
                $scope.isLogin = true;
                $location.path('/mysituation');    
            })
            .error(function (error) {


                $scope.isLoading = false;
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
            });
    };

    $scope.logout = function () {
        $scope.isLoading = true;       
        $http.get(apiURL + '/users/logout')
        .success(function () {
             window.localStorage.clear();
            $scope.isLoading = false;
            $scope.isLogin = false;
        });
    }
});