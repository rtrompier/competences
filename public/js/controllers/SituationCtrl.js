app.controller('SituationCtrl', function ($scope, $rootScope, $routeParams, $http, apiURL, Situations) {
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

        Situations.get({situationId: $routeParams.id}, function(response){
            $rootScope.isLoading = false;
            $scope.situation = response;

        });

    }else{
        $rootScope.isLoading = false;
    }
    

    $http.get(apiURL + '/competences?situations=1')
        .success(function (data) {
            $scope.competences = data;
            if($routeParams.competenceid != undefined){
                $scope.situation.competenceId = $routeParams.competenceid;
            }
        })
        .error(function (error) {
            $rootScope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $rootScope.ok = false;
        }
    );


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

    $scope.competence = {
        name : "",
        categorie : "",
    };

    $scope.newCompetence = function(competence){
        $http.post(apiURL + '/competences', competence, {
            'xsrfCookieName' : 'sid'
        })
            .success(function (data) {
                $scope.competence = data;
                $rootScope.msgNotification = "Nouvelle competence : " + data.name + " créée";
                $rootScope.ok = true;
                $scope.competences.push(data);
                $scope.situation.competenceId = data.id;
            })
            .error(function (error) {
                $rootScope.msgNotification = error;
                $rootScope.ok = false;
            })
        }

});