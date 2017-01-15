import $ from 'jquery';
import PageManager from '../PageManager';

export default class Home extends PageManager {
  constructor() {
    super();

    $('body').addClass('home');
  }

  loaded(next) {

    next();
  }
}
