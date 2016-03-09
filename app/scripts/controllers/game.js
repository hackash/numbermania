/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').controller('GameCtrl', ['$scope', 'Game',
  function ($scope, Game) {
    $scope.game = null;

    $scope._init_ = function () {
      $scope.game = new Game.getNewInstance(2, 1);
      $scope.game.initialize();
    };

    $scope._init_();

  }]);
