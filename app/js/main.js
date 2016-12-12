import Global from './global/Global';
import Home from './templates/Home';
import Page from './templates/Page';

console.log('main is running');

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

window.ClassMapper = function ClassMapper(template_file) {
  const TemplateClass = TemplateMap.get(template_file);

  if (TemplateClass) {
    const Template = new TemplateClass();
  }
};
