app.controller('SituationCtrl', function ($scope, $routeParams, $http, apiURL) {
    $scope.isCollapsedContrainte = true;
    $scope.isCollapsedChrono = true;
    $scope.isCollapsedResult = true;
    $scope.isCollapsedDetails = true;
    $scope.isLoading = true;


    $scope.situation = {
        contraintes : [],
        resultat : [],
        chronologiquement : []
    };

    if($routeParams.id != undefined){
        $http.get(apiURL + '/situations/' + $routeParams.id)
        .success(function (data) {
            $scope.situation = data;
            $scope.isLoading = false;
        })
        .error(function (error) {
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
            $scope.isLoading = false;
        });
    }else{
        $scope.isLoading = false;
    }
    

    $http.get(apiURL + '/competences?situations=1')
        .success(function (data) {
            $scope.competences = data;
            if($routeParams.competenceid != undefined){
                $scope.situation.competenceId = $routeParams.competenceid;
            }
        })
        .error(function (error) {
            $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
            $scope.ok = false;
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
        $scope.isLoading = true;
        if(situation.id == undefined){
            $http.post(apiURL + '/situations/', situation)
                .success(function (data) {
                    $scope.isLoading = false;
                    $scope.situation = data;
                    $scope.msgNotification = 'It has been saved';
                    $scope.ok = true;
                })
                .error(function (error) {
                    $scope.isLoading = false;
                    $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                    $scope.ok = false;
                })
        }else{
            $http.put(apiURL + '/situations/' + situation.id, situation)
                .success(function (data) {
                    $scope.isLoading = false;
                    $scope.situation = data;
                    $scope.msgNotification = 'It has been saved';
                    $scope.ok = true;
                })
                .error(function (error) {
                    $scope.isLoading = false;
                    $scope.msgNotification = 'An error has occured' + JSON.stringify(error);
                    $scope.ok = false;
                })
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
                $scope.msgNotification = "Nouvelle competence : " + data.name + " créée";
                $scope.ok = true;
                $scope.competences.push(data);
                $scope.situation.competenceId = data.id;
            })
            .error(function (error) {
                $scope.msgNotification = error;
                $scope.ok = false;
            })
        }
       
});