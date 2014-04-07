app.controller('MySituationsCtrl', function ($scope, $rootScope, $http, $location, apiURL,exportSituation) {
    $rootScope.isLoading = true;
    
    var user = JSON.parse(window.localStorage.getItem('user'));
    if (user){
        $http.get(apiURL + '/situations?userId=' + user.uid)
        .success(function (data) {
            $scope.situations = data;
            $rootScope.isLoading = false;
            $scope.ok = undefined;
        })
        .error(function (error) {
            $rootScope.isLoading = false;
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
        });
    }
  
    $scope.deleteSituation = function(index) {       
        
        $http.delete(apiURL + '/situations/'+$scope.situations[index]["id"])
        .success(function () {
            $scope.situations.splice(index,1);
            $rootScope.isLoading = false;
            $scope.ok = undefined;
        })
        .error(function () {
            $rootScope.isLoading = false;
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
        });
    };

    $scope.proceedToConfiguration = function (situations) {
        exportSituations = [];
        for (var i = 0; i < situations.length; i++) {
            var situation = situations[i];
            if (situation.isActive) {
                exportSituations.push(situation);
            }
        }
        exportSituation.setSituations(exportSituations);
        $location.path('/export');  
    }

});