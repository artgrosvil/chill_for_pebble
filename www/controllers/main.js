chillforpebble.controller('main', function($scope, $http, $location, $cordovaDialogs, $timeout, $ionicLoading) {

	if (window.localStorage['tokenUser'] != undefined) {

		// sending token
		$http.defaults.headers.common['X-API-TOKEN'] = window.localStorage['tokenUser'];
		
		// go contact
		$scope.doSearch = function() {
			$location.path('/search');
		};

		$scope.doContacts = function() {
			$location.path('/contacts');
		};

		// exit the app
		$scope.doExit = function() {
			$cordovaDialogs.confirm('Are You sure?', 'Exit from Chill', ['Yes','Cancel'])
			.then(function(buttonIndex) {
				if (btnIndex == title) {
					localStorage.removeItem('idUser');
					localStorage.removeItem('tokenUser');
					$location.path('/login');
				};
			});
		};

		// $http.defaults.headers.common['X-Parse-Application-Id'] = 'vlSSbINvhblgGlipWpUWR6iJum3Q2xd7GthrDVUI';
		// $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'kIw91AWjXcGtqkBJ2tj5LjbwvhbZUgPahKTBUeho';

		$http.post('https://api.parse.com/1/installations/' + window.localStorage['dataParseObjectId'], {'channels': [ 'us' + window.localStorage['idUser'] ] })
		.success(function(data) {
			console.log(data.response);
			window.localStorage['dataParseObjectId'] = data.objectId;
		})
		.error(function(err) {
			$ionicLoading.show({
				template: 'Bad request to parse.com'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 800);
		});

		$scope.doExit = function() {
			localStorage.removeItem('idUser');
			localStorage.removeItem('tokenUser');
			$location.path('/login');

		};

	} else {
		$location.path('/login');
	};
});