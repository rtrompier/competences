app.controller('SituationCtrl', function ($scope, $rootScope, $routeParams, Situation, Competence) {
    $scope.isCollapsedContrainte = true;
    $scope.isCollapsedChrono = true;
    $scope.isCollapsedResult = true;
    $scope.isCollapsedDetails = true;
    $rootScope.isLoading = true;
    

    $scope.situation = {
        contraintes : [],
        resultat : [],
        chronologiquement : []
    };

    if($routeParams.id != undefined){
        Situation.get({situationId: $routeParams.id}, function(response){
            $rootScope.isLoading = false;
            $scope.situation = response;
        });
    }else{
        $rootScope.isLoading = false;
    }
    
    Competence.query({situations: 1},function(response){
        $scope.competences = response;
        if($routeParams.competenceid != undefined){
            $scope.situation.competenceId = $routeParams.competenceid;
        }
    }, function(error){
        $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
        $rootScope.ok = false;
    });


    $scope.addContrainte = function(){
        $scope.situation.contraintes.push({
            val : $scope.newContrainte
        });
        $scope.newContrainte = "";
    };

    $scope.removeContrainte = function(index){
        $scope.situation.contraintes.splice(index,1);
    };
    $scope.addResultat = function(){
        $scope.situation.resultat.push({
            val : $scope.newResultat
        });
        $scope.newResultat = "";
    };

    $scope.removeResultat = function(index){
        $scope.situation.resultat.splice(index,1);
    };

    $scope.addChrono = function(){
        $scope.situation.chronologiquement.push({
            val : $scope.newChrono
        });
        $scope.newChrono = "";
    };

    $scope.removeChrono = function(index){
        $scope.situation.chronologiquement.splice(index,1);
    };

    $scope.updateSituation = function (situation) {
        $rootScope.isLoading = true;
        if(situation.id == undefined){
            $scope.situation.$save(function(result){
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'It has been saved';
                $rootScope.ok = true;

            },function(error){
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
            });
        }else{
            $scope.situation.$update(function(result){
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'It has been saved';
                $rootScope.ok = true;
            },function(error){
                $rootScope.isLoading = false;
                $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
                $rootScope.ok = false;
            });
        }
    };

    $scope.createCompetence = function (newCompetence) {
        var competence = new Competence();
        competence.name = $scope.newCompetence.name;
        competence.categorie = $scope.newCompetence.categorie;
        competence.$save(function(response){
            $scope.newCompetence.name = "";
            $scope.newCompetence.categorie = "";
            $scope.competences.push(competence);
            $scope.situation.competenceId = competence.id;
        },function(error){
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        }); 
    };
});