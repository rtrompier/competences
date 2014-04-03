app.controller('MySituationsCtrl', function ($scope, $http, $location, apiURL,exportSituation) {
    $scope.isLoading = true;
    
    var user = JSON.parse(window.localStorage.getItem('user'));
    if (user){
        $http.get(apiURL + '/situations?userId=' + user.uid +"&mini=1")
        .success(function (data) {
            $scope.situations = data;
            $scope.isLoading = false;
            $scope.ok = undefined;
        })
        .error(function (error) {
            $scope.isLoading = false;
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
        });
    }
  
    $scope.deleteSituation = function(index) {       
        
        $http.delete(apiURL + '/situations/'+$scope.situations[index]["id"])
        .success(function () {
            $scope.situations.splice(index,1);
            $scope.isLoading = false;
            $scope.ok = undefined;
        })
        .error(function () {
            $scope.isLoading = false;
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
        });
    };

    $scope.proceedToConfiguration = function (situations) {
        exportSituations = [];
        console.log(situations);
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