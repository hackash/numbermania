/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').factory('Util', [function () {
  return {
    getUniqueId: function (prefix) {
      return prefix + Math.random().toString(36).substr(2, 9);
    },
    synchronized: function (context, callback) {
      context.lock();
      callback = angular.isFunction(callback) ? callback : angular.noop;
      callback(function () {
        context.unlock();
      });
    },
    millisToMinutesAndSeconds: function (millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
    }
  };
}]);