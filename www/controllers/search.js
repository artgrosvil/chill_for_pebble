chillforpebble.controller('search', function($scope, $http, $location, $ionicLoading, $timeout, $ionicHistory) {

	if (window.localStorage['tokenUser'] != undefined) {
		
		// sending token
		$http.defaults.headers.common['X-API-TOKEN'] = window.localStorage['tokenUser'];

		$scope.searchUser = function(user) {
			$scope.user = user;

			$http.get('http://api.iamchill.co/v1/search/index/id_user/'+window.localStorage['idUser']+'/login/'+user.login)
			.success(function(data)
			{
				$scope.users = data;
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

		// add contact 
		$scope.addContact = function(id_contact) {
			$http.post('http://api.iamchill.co/v1/contacts/index/', {'id_user': window.localStorage['idUser'], 'id_contact': id_contact})
			.success(function(data)
			{
				$ionicLoading.show({
					template: 'Completed'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
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

		$scope.doPhone = function() {
			$location.path('/phone');
		}

		// go back
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};
	}
	else {
		$location.path('/login');
	};
});