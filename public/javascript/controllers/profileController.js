(function() {
  'use strict';
  angular.module('app')
    .controller('profileController', profileController);

  profileController.$inject = ['HomeFactory', 'userFactory', 'profileFactory',
    'addBotleFactory',
    '$state',
  ];

  function profileController(HomeFactory, userFactory, profileFactory,
    addBotleFactory, $state,
    $modal) {
    var vm = this;
    vm.user = {};
    vm.status = userFactory.status;
    vm.deleteBotle = deleteBotle;
    vm.logout = userFactory.logout;



    //----------------------------------------------------------------------------------------------------------------------------------------------------//
    // PROFILE>GET Botles BY USER ID
    //
    profileFactory.getBotleUser().then(function(botle) {
      vm.botle = botle;


    });

    //-------------------------------------------------------------------
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - //
    //PROFILE>DELETE
    function deleteBotle(b) {
      // console.log(b);
      profileFactory.deleteBotle(b).then(function() {
        // console.log("you made it back");
        profileFactory.getBotleUser().then(function(botles) {
          vm.botles = botles;
        });

      });
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------//
    //PROFILE>EDIT
    vm.openEdit = function(b) {

      var instance = $modal.open({
        controller: 'editModalController',
        templateUrl: './../views/editBotle.html',
        resolve: {
          botle: function() {
            return b;
          }
        }
      });
      instance.result.then(function(editB) {
        profileFactory.editBotle(editB, b);
      }, function() {
        console.log("inside of the result");
      });
    };

    //-----------------------------------------------------------------------------------------------------------------------------------------------------//
  }
})();
