import $ from 'jquery';
import events from 'events';
import velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

export class CardUI extends events {

  constructor(){
    super();

    $(() => {

      let $cards = $('li');

      $cards.on('click', e => {

        let clickTarget = e.currentTarget;

        // 既に開かれている場合は処理しない
        if(!$(clickTarget).hasClass('open') && !$(clickTarget).hasClass('match')) {

          let clickTargetIndex = $cards.index($(clickTarget));
          this.emit('selected', clickTargetIndex);

        }

      });

    });

  }

  open(clickTargetIndex, colors) {

    let colorClass = colors[clickTargetIndex].class;
    let colorName = colors[clickTargetIndex].name;
    let $targetCard = $('li').eq(clickTargetIndex);

    velocity($targetCard, {
      width: [0, 200],
      marginLeft: [100, 0],
      marginRight: [100, 20]
    }, {
      duration: 150,
      complete: () => {

        $targetCard.addClass(`${colorClass} open`);
        $targetCard.html(colorName);

        velocity($targetCard, {
          width: [200, 0],
          marginLeft: [0, 100],
          marginRight: [20, 100]
        }, {
          duration: 150,
          complete: () => {

            this.emit('opened');

          }
        });

      }
    });

  }

  close() {

    let $openCards = $('li.open');
    velocity($openCards, {
      width: [0, 200],
      marginLeft: [100, 0],
      marginRight: [100, 20]
    }, {
      duration: 200,
      delay: 400,
      complete: () => {

        $openCards.removeClass();
        $openCards.html('?');

        velocity($openCards, {
          width: [200, 0],
          marginLeft: [0, 100],
          marginRight: [20, 100]
        }, {
          duration: 200
        });

      }
    });
  }

  closeAllCards() {

    let $cards = $('li');
    velocity($cards, {
      width: [0, 200],
      marginLeft: [100, 0],
      marginRight: [100, 20]
    }, {
      duration: 200,
      delay: 400,
      complete: () => {

        $cards.removeClass();
        $cards.html('?');

        velocity($cards, {
          width: [200, 0],
          marginLeft: [0, 100],
          marginRight: [20, 100]
        }, {
          duration: 200
        });

      }
    });
  }

}
