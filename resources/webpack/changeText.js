import $ from 'jquery';
import { checkMatching } from './checkMatching'

export class changeText {

  constructor( index , arrayList = '?' ){
    this.index = index;
    this.array = arrayList;
  }

  changeToColor() {

    let colorName = this.array[ this.index ].name;
    $( 'li' ).eq( this.index ).html( colorName );

    let openElementsLength = $( 'li.open' ).length;

    if( openElementsLength === 2 ) {

      new checkMatching();
      //CHECK_MATCHING();

    }

  }

}
