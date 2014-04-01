app.controller('AllCompCtrl', function ($scope, $http, apiURL) {
    var competences = [];
    $scope.competences = competences;
    $http.get(apiURL + '/competences', {
        'xsrfCookieName' : 'sid'
    })
        .success(function (data) {
            competences = data;
            $scope.competences = competences;
        })
        .error(function () {

        });

    $scope.proceedToConfiguration = function () {
        console.log('On va exporter ---> ');
        console.log(competences);
        for (var i = 0; i < competences.length; i++) {
            var competence = competences[i];
            if (competence.isActive) {
                console.log(competence.name);
            } else {
                console.log('on export pas ' + competence.name);
            }
        }
    }

});