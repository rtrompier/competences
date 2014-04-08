app.factory('Situation', function($resource, apiURL){
    return $resource(apiURL+'/situations/:situationId', {situationId: '@id', userId : '@userId'},
        {
            'update': { method:'PUT' }
        });
});