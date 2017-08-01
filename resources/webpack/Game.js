import $ from 'jquery';
import _ from 'underscore';
import {CONFIG} from './config';
import {CardUI} from './CardUI';

class Game {

  constructor() {

    // 配列初期化
    this.colors = [];
    this.cardUI = new CardUI();

    this.bind();
    this.setColors();

  }

  bind() {

    this.cardUI
      .on('selected', clickTargetIndex => {
        this.openedCard(clickTargetIndex);
      })

  }

  /**
   * 色情報の配列を2つ分格納してシャッフル
   */
  setColors() {

    this.colors = CONFIG.COLORS.concat(CONFIG.COLORS);

    this.colors = _.shuffle(this.colors);

  }

  openedCard(clickTargetIndex) {

    this.cardUI.open(clickTargetIndex, this.colors)
      .then(() => this.judge());

  }

  judge() {

    const $OPEN_CARDS = $('li.open');
    const OPEN_CARDS_LENGTH = $OPEN_CARDS.length;

    if(OPEN_CARDS_LENGTH === 2) {
      const FIRST_CARD = $OPEN_CARDS[0];
      const SECOND_CARD = $OPEN_CARDS[1];

      const FIRST_CARD_COLOR = $(FIRST_CARD).text();
      const SECOND_CARD_COLOR = $(SECOND_CARD).text();

      if(FIRST_CARD_COLOR === SECOND_CARD_COLOR) {
        this.match();
      } else {
        this.cardUI.close();
      }
    }

  }

  match() {

    const $OPEN_CARDS = $('li.open');
    $OPEN_CARDS.removeClass('open');
    $OPEN_CARDS.addClass('match');

    const MATCH_CARDS_LENGTH = $('li.match').length;
    if(MATCH_CARDS_LENGTH === 16) {
      alert('success !');
      this.restart();
    }

  }

  restart() {

    this.setColors();
    this.cardUI.closeAllCards();

  }

}

new Game();
