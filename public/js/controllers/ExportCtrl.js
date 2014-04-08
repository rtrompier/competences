app.controller('ExportCtrl', function ($scope, $rootScope, $http, Situation, User) {
    
	$rootScope.isLoading = true;

    Situation.query({userId: User.getUser().id, isActive : true},function(response){
        $scope.situations = response;
        $rootScope.isLoading = false;
        var competences = [];
        $scope.situations.forEach(function (situation) {
                competences.push(situation.competence);
            });
        $scope.sommaire = _.groupBy(competences, "categorie");

    }, function(error){
        $rootScope.isLoading = false;
        $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
        $rootScope.ok = false;
    });

   
});