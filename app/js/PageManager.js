export default class PageManager {
  constructor() {
  }

  before(next) {
    next();
  }

  loaded(next) {
    next();
  }

  after(next) {
    next();
  }

  type() {
    return this.constructor.name;
  }
}
