app.controller('LoginCtrl', function ($scope, $rootScope, $http, $location, apiURL) {

    $scope.isLogin = false;
    $rootScope.isLoading = true;

    $http.get(apiURL + '/users/me')
        .success(function (data) {
            if(data == ""){
                window.localStorage.clear();
                $scope.isLogin = false;
                $rootScope.isLoading = false;
            }else{
                $scope.user = data.username;
                $rootScope.isLoading = false;
                $scope.isLogin = true;
            }
        })
        .error(function (error) {
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
        });
    

    $scope.login = function (username, password) {
        $rootScope.isLoading = true;
        $http.post(apiURL + '/users/login', {
            'username': username,
            'password': password
        })
            .success(function (data, status, headers, config) {
                data.username = username;
                window.localStorage.setItem('user', JSON.stringify(data));
                $rootScope.isLoading = false;
                $scope.user = username;
                $scope.isLogin = true;
                $location.path('/mysituation');    
            })
            .error(function (error) {


                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
            });
    };

    $scope.logout = function () {
        $rootScope.isLoading = true;       
        $http.get(apiURL + '/users/logout')
        .success(function () {
             window.localStorage.clear();
            $rootScope.isLoading = false;
            $scope.isLogin = false;
        });
    }
});