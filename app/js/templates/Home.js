import $ from 'jquery';
import PageManager from '../PageManager';

export default class Home extends PageManager {
  constructor() {
    super();
    console.log('Home.js');

    $('body').addClass('home');
  }

  loaded(next) {

    next();
  }
}
