import $ from 'jquery';
import PageManager from '../PageManager';

export default class Page extends PageManager {
  constructor() {
    super();
    console.log('this page works');
  }

  loaded(next) {

    next();
  }
}
