app.controller('ExportCtrl', function ($scope, $rootScope, $http, Situation) {
    
	$rootScope.isLoading = true;

    var user = JSON.parse(window.localStorage.getItem('user'));

    Situation.query({userId: user.uid, isActive : true},function(response){
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