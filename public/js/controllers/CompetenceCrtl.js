app.controller('CompetenceCrtl', function ($scope, $rootScope, $routeParams, $http, apiURL) {
	$rootScope.isLoading = true;

	$http.get(apiURL + '/competences/' + $routeParams.id)
	        .success(function (data) {
	            $scope.competence = data;
	            $rootScope.isLoading = false;
	        })
	        .error(function (error) {
	             $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
	             $scope.ok = false;
	             $rootScope.isLoading = false;
	});
	
	$scope.user = JSON.parse(window.localStorage.getItem('user'));                  

	$scope.copySituation = function(id){
		$rootScope.isLoading = true;

		$http.get(apiURL + '/situations/' + id)
	        .success(function (data) {
	           	// suppression de l'id
	            data.id = "";
	            $http.post(apiURL + '/situations/', data)
                .success(function (data) {
                    $scope.msgNotification = 'It has been copied';
                    $scope.ok = true;
                    $scope.competence.situations.push(data);
                     $rootScope.isLoading = false;
                })
                .error(function (error) {
                    $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                    $scope.ok = false;
                    $rootScope.isLoading = false;
                })
	        })
	        .error(function (error) {
	            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
	            $scope.ok = false;
	            $rootScope.isLoading = false;
	        });
	}


});