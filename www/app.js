var chillforpebble = angular.module('chillforpebble', ['ionic', 'ngCordova']);

chillforpebble.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
});

chillforpebble.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'login'
  })

  .state('main', {
    url: '/main',
    templateUrl: 'views/main.html',
    controller: 'main'
  })

  .state('contacts', {
    url: '/contacts',
    templateUrl: 'views/contacts.html',
    controller: 'contacts'
  })

  .state('search', {
    url: '/search',
    templateUrl: 'views/search.html',
    controller: 'search'
  })

  .state('phone', {
    url: '/phone',
    templateUrl: 'views/phone.html',
    controller: 'phone'
  });

  $urlRouterProvider.otherwise('/main');

});