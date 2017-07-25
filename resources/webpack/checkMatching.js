import $ from 'jquery';
import { restore } from './restoreOpenItem';

export class checkMatching {

  constructor() {

    let firstOpen = $( 'li.open' ).eq( 0 ).text();
    let secondOpen = $( 'li.open' ).eq( 1 ).text();

    if( firstOpen === secondOpen ) {

      console.log('おめでとう');

    } else {

      alert('残念');

      new restore();

    }

  }



}
