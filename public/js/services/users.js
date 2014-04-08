app.factory('User', function(apiURL,$http,$rootScope){
    var factory = {
		isLogged: false,
		id : '',
		username: '',

		login : function(username,password){
			$http.post(apiURL + '/users/login', {
            		'username': username,
            		'password': password
        	})
            .success(function (data) {
                factory.username = username;
                factory.id = data.uid;
                data.name = username;
                window.localStorage.setItem('user', JSON.stringify(data));
                return factory
            })
            .error(function (error) {

            });	
		},
		logout : function () {
		    $http.get(apiURL + '/users/logout')
		        .success(function () {
		            window.localStorage.clear();
		    });
    	},
    	getUser : function() { 		
    		
    	}

	};
	return factory;
});