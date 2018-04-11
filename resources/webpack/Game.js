import _ from 'underscore';
import CONFIG from './modules/Config';
import CardUI from './modules/CardUI';
import CountUI from './modules/CountUI';

class Game {
  constructor() {
    // 配列宣言
    this.colors = [];
    this.cardUI = new CardUI();
    this.countUI = new CountUI();

    this.bind();
    this.init();
  }

  bind() {
    // カードが選択されたら色情報を渡してカードを開く処理を実行
    this.cardUI.on('selected', cardIndex => {
      this.cardUI.open(cardIndex, this.colors).then(() => this.judge());
    });
  }

  /**
   * 色情報の配列を2つ分格納してシャッフル
   */
  init() {
    this.colors = CONFIG.COLORS.concat(CONFIG.COLORS);
    this.colors = _.shuffle(this.colors);

    this.count = CONFIG.COUNT;
    this.countUI.countdown(this.count);

    this.totalCard = CONFIG.COLORS.length * 2;
  }

  /**
   * 開かれたカードが2枚なら判定を行う
   */
  judge() {
    const $openCards = $('li.open');
    const openCardsLength = $openCards.length;

    if (openCardsLength === 2) {
      this.count = this.count - 1;
      this.countUI.countdown(this.count);

      const $firstCard = $openCards.eq(0);
      const $secondCard = $openCards.eq(1);

      const firstCardColor = $firstCard.text();
      const secondCardColor = $secondCard.text();

      // 色が一致していれば開いたままに、していなければ閉じる
      if (firstCardColor === secondCardColor) {
        this.match($openCards);
      } else {
        this.count === 0 ? this.restart() : this.cardUI.close($openCards);
      }
    }
  }

  match($openCards) {
    $openCards.removeClass('open');
    $openCards.addClass('match');

    const matchCardLength = $('li.match').length;
    if (matchCardLength === this.totalCard) {
      alert('success !');
      this.restart();
    }
  }

  restart() {
    this.init();
    this.cardUI.closeAllCards();
  }
}

new Game();
