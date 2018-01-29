chillforpebble.controller('login', function($scope, $http, $location, $ionicLoading, $timeout) {

	$scope.user = [];

	$scope.auth = function(user) {
		$scope.user = user;

		$http.post('http://api.iamchill.co/v2/users/index/', {'login': user.login, 'password': user.password})
		.success(function(data) {
			window.localStorage['idUser'] = data.response.id_user;
			window.localStorage['tokenUser'] = data.response.token;
			if (data.response !== 'Password is not valid.') {
				$location.path('/dialogs');
			} else {
				$ionicLoading.show({
					template: 'Bad password'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
			};

			// $http.defaults.headers.common['X-Parse-Application-Id'] = 'vlSSbINvhblgGlipWpUWR6iJum3Q2xd7GthrDVUI';
			// $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'kIw91AWjXcGtqkBJ2tj5LjbwvhbZUgPahKTBUeho';

			var req = {
				method: 'POST',
				url: 'https://api.parse.com/1/installations/mrmBZvsErB',
				headers: {
					'X-Parse-Application-Id': 'vlSSbINvhblgGlipWpUWR6iJum3Q2xd7GthrDVUI',
					'X-Parse-REST-API-Key': 'kIw91AWjXcGtqkBJ2tj5LjbwvhbZUgPahKTBUeho'
				},
				data: {'channels': [ "us" +  window.localStorage['idUser']]}
			}

			$http(req).then(function(data){
				console.log(data);
				// window.localStorage['dataParseObjectId'] = data.objectId;
			}, function(err){
				console.log(err);
				$ionicLoading.show({
					template: 'Bad request to parse.com'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
			});

			// $http.post('https://api.parse.com/1/installations/', {'deviceType': 'android', 'deviceToken': '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'channels': [""]}, )
			// .success(function(data) {
			// 	console.log(data.response);
			// 	window.localStorage['dataParseObjectId'] = data.objectId;
			// })
			// .error(function(err) {
			// 	$ionicLoading.show({
			// 		template: 'Bad request to parse.com'
			// 	});
			// 	$timeout(function() {
			// 		$ionicLoading.hide();
			// 	}, 800);
			// });
		})
.error(function(err) {
	$ionicLoading.show({
		template: 'Bad request'
	});
	$timeout(function() {
		$ionicLoading.hide();
	}, 800);
});
};
});