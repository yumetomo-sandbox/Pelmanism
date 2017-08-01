import $ from 'jquery';
import events from 'events';
import velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';

export class CardUI extends events {

  constructor(){
    super();

    this.$cards = $('li');

    this.$cards.on('click', e => {

      const CLICK_TARGET = e.currentTarget;

      // 既に開かれている場合は処理しない
      if(!$(CLICK_TARGET).hasClass('open') && !$(CLICK_TARGET).hasClass('match')) {

        const CLICK_TARGET_INDEX = this.$cards.index($(CLICK_TARGET));
        this.emit('selected', CLICK_TARGET_INDEX);

      }

    });

  }

  open(clickTargetIndex, colors) {

    const COLOR_CLASS = colors[clickTargetIndex].class;
    const COLOR_NAME = colors[clickTargetIndex].name;
    const $TARGET_CARD = $('li').eq(clickTargetIndex);

    velocity($TARGET_CARD, {
      rotateY: ['180deg', '0deg'],
      tween: 180
    }, {
      duration: 400,
      progress: function(elements, complete, remaining, start, tweenValue) {

        if(tweenValue >= 90) {
          if(!$TARGET_CARD.hasClass('open')){
            $TARGET_CARD.addClass(`${COLOR_CLASS} open`);
            $TARGET_CARD.html(COLOR_NAME);
          }
          const DIFFERENCE = tweenValue - 90;
          const ROTATE_Y = 90 - DIFFERENCE;
          $TARGET_CARD.css('transform','rotateY('+ ROTATE_Y +'deg)');
        }

      },
      complete: () => {

        this.emit('opened');

      }
    });

  }

  close() {

    const $OPEN_CARDS = $('li.open');
    CardUI.flip($OPEN_CARDS);

  }

  closeAllCards() {

    const $OPEN_CARDS = this.$cards;
    CardUI.flip($OPEN_CARDS);

  }

  static flip($cards) {

    velocity($cards, {
      rotateY: ['180deg', '0deg'],
      tween: 180
    }, {
      duration: 500,
      delay: 400,
      progress: function(elements, complete, remaining, start, tweenValue) {
        if(tweenValue >= 90) {
          if($cards.hasClass('open') || $cards.hasClass('match')){
            $cards.removeClass();
            $cards.html('?');
          }
          const DIFFERENCE = tweenValue - 90;
          const ROTATE_Y = 90 - DIFFERENCE;
          $cards.css('transform','rotateY('+ ROTATE_Y +'deg)');
        }
      }
    });

  }

}
