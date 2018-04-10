import CONFIG from './config';

export default class CountUI {
  constructor() {
    this.countdown(CONFIG.COUNT);
  }

  countdown(count) {
    $('#count').html(count);
  }
}
