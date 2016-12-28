import $ from 'jquery';
import Global from './global/Global';
import Home from './templates/Home';
import Page from './templates/Page';

console.log('Main.js');

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

window.ClassMapper = function ClassMapper(template_file) {
  const TemplateClass = TemplateMap.get(template_file);

  if (TemplateClass) {
    const Template = new TemplateClass();
  }
};

//# sourceMappingURL=js/build.js.map
