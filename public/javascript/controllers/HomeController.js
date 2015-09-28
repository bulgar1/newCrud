(function() {
	'use strict';
	angular.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory', 'profileFactory'];

	function HomeController(HomeFactory, profileFactory) {
		var vm = this;
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//

		HomeFactory.getBotle().then(function(res) {
			vm.botles = res;
		})
	}
})();
