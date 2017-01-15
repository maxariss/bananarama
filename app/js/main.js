import $ from 'jquery';
import Global from './global/Global';
import Auth from './auth/Auth';
import Home from './templates/Home';
import Page from './templates/Page';

const TemplateMap = {
  mapping: {
    "global": Global,
    "home": Home,
    "page": Page,
  },
  get(page) {
    if (this.mapping[page]) {
      return this.mapping[page];
    }
  }
};

new Global;

const auth = new Auth({
  el: '[data-main-header]'
});

window.ClassMapper = function ClassMapper(template_file) {
  const TemplateClass = TemplateMap.get(template_file);

  if (TemplateClass) {
    const Template = new TemplateClass();
  }
};

//# sourceMappingURL=js/build.js.map
