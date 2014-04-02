app.controller('CompetenceCrtl', function ($scope, $routeParams, $http, apiURL) {

	$http.get(apiURL + '/competences/' + $routeParams.id)
	        .success(function (data) {
	            $scope.competence = data;
	        })
	        .error(function (error) {
	             $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
	});
	
	$http.get(apiURL + '/users/me')
	        .success(function (data) {
	            $scope.user = data;
	});
	             

	$scope.copySituation = function(id){
		$http.get(apiURL + '/situations/' + id)
	        .success(function (data) {
	           	// suppression de l'id
	            data.id = "";
	            $http.post(apiURL + '/situations/', data)
                .success(function (data) {
                    $scope.msgNotification = 'It has been copied';
                    $scope.ok = true;
                    $scope.competence.situations.push(data)
                })
                .error(function (error) {
                    $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                    $scope.ok = false;
                })
	        })
	        .error(function (error) {
	            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
	            $scope.ok = false;
	        });
	}


});