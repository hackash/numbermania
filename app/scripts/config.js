/**
 * Created by ashot on 11/8/2015.
 */
angular.module('NgGame').constant('Config', {
  obstacles: [
    {
      icon: null,
      description: 'Close all found cards',
      declaration: function () {
        this.board.cards.map(function (c) {
          if (c.found) {
            c.forceClose();
            c.couple.forceClose();
          }
        });
      },
      done: false
    },
    {
      icon: null,
      description: 'Decrease time by 3 milliseconds',
      declaration: function () {
        this.board.time -= 3000;
      },
      done: false
    },
    {
      icon: null,
      description: 'Close tow couple of cards',
      declaration: function () {
        var closed = 0,
          countToClose = 2;
        this.board.cards.map(function (c) {
          if (closed != countToClose) {
            if (c.isOpened && c.found) {
              c.forceClose();
              c.couple.forceClose();
              closed++;
            }
          }
        });
      },
      done: false
    },
    {
      icon: null,
      description: 'Shuffle again',
      declaration: function () {
        this.board.cards = _.shuffle(this.board.cards);
      },
      done: false
    },
    {
      icon: null,
      description: 'One level back',
      declaration: function () {
        // todo
      },
      done: false
    }],
  helpers: [
    {
      icon: null,
      description: 'Open all cards for 2 seconds',
      declaration: function () {
        var openedCards = [];
        this.cards.map(function (c) {
          if (!c.isOpened) {
            c.openOnce();
            openedCards.push(c);
          }
        });
        setTimeout(function () {
          openedCards.map(function (c) {
            c.forceClose();
          });
          openedCards = [];
        }, 1000);
      },
      done: false
    },
    {
      icon: null,
      description: 'Auto open one couple',
      declaration: function () {
        var countToOpen = 1,
          opened = 0;
        for (var i = 0; i < this.cards.length; i++) {
          var c = this.cards[i];
          if (opened < countToOpen) {
            if (this.pendingCard) {
              this.pendingCard.forceOpen();
              this.pendingCard = null;
              opened++;
            } else {
              if (!c.isOpened) {
                c.forceOpen();
                opened++;
              }
            }
          } else {
            break;
          }
        }
      },
      done: false
    },
    {
      icon: null,
      description: 'Increase time',
      declaration: function () {
        // todo
        console.log('Increase time');
      },
      done: false
    },
    {
      icon: null,
      description: 'Show obstacles',
      declaration: function () {
        console.log('Show obstacles');
        // todo
      },
      done: false
    }]
});