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
        this.openCard(clickTargetIndex);
      })
      .on('opened', () => {
        this.openedCard();
      })
      .on('secondCardOpen', (firstCardColor, secondCardColor) => {
        this.judge(firstCardColor, secondCardColor);
      })
      .on('success', () => {
        this.restart();
      })
  }

  /**
   * 色情報の配列を2つ分格納してシャッフル
   */
  setColors() {

    this.colors = CONFIG.COLORS.concat(CONFIG.COLORS);

    this.colors = _.shuffle(this.colors);

  }

  openCard(clickTargetIndex) {

    this.cardUI.open(clickTargetIndex, this.colors);

  }

  openedCard() {

    let $openCards = $('li.open');
    let $openCardsLength = $openCards.length;

    if($openCardsLength === 2) {
      let firstCard = $openCards[0];
      let secondCard = $openCards[1];

      let firstCardColor = $(firstCard).text();
      let secondCardColor = $(secondCard).text();
      this.judge(firstCardColor, secondCardColor);
    }

  }

  judge(firstCardColor, secondCardColor) {

    if(firstCardColor === secondCardColor) {
      this.match();
    } else {
      this.cardUI.close();
    }

  }

  match() {

    let $openCards = $('li.open');
    $openCards.removeClass('open');
    $openCards.addClass('match');

    let matchCardsLength = $('li.match').length;
    if(matchCardsLength === 16) {
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
