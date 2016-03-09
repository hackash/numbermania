/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').factory('Level', [function () {

  var Level = function (count, helpers, obstacles) {
    this.cards = count;
    this.helpers = helpers;
    this.obstacles = obstacles;
  };

  return {
    getNewInstance: function (count, helpers, obstacles) {
      return new Level(count, helpers, obstacles);
    }
  };
}]);