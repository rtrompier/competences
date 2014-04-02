app.controller('AllCompetencesCtrl', function ($scope, $http, apiURL) {
    var competences = [];
    $scope.competences = competences;
    
    $scope.newCompetences = {
        name : "",
        categorie : ""
    }
    
    $http.get(apiURL + '/competences?mini=1')
        .success(function (data) {
            $scope.competences = data;
            $scope.competences.forEach(function(competence){
                competence.editing = {};
                competence.editing.name = false;
                competence.editing.categorie = false;
            })
        })
        .error(function (error) {
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
    });

    
    $scope.createCompetence = function(newCompetence){
        $http.post(apiURL + '/competences', newCompetence)
            .success(function (data) {
                $scope.msgNotification = "Nouvelle competence : " + data.name + " créée";
                $scope.ok = true;
                
                $scope.newCompetence.name = "";
                $scope.newCompetence.categorie = "";
                $scope.competences.push(data);
                $scope.situation.competenceId = data.id;
            })
            .error(function (error) {
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
            })
    }

    $scope.saveCompetence = function(competence){
        $http.put(apiURL + '/competences/'+ competence.id, competence)
            .success(function (data) {
                $scope.msgNotification = "Competence mise à jour";
                $scope.ok = true;
                // TODO Rediriger page precedente
            })
            .error(function (error) {
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
            })
        competence.editing = false;
    }

    $scope.deleteCompetence = function(index){
        $http.delete(apiURL + '/competences/'+$scope.competences[index]["id"])
            .success(function (data) {
                $scope.msgNotification = "Competence supprimé";
                $scope.ok = true;
                $scope.competences.splice(index,1);
            })
            .error(function (error) {
                $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $scope.ok = false;
            })
    }
    
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