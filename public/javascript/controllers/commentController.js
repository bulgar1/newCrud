(function() {
  'use strict';
  angular.module('app')
    .controller('CommentController', CommentController);

  CommentController.$inject = ['HomeFactory', '$state', '$stateParams'];

  function CommentController(HomeFactory, $state, $stateParams) {
    var vm = this;
    vm.comment = {};
    console.log(HomeFactory);
    //--------------------------------------------------------------------------------------------------------------------------------------------------------//
    //GET STATEPARAMS ID
    if ($stateParams.id) {
      HomeFactory.getBotleID($stateParams.id).then(function(res) {
        vm.botle = res;
      });
    } else $state.go('Comment');
    //--------------------------------------------------------------------------------------------------------------------------------------------------------//
    //CREATE COMMENT

    //$stateParams.id holds the id of the task
    //we need to add the comment to a specific task
    vm.createComment = function() {
      HomeFactory.createComment($stateParams.id, vm.comment).then(function(
        res) {
        vm.comment._id = res._id;
        vm.comment.dateCreated = res.dateCreated;
        vm.botle.comments.push(vm.comment);
        vm.comment = {};
      });
    };
  }
})();
