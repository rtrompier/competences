app.controller('CompetenceCrtl', function ($scope, $rootScope, $routeParams, Competence, Situation, User) {
	$rootScope.isLoading = true;

	Competence.get({competenceId: $routeParams.id}, function(response){
            $rootScope.isLoading = false;
            $scope.competence = response;
        },function(error){
        	$rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
	        $rootScope.ok = false;
	        $rootScope.isLoading = false;
        });

	$scope.user = User.getUser();                 

	$scope.copySituation = function(id){
		
		var situation = new Situation();
		Situation.get({situationId: id}, function(response){
            situation = response
            situation.id = "";
            situation.$save(function(result){
            	$rootScope.msgNotification = 'It has been copied';
                $rootScope.ok = true;
                $scope.competence.situations.push(situation);
            },function(error){
            	 $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                 $rootScope.ok = false;
            })
        },function(error){
        	$rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
	        $rootScope.ok = false;
        });
	}


});