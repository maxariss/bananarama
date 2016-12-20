import $ from 'jquery';
import PageManager from '../PageManager';

export default class Home extends PageManager {
  constructor() {
    super();
    console.log('Sup Sup Sup Sup Sup Sup ');

    $('body').addClass('home');
  }

  loaded(next) {

    next();
  }
}
