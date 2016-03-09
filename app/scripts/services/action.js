/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').factory('Action', [function () {

  var Action = function (icon, desc) {
    this.icon = icon;
    this.description = desc;
  };

  return {
    getNewInstance: function (icon, desc) {
      return new Action(icon, desc);
    }
  };
}]);