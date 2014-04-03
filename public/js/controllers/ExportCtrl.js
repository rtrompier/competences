app.controller('ExportCtrl', function ($scope, $http,exportSituation) {
    $scope.situations = exportSituation.getSituations();
    
    $scope.competences = [1,2,3,4,5];
});