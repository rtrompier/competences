app.controller('AllCompetencesCtrl', function ($scope, $rootScope, Competence) {
    $rootScope.isLoading = true;

    Competence.query({mini: 1},function(response){
        $scope.competences = response;
        $scope.competences.forEach(function (competence) {
                competence.editing = {};
                competence.editing.name = false;
                competence.editing.categorie = false;
        });
        $rootScope.isLoading = false;

    }, function(error){
        $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
        $rootScope.ok = false;
        $rootScope.isLoading = false;
    });


    $scope.createCompetence = function (newCompetence) {
        var competence = new Competence();
        competence.name = $scope.newCompetence.name;
        competence.categorie = $scope.newCompetence.categorie;
        competence.$save(function(response){
            $scope.newCompetence.name = "";
            $scope.newCompetence.categorie = "";
        },function(error){
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        });
        $scope.competences.push(competence);
    };

    $scope.saveCompetence = function (index) {
        $scope.competences[index].$save(function(result){
            $scope.competences[index].editing = false;
        },function(error){
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        })
    };

    $scope.deleteCompetence = function (index) {
        $scope.competences[index].$delete(function(result){
            $scope.competences.splice(index, 1);
        },function(error){
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
            $rootScope.isLoading = false;
        });
    };

});