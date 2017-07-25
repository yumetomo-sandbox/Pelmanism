import $ from 'jquery';
import { arrayList } from './settingArray';
import { changeText } from './changeText';

export class CardUI {

  constructor(index) {
    this.index = index;
  }

  addClassToListItem() {

    let className = arrayList[ this.index ].class;
    $( 'li' ).eq( this.index ).addClass( className + ' open' );//`${className}open`

    const CHANGE_TEXT = new changeText( this.index, arrayList );
    CHANGE_TEXT.changeToColor();

  }

}
