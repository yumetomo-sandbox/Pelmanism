import events from 'events';

export default class CardUI extends events {
  constructor() {
    super();
    this.$cards = $('li');

    this.$cards.on('click', event => {
      const $currentTarget = $(event.currentTarget);

      // 既に開かれている場合は処理しない
      if (
        !$currentTarget.hasClass('open') &&
        !$currentTarget.hasClass('match')
      ) {
        const currentIndex = this.$cards.index($currentTarget);
        this.emit('selected', currentIndex);
      }
    });
  }

  /**
   * カードを開く
   */
  open(index, colors) {
    return new Promise(resolve => {
      const className = colors[index].class;
      const text = colors[index].text;
      const card = $('li').eq(index);

      velocity(
        card,
        {
          rotateY: ['180deg', '0deg'],
          tween: 180
        },
        {
          duration: 400,
          progress: function(elements, complete, remaining, start, tweenValue) {
            // 半分までアニメーションしたらclassを付与して折り返す
            if (tweenValue >= 90) {
              const difference = tweenValue - 90;
              const rotateY = 90 - difference;
              card.addClass(`${className} open`);
              card.html(text);
              card.css('transform', 'rotateY(' + rotateY + 'deg)');
            }
          },
          complete: () => {
            resolve();
          }
        }
      );
    });
  }

  close($openCards) {
    this.flip($openCards);
  }

  closeAllCards() {
    this.flip(this.$cards);
  }

  flip($cards) {
    velocity(
      $cards,
      {
        rotateY: ['180deg', '0deg'],
        tween: 180
      },
      {
        duration: 500,
        delay: 400,
        progress: function(elements, complete, remaining, start, tweenValue) {
          // 半分までアニメーションしたらclassを付与して折り返す
          if (tweenValue >= 90) {
            // リスタートする時は閉じた状態のカードもある
            if ($cards.hasClass('open') || $cards.hasClass('match')) {
              $cards.removeClass();
              $cards.html('?');
            }
            const difference = tweenValue - 90;
            const rotateY = 90 - difference;
            $cards.css('transform', 'rotateY(' + rotateY + 'deg)');
          }
        }
      }
    );
  }
}
