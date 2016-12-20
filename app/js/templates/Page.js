import $ from 'jquery';
import PageManager from '../PageManager';

export default class Page extends PageManager {
  constructor() {
    super();
    console.log('Page.js');

    $('body').addClass('page');
  }

  loaded(next) {

    next();
  }
}
