(function() {
	'use strict';
	angular.module('app')
		.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {}; // this is an empty object that will take all the functions and put them in the obj. "o"
		o.botlesS = []; //this is an empty array

		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		//GET ALL Botles
		o.getBotle = function() {
				var q = $q.defer();
				$http.get('/api/botle/getbotle').success(function(res) {
					q.resolve(res);
				});
				return q.promise;
			}
			//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
			//GET Botle BY ID
		o.getBotlesID = function(id) {
			var q = $q.defer();
			$http.get('/api/botle' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		//CREATE COMMENT
		o.createComment = function(botleId, comment) {
			var q = $q.defer();
			$http.post('/the/apiCall/Botle/' + botleId + '/comment', comment, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			}).success(function(res) {
				comment.user = {};
				comment.user.username = JSON.parse(atob(localStorage['token'].split('.')[
					1])).username;
				q.resolve(res);
			});
			return q.promise;
		};
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
		return o; //this line says to take all the functions in the obj 'o' and then inject them into the HF for use in the controllers.
	}
})();
