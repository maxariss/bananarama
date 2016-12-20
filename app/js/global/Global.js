import $ from 'jquery';
import PageManager from '../PageManager';

export default class Global extends PageManager {
  constructor() {
    super();

    console.log('Global.js');
  }

  loaded(next) { }
}
