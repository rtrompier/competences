app.controller('MySituationsCtrl', function ($scope, $rootScope, $http, $location, apiURL, exportSituation, Situations) {
    $rootScope.isLoading = true;

    var user = JSON.parse(window.localStorage.getItem('user'));

    Situations.query({userId: user.uid},function(response){
        $scope.situations = response;
        $rootScope.isLoading = false;

        $scope.$watch('situations', function(newNames, oldNames) {
            newNames.forEach(function (values,key) {
                if(newNames[key]["isActive"] != oldNames[key]["isActive"]){
                      $scope.situations[key].$save();
                }
            })
        },true);

    }, function(error){
        $rootScope.isLoading = false;
        $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
        $rootScope.ok = false;
    });


    $scope.deleteSituation = function(index) {
        $scope.situations[index].$delete(function(response){
            $scope.situations.splice(index,1);
            $rootScope.isLoading = false;
            $rootScope.ok = undefined;
        }, function(error){
            $rootScope.isLoading = false;
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        })
    };




    $scope.proceedToConfiguration = function () {

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