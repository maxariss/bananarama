import $ from 'jquery';
import PageManager from '../PageManager';
import Logo from '../components/header/Logo';

export default class Global extends PageManager {
  constructor() {
    super();

    new Logo();
  }

  loaded(next) { }
}
