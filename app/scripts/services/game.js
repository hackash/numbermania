/**
 * Created by ashot on 11/15/2015.
 */
angular.module('NgGame').factory('Game', ['Level', 'Card', 'Util', 'Config', 'Action', '$interval',
  function (Level, Card, Util, Config, Action, $interval) {

    var Game = function (speed, level) {
      this.timer = null;
      this.elapcedTime = 0;
      this.timeLeft = 0;
      this.level = level;
      this.speed = speed;
      this.cards = [];
      this.pendingCard = null;
      this._locked = false;
      this.matrix = [9, 16, 25, 36, 49, 64];
      this.levels = [];
      this.minDuration = 10;
      this.cardMargin = 7;
      this.style = {
        width: 400 + 'px'
      };
    };

    Game.prototype.start = function () {
      var speed = Math.round(this.speed * 1000),
        self = this;
      this.time = Math.round(speed * this.minDuration);
      this.timer = $interval(function () {
        if (self.timeLeft < 0) {
          self.stop();
        } else {
          self.elapcedTime += speed;
          self.timeLeft = Util.millisToMinutesAndSeconds(self.time - self.elapcedTime);
        }
      }, speed);
    };

    Game.prototype.pause = function () {
      $interval.cancel(this.timer);
    };

    Game.prototype.stop = function () {
      $interval.cancel(this.timer);
    };

    Game.prototype.resume = function () {
      this.start();
    };

    Game.prototype.lock = function () {
      this._locked = true;
    };

    Game.prototype.unlock = function () {
      this._locked = false;
    };

    Game.prototype.locked = function () {
      return this._locked;
    };

    Game.prototype.getUniqueNumbers = function (count) {
      var numbers = [],
        min = count,
        last = 1,
        i = 0;
      while (i < min) {
        var random = Math.floor(Math.random() * ((count - min + 1)) + min) + last;
        last = random;
        numbers.push(random);
        i++;
      }
      return numbers;
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    };

    Game.prototype.initialize = function () {
      var level = this.initLevels(),
        halfOfNumbers = (level.cards - (level.obstacles + level.helpers)) / 2,
        numbers = this.getUniqueNumbers(halfOfNumbers),
        card = null,
        i = 0;
      while (i < halfOfNumbers) {
        for (var j = 0; j < 2; j++) {
          card = Card.getNewInstance(numbers[i], this, Util.getUniqueId('_'));
          this.cards.push(card);
        }
        var last = this.cards[this.cards.length - 1],
          beforeLast = this.cards[this.cards.length - 2];
        last.couple = beforeLast;
        beforeLast.couple = last;
        i++;
      }
      console.log('level', level);
      if (level.obstacles > 0) {
        this.generateActions(level.obstacles, 'obstacles');
      }
      if (level.helpers > 0) {
        this.generateActions(level.helpers, 'helpers');
      }
      this.scaleCards();
      this.cards = _.shuffle(this.cards);
      this.start();
    };

    Game.prototype.initLevels = function () {
      var self = this;
      this.matrix.map(function (m, i) {
        var external = m % (Math.floor(m / 2)),
          helpers = (i === 0 && external == 1) ? external : external * i;
        self.getExternals(m,i);
        self.levels.push(Level.getNewInstance(m, helpers, i));
      });
      self.activeLevel = self.levels[self.level];
      return self.activeLevel;
    };

    Game.prototype.getExternals = function (cCount, level) {
      console.log('level', level, 'cCount', cCount);
    };

    Game.prototype.scaleCards = function () {
      var board = this;
      var cardWidth = Math.round(parseInt(board.style.width) / Math.log2(board.cards.length)) - (board.cardMargin * 2);
      board.cards.map(function (c) {
        angular.extend(c.style, {
          width: cardWidth + 'px',
          height: (cardWidth + 10) + 'px'
        });
      });
    };

    Game.prototype.generateActions = function (count, context) {
      var actions = Config[context], i = 0;
      while (i < count) {
        var card = Card.getNewInstance(null, this, Util.getUniqueId(context), new Action.getNewInstance());
        _.assign(card.action, actions[i]);
        this.cards.push(card);
        i++;
      }
    };

    return {
      getNewInstance: function (speed, level) {
        return new Game(speed, level);
      }
    };
  }]);