app.controller('ExportCtrl', function ($scope, $rootScope, $http, exportSituation) {
    $scope.situations = {};
    $scope.situations = exportSituation.getSituations();
    
    var competences = [];

    $scope.situations.forEach(function (situation) {
                competences.push(situation.competence);
            });

   	$scope.sommaire = _.groupBy(competences, "categorie");
   
});