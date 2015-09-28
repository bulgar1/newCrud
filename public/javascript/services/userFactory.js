(function() {
  'use strict';
  angular.module('app')
    .factory('userFactory', userFactory);

  userFactory.$inject = ['$http', '$q'];

  function userFactory($http, $q) {
    var o = {};
    o.status = {};

    o.setToken = setToken;
    o.getToken = getToken;
    o.removeToken = removeToken;

    o.register = register;
    o.login = login;



    return o;
    //------------------------------------------------------------------------------------------------------------------------------
    function register(user) {
      // console.log("Factory");
      var q = $q.defer();
      $http.post('/api/Users/Register', user).success(function(res) {
        console.log(res); //this line says to send a post request to '/api/Users/Register' with the data obj. 'user' to THE SERVER.
        setToken(res.token); // this line says to set the authentication token on the response obj. and assign it the property name of 'token'.
        o.status.isLoggedIn = true; //this line says to make the status of the user to 'isLoggedIn' equal to true.
        q.resolve(); //this line says to go back to the navBarController and activate the first property '.then'.
      }).error(function(res) {
        console.error(res);
      });
      return q.promise; //this line turns the function call in the navBarController into an object and to activate when the q.whatever method is used.
    }
    //----------------------------------------------------------------------------------------------------------------------------
    // function login(user) {
    //   console.log(user);
    //   var q = $q.defer();
    //   $http.post("/api/Users/login", user).success(function(res) {
    //     setToken(res.token);
    //     $rootScope._user = isLoggedIn();
    //     q.resolve();
    //   })
    //   return q.promise;

    function login(user) {
      var u = {
        username: user.username.toLowerCase(),
        password: user.password
      };
      var q = $q.defer();
      $http.post('/api/Users/Login', u).success(function(res) {
        setToken(res.token);
        o.status.isLoggedIn = true;
        q.resolve();
      });
      return q.promise;

    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    function isLoggedIn() {
      var token = getToken();
      if (token) {
        var payload = JSON.parse(urlBase64Decoder(token.split(".")[1]));
        if (payload.exp > Date.now() / 1000) {
          return payload;
        }
      } else {
        return false;
      }
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    function setToken(token) {
      localStorage.setItem('token', token);
      o.status.username = getUsername();
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    function getToken() {
      return localStorage['token'];
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//function getUsername() {
    function removeToken() {
      localStorage.removeItem('token');
      o.status.username = null;
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    function getUsername() {
      return JSON.parse(atob(getToken().split('.')[1])).username;
    }
  }
})();
