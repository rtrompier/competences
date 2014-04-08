app.factory('User', function($resource, apiURL){
    return $resource(apiURL+'/users/:userId', {userId: '@id'},
        {
            'update': { method:'PUT' }
        });
});