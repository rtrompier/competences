app.factory('Competence', function($resource, apiURL){
    return $resource(apiURL+'/competences/:competenceId', {competenceId: '@id'},
        {
            'update': { method:'PUT' }
        });
});