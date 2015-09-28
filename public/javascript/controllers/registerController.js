(function() {
	'use strict';
	angular.module('app')
		.controller('registerController', registerController);

	registerController.$inject = ['userFactory', "$state"];

	function registerController(userFactory, $state) {
		var vm = this;
		vm.user = {};
		//----------------------------------------------------------------------------------------------------------------------------------
		vm.register = function() {
				// console.log("controller");
				var u = vm.user; //this line is declaring a variable 'user' equal to an empty object.
				if (!u.username || !u.email || !u.password || !u.cpassword || !(u.password ===
						u.cpassword)) { //this line is saying if none of the expressions are
					return false; //true, then to return false to THE CLIENT.
				}
				userFactory.register(u).then(function() { //this line says to go to the HF and activate the function 'register' by passing the data obj.'user' in the parameter.
					$state.go('Home'); //this line says that once the function is complete, go back and render the 'Profile' state.
				});
			}
			//----------------------------------------------------------------------------------------------------------------------------------
		vm.login = function(user) {
			user = vm.user;
			// console.log(user);
			userFactory.login(user).then(function() {
				console.log(user);
				$state.go('Profile');
			});
		}
	}
})();
