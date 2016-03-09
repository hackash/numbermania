/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').factory('Card', ['Util', '$timeout', function (Util, $timeout) {

  var Card = function (value, board, id, action) {
    this.board = board;
    this.style = {
      width: 79 + 'px',
      height: 100 + 'px'
    };
    this._id = id;
    this.value = value;
    this.isOpened = false;
    this.found = false;
    this.action = action || null;
  };

  Card.prototype.open = function () {
    var board = this.board,
      self = this;
    if (self.isOpenAble()) {
      self.openOnce();
      if (board.pendingCard) {
        Util.synchronized(board, function (done) {
          done = angular.isFunction(done) ? done : angular.noop;
          if (board.pendingCard.equalsTo(self)) {
            board.pendingCard.markAsFound();
            self.markAsFound();
            board.pendingCard = null;
            done();
          } else {
            $timeout(function () {
              self.close();
              board.pendingCard = null;
              done();
            }, 800);
          }
        });
      } else {
        board.pendingCard = self;
      }
    } else {
      if (self.action && !self.action.done && !self.board.locked()) {
        Util.synchronized(board, function (done) {
          done = angular.isFunction(done) ? done : angular.noop;
          self.isOpened = true;
          $timeout(function () {
            self.action.declaration.call(board);
            self.action.done = true;
            done();
          }, 800);
        });
      }
    }
  };

  Card.prototype.isOpenAble = function () {
    return !this.found && !this.isOpened && !this.board.locked() && this.action === null;
  };

  Card.prototype.openOnce = function () {
    this.isOpened = true;
    return this;
  };

  Card.prototype.close = function () {
    this.board.cards.map(function (c) {
      if (c.isOpened && !c.found && !c.action) {
        c.isOpened = false;
      }
    });
  };

  Card.prototype.forceClose = function () {
    this.isOpened = false;
    this.found = false;
  };

  Card.prototype.markAsFound = function () {
    this.found = true;
    return this;
  };

  Card.prototype.equalsTo = function (card) {
    return this.value === card.value;
  };

  Card.prototype.forceOpen = function () {
    this.couple.openOnce().markAsFound();
    this.openOnce().markAsFound();
  };

  return {
    getNewInstance: function (value, board, id, action) {
      return new Card(value, board, id, action);
    }
  };

}]);