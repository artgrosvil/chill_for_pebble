chillforpebble.controller('contacts', function($scope, $http, $location, $ionicLoading, $ionicPopup, $timeout, $ionicHistory) {

	if (window.localStorage['tokenUser'] != undefined) {

		// sending token
		$http.defaults.headers.common['X-API-TOKEN'] = window.localStorage['tokenUser'];
		
		$ionicLoading.show({
			template: 'Loading contatcs'
		});

		// get dialogs
		$http.get('http://api.iamchill.co/v1/contacts/index/id_user/'+window.localStorage['idUser'])
		.success(function(data)
		{
			$scope.dialogs = data;
			$ionicLoading.hide();
		})
		.error(function(err) {
			$ionicLoading.show({
				template: 'Bad request'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 800);
		});

		// redresh dialogs
		$scope.doRefresh = function() {
			$http.get('http://api.iamchill.co/v1/contacts/index/id_user/'+window.localStorage['idUser'])
			.success(function(data)
			{
				$scope.dialogs = data;
			})
			.error(function(err) {
				$ionicLoading.show({
					template: 'Bad request'
				});
				$timeout(function() {
					$ionicLoading.hide();
				}, 800);
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		// delete contact
		$scope.deleteContact = function(id_contact) {		
			$http.post('http://api.iamchill.co/v2/contacts/delete/', {id_user: window.localStorage['idUser'], id_contact: id_contact})
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

		// go contact
		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

	} else {
		$location.path('/login');
	};
});