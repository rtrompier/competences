app.controller('MySituationsCtrl', function ($scope, $http, apiURL) {

    var user = JSON.parse(window.localStorage.getItem('user'));

    $http.get(apiURL + '/situations?userId=' + user.id+"&mini=1")
        .success(function (data) {
            $scope.situations = data;
        })
        .error(function () {
    });

    $scope.deleteSituation = function(index) {       
        $http.delete(apiURL + '/situations/'+$scope.situations[index]["id"])
        .success(function () {
            $scope.situations.splice(index,1);
        })
        .error(function () {
        });
    };

    $scope.proceedToConfiguration = function () {
        console.log('On va exporter ---> ');
        for (var i = 0; i < situations.length; i++) {
            var situation = situations[i];
            if (situation.isActive) {
                console.log(situation.competence.name);
            } else {
                console.log('on export pas ' + situation.competence.name);
            }
        }
    }

});