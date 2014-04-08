app.factory('User', function(apiURL,$http,$rootScope, $q, $cookieStore){
    var factory = {
		currentUser : {
			isLogged: false,
			id : '',
			username: ''
		},
		login : function(username,password){
			var deffered = $q.defer();
			$http.post(apiURL + '/users/login', {
            		'username': username,
            		'password': password
        	})
            .success(function (data) {
                factory.currentUser.username = username;
                factory.currentUser.isLogged = true;
                factory.currentUser.id = data.uid;

                window.localStorage.setItem('user', JSON.stringify(factory.currentUser));

                deffered.resolve(factory.currentUser.username);
                
            })
            .error(function (error) {
            	deffered.reject(error);
            });
            return deffered.promise;
		},
		logout : function () {
		    var deffered = $q.defer();
		    $http.get(apiURL + '/users/logout')
		        .success(function () {
		        	factory.currentUser = {
		                	isLogged: false,
							id : '',
							username: ''
		                };
		            window.localStorage.clear();
		            deffered.resolve("Logout");
		    })
		    .error(function(error){
		    	deffered.reject(error);
		    });
		    return deffered.promise;
    	},
    	getUser : function() { 		
    		if(window.localStorage.getItem('user') != null){
    			factory.currentUser = JSON.parse(window.localStorage.getItem('user'));
    		}
    		return factory.currentUser;
    	},
    	updateUser : function(){
    		$http.get(apiURL + '/users/me')
		        .success(function (data) {
		            if(data == ""){
		                window.localStorage.clear();
		            }else{
		            	factory.currentUser.username = data.username;
                		factory.currentUser.isLogged = true;
                		factory.currentUser.id = data.id;
		              	window.localStorage.setItem('user', JSON.stringify(factory.currentUser));
		            }
		        });
    	}
	};
	return factory;
});