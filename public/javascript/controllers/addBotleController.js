(function() {
  'use strict';
  angular.module('app')
    .controller('addBotleController', addBotleController);

  addBotleController.$inject = ['addBotleFactory', 'userFactory', '$state'];

  function addBotleController(addBotleFactory, userFactory, $state) {
    var vm = this;
    vm.botle = {};
    vm.status = userFactory.status;
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

    vm.addBotle = function() {
      // console.log(vm.botle)
      // vm.botle.user = vm.status.username; //this line is a function that takes input from the createComment.html page through 'vm' databinding.
      addBotleFactory.postBotle(vm.botle).then(function(res) { //this line says to activate 'postComment()'' func. in the HF and pass the data in the 'comment' obj.
        $state.go('Home'); // line says that once the 'postComment()' is done to go to the 'Home' state in app.js.
      });
    };
  }
})();
