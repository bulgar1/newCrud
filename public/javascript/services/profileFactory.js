(function() {
  'use strict';
  angular.module('app')
    .factory('profileFactory', profileFactory);

  profileFactory.$inject = ['$http', '$q'];

  function profileFactory($http, $q) {
    var o = {};
    o.botles = [];
    var authToken = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    //DELETE Botle
    o.deleteBotle = function(botle) {
      // console.log(botle);
      // alert("Are you sure you want to remove this botle?");
      var q = $q.defer();
      $http.post('/api/deleteBotle/delete/' + botle._id).success(function(
        res) {
        o.botles.splice(o.botles.indexOf(botle), 1);
        q.resolve();
      });
      return q.promise;
    };
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // // EDIT Botle
    // o.editBotle = function(editB, b) {
    //   $http.put('/api/EditBotle' + b._id).success(function(data) {
    //     o.botles[o.botles.indexOf(b)] = angular.copy(editB);
    //   });
    // };
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    // GET Botles BY USER ID
    o.getBotleUser = function() {
      // console.log("factory")
      var q = $q.defer();
      $http.get('/api/BotleUser/botle', authToken).success(function(botle) {
        // console.log(botle);
        botle.user = {};
        botle.user.username = JSON.parse(atob(localStorage['token'].split(
          '.')[1])).username;
        q.resolve(botle);
        // console.log(botle);

      });
      return q.promise;
    };
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    return o; //this line says to take all the functions in the obj 'o' and then inject them into the HF for use in the controllers.

  }
}());
