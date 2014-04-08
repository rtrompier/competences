app.controller('LoginCtrl', function ($scope, $rootScope, $http, $location, apiURL,User) {
    User.updateUser();
    
    $scope.isLogin = User.getUser().isLogged;
    $scope.user = User.getUser().username;

    $scope.login = function (username, password) {
        $rootScope.isLoading = true;

        User.login(username,password).then(function(success){
            $rootScope.isLoading = false;
            $location.path('/mysituation');
        },function(error){
            $rootScope.isLoading = false;
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        })
    };

    $scope.logout = function () {
        $rootScope.isLoading = true;       
        User.logout().then(function(sucess){
            $rootScope.isLoading = false;
            $scope.isLogin = false;
        })

    }
});