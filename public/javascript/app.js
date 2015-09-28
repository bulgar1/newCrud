(function() {
	'use strict';
	angular.module('app', ['ui.router'])
		.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Register', {
			url: '/register',
			templateUrl: 'views/register.html'
		}).
		state('Home', {
			url: '/Home',
			templateUrl: 'views/Home.html'
		}).
		state('Botle', {
			url: '/Botle',
			templateUrl: 'views/Botle.html'
		}).
		state('AddComment', {
			url: '/AddComment',
			templateUrl: 'views/addComment.html'
		}).
		state('Profile', {
			url: '/Profile',
			templateUrl: 'views/profile.html'
		}).
		state('Login', {
			url: '/',
			templateUrl: 'views/login.html'
		});

		$urlRouterProvider.otherwise('/');
	}
})();
