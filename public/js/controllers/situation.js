app.controller('MySitCtrl', function ($scope, $http, apiURL,$cookies) {
    //TODO : Charger les competences ratachée au user uniquement.
    $scope.cookies = $cookies.user;

    var user = JSON.parse(window.localStorage.getItem('user'));

    var situations = [];
    $scope.situations = situations;
    $http.get(apiURL + '/situations')
        .success(function (data) {
            situations = data;
            $scope.situations = situations;
        })
        .error(function () {

        });

    $scope.proceedToConfiguration = function () {
        console.log('On va exporter ---> ');
        console.log(competences);
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

app.controller('EditSitCtrl', function ($scope, $routeParams, $http, apiURL) {
    $scope.isCollapsedContrainte = true;
    $scope.isCollapsedChrono = true;
    $scope.isCollapsedResult = true;

    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    

    $http.get(apiURL + '/situations/' + $routeParams.id, {
        'xsrfCookieName' : 'sid'
    })
        .success(function (data) {
            $scope.situation = data;
        })
        .error(function (data) {
            alert('Error');
        });

    $http.get(apiURL + '/competences?situations=1', {
        'xsrfCookieName' : 'sid'
    })
        .success(function (data) {
            $scope.competences = data;
        })
        .error(function () {
        });


    $scope.addContrainte = function(){
        $scope.situation.contraintes.push({
            val : $scope.newContrainte
        });
        $scope.newContrainte = "";
    }

    $scope.removeContrainte = function(index){
        $scope.situation.contraintes.splice(index,1);
    }

    $scope.removeResultat = function(index){
        $scope.situation.resultat.splice(index,1);
    }

    $scope.removeChrono = function(index){
        $scope.situation.chronologiquement.splice(index,1);
    }

    $scope.addResultat = function(){
        $scope.situation.resultat.push({
            val : $scope.newResultat
        });
        $scope.newResultat = "";
    }

    $scope.addChrono = function(){
        $scope.situation.chronologiquement.push({
            val : $scope.newChrono
        });
        $scope.newChrono = "";
    }

    $scope.updateSituation = function (situation) {
        $http.put(apiURL + '/situations/' + situation.id, situation, {
            'xsrfCookieName' : 'sid'
        })
            .success(function (data) {
                $scope.situation = data;
                $scope.msgNotification = 'It has been saved';
                $scope.ok = true;
            })
            .error(function () {
                $scope.msgNotification = 'An error has occured';
                $scope.ok = false;
            })
    }

    $scope.competence = {
        name : "",
        categorie : "",
        userId : $scope.user.id
    }
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

app.controller('NewSitCtrl', function ($scope, $routeParams, $http, apiURL) {
     $http.get(apiURL + '/competences', {
        'xsrfCookieName' : 'sid'
    })
        .success(function (data) {
            
            $scope.competences = data;
        })
        .error(function () {

        });

    $scope.situation = {
        contraintes : [],
        resultat : [],
        chronologiquement : []
    }

    $scope.addContrainte = function(){
        $scope.situation.contraintes.push({
            val : $scope.newContrainte
        });
        $scope.newContrainte = "";
    }

    $scope.removeContrainte = function(index){
        $scope.situation.contraintes.splice(index,1);
    }

    $scope.removeResultat = function(index){
        $scope.situation.resultat.splice(index,1);
    }

    $scope.removeChrono = function(index){
        $scope.situation.chronologiquement.splice(index,1);
    }

    $scope.addResultat = function(){
        $scope.situation.resultat.push({
            val : $scope.newResultat
        });
        $scope.newResultat = "";
    }

    $scope.addChrono = function(){
        $scope.situation.chronologiquement.push({
            val : $scope.newChrono
        });
        $scope.newChrono = "";
    }

    var user = JSON.parse(window.localStorage.getItem('user'));
    $scope.situation.userId = user.id;

    $scope.updateSituation = function (situation) {
        $http.post(apiURL + '/situations', situation, {
            'xsrfCookieName' : 'sid'
        })
            .success(function (data) {
                $scope.situation = data;
                $scope.msgNotification = 'It has been saved';
                $scope.ok = true;
            })
            .error(function (error) {
                $scope.msgNotification = error;
                $scope.ok = false;
            })
    }

    
});