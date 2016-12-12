import $ from 'jquery';
import PageManager from '../PageManager';

export default class Home extends PageManager {
  constructor() {
    super();
    console.log('this home works');
  }

  loaded(next) {

    next();
  }
}
