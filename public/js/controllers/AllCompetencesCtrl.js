app.controller('AllCompetencesCtrl', function ($scope, $rootScope, $http, apiURL) {
    $rootScope.isLoading = true;

    $scope.newCompetences = {
        name: "",
        categorie: ""
    };

    $http.get(apiURL + '/competences?mini=1')
        .success(function (data) {
            $scope.competences = data;
            $scope.competences.forEach(function (competence) {
                competence.editing = {};
                competence.editing.name = false;
                competence.editing.categorie = false;
            });
            $rootScope.isLoading = false;
            
        })
        .error(function (error) {
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
            $rootScope.isLoading = false;
        });


    $scope.createCompetence = function (newCompetence) {
        $rootScope.isLoading = true;
        $http.post(apiURL + '/competences', newCompetence)
            .success(function (data) {
                $scope.newCompetence.name = "";
                $scope.newCompetence.categorie = "";
                $scope.competences.push(data);
                $scope.situation.competenceId = data.id;

                $rootScope.msgNotification = "Nouvelle competence : " + data.name + " créée";
                $rootScope.ok = true;
                $rootScope.isLoading = false;
            })
            .error(function (error) {
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
                $rootScope.isLoading = false;
            })
    };

    $scope.saveCompetence = function (competence) {
        $rootScope.isLoading = true;
        $http.put(apiURL + '/competences/' + competence.id, competence)
            .success(function () {
                $rootScope.msgNotification = "Competence mise à jour";
                $rootScope.ok = true;
                $rootScope.isLoading = false;
                // TODO Rediriger page precedente
            })
            .error(function (error) {
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
                $rootScope.isLoading = false;
            });
        competence.editing = false;
    };

    $scope.deleteCompetence = function (index) {
        $rootScope.isLoading = true;
        $http.delete(apiURL + '/competences/' + $scope.competences[index]["id"])
            .success(function () {
                $rootScope.msgNotification = "Competence supprimé";
                $rootScope.ok = true;
                $rootScope.isLoading = false;
                $scope.competences.splice(index, 1);
            })
            .error(function (error) {
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
                $rootScope.isLoading = false;
            })
    };

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