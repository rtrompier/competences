app.controller('MySituationsCtrl', function ($scope, $rootScope, $location, Situation, User) {
    $rootScope.isLoading = true;

    Situation.query({userId: User.getUser().id},function(response){
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
});