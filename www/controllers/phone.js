chillforpebble.controller('phone', function($scope, $http, $location, $timeout, $ionicHistory, $cordovaContacts, $ionicLoading, $cordovaDialogs) {

	if (window.localStorage['tokenUser'] != undefined) {

		// sending token
		$http.defaults.headers.common['X-API-TOKEN'] = window.localStorage['tokenUser'];

		$ionicLoading.show({
			template: 'Loading contatcs'
		});


		$cordovaContacts.find({filter: ''}).then(function(result) {
			$scope.contacts = result;
			$ionicLoading.hide();
		}, function(error) {
			$ionicLoading.show({
				template: 'Not completed find contacts'
			});
			$timeout(function() {
				$ionicLoading.hide();
			}, 800);
		});

		$scope.sendSMS = function(phone) {
			$cordovaDialogs.confirm('Send a sms', 'Are you sure you want to send a sms?', ['Yes','Cancel'])
				.then(function(buttonIndex) {
				var btnIndex = buttonIndex;
				if (btnIndex == 1) {
					var options = {
						replaceLineBreaks: false,
						android: {
							intent: ''
						}
					};
					sms.send(phone, 'Get a beta invite here http://iamchill.co', options,
					function() {
						$ionicLoading.show({
							template: 'Completed'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 800);
					}, function() {
						$ionicLoading.show({
							template: 'Not completed'
						});
						$timeout(function() {
							$ionicLoading.hide();
						}, 800);
					});
				};
			});
		};

		$scope.goBack = function() {
			$ionicHistory.goBack();
		};

		$scope.emptyOrNullContacts = function(contacts) {
			return !(contacts.displayName === null || contacts.displayName.trim().length === 0)
		};
	}
	else {
		$location.path('/login');
	};
});