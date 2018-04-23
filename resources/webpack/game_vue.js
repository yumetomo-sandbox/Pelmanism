import _ from 'underscore';
import CONFIG from './modules/Config';

new Vue({
  el: '#app',
  data: {
    count: CONFIG.COUNT,
    cards: [],
    colors: [],
    openCards: [],
    matchCount: 0,
    totalCard: CONFIG.COLORS.length * 2
  },
  methods: {
    /**
     * 色情報の配列とカード用の配列を初期化
     */
    init() {
      this.colors = CONFIG.COLORS.concat(CONFIG.COLORS);
      this.colors = _.shuffle(this.colors);

      this.cards.splice(0, this.cards.length);
      for (let index = 0; index < this.totalCard; index++) {
        this.cards.push({ text: '?', index: index, status: '', color: '' });
      }

      this.count = CONFIG.COUNT;
      this.matchCount = 0;
    },

    /**
     * 選択されたらカードのテキストを変更
     */
    select(index) {
      const isOpened = this.isOpened(index);
      if (!isOpened) {
        this.open(index);
      }
    },

    /**
     * 選択されたカードが開かれている状態かどうかを返す
     */
    isOpened(index) {
      return (
        this.cards[index].status === 'open' ||
        this.cards[index].status === 'match'
      );
    },

    /**
     * カードのデータを更新する
     */
    open(index) {
      this.cards[index].status = 'open';
      const $card = document.querySelectorAll('li')[index];
      const colorClass = this.colors[index].class;
      velocity(
        $card,
        {
          rotateY: ['180deg', '0deg'],
          tween: 180
        },
        {
          duration: 400,
          progress: (elements, complete, remaining, start, tweenValue) => {
            // 半分までアニメーションしたらclassを付与して折り返す
            if (tweenValue >= 90) {
              const difference = tweenValue - 90;
              const rotateY = 90 - difference;
              $card.style.transform = `rotateY(${rotateY}deg)`;
              this.updateCardData(index, colorClass);
            }
          },
          complete: () => {
            this.openCards.push(this.cards[index]);
            this.checkOpenCardLength();
          }
        }
      );
    },

    /**
     * カードのデータを更新
     */
    updateCardData(index, colorClass) {
      this.cards[index].status = 'open';
      this.cards[index].color = colorClass;
      this.cards[index].text = this.colors[index].text;
    },

    /**
     * 開いているカードの枚数をチェック
     */
    checkOpenCardLength() {
      // 2枚開いていたらカウントを1減らして判定へ
      if (this.openCards.length === 2) {
        this.count--;
        this.judge();
      }
    },

    /**
     * 選択された2枚が同じか判定
     */
    judge() {
      if (this.openCards[0].text === this.openCards[1].text) {
        this.matchCount += 2;
        this.openCards.splice(0, 2);
      } else {
        this.close();
      }

      this.checkCount();
    },

    /**
     * 選択されたカードを閉じる
     */
    close() {
      const indexes = [
        { number: this.openCards[0].index },
        { number: this.openCards[1].index }
      ];

      this.openCards.splice(0, 2);

      for (let index = 0; index < 2; index++) {
        const cardIndex = indexes[index].number;
        const $card = document.querySelectorAll('li')[cardIndex];
        velocity(
          $card,
          {
            rotateY: ['180deg', '0deg'],
            tween: 180
          },
          {
            duration: 500,
            delay: 500,
            progress: (elements, complete, remaining, start, tweenValue) => {
              // 半分までアニメーションしたらclassを付与して折り返す
              if (tweenValue >= 90) {
                const difference = tweenValue - 90;
                const rotateY = 90 - difference;
                $card.style.transform = `rotateY(${rotateY}deg)`;
                this.resetCardData(cardIndex);
              }
            }
          }
        );
      }
    },

    /**
     * カードを閉じた状態に戻す
     */
    resetCardData(index) {
      this.cards[index].status = '';
      this.cards[index].color = '';
      this.cards[index].text = '?';
    },

    /**
     * 残り回数をチェック、0なら終了（初期化）
     */
    checkCount() {
      const isAllMatch = this.matchCount === this.totalCard;

      if (isAllMatch) {
        alert('complete!!');
        this.init();
      } else if (this.count === 0) {
        alert('failed...');
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$el.style.display = 'block';
  }
});
