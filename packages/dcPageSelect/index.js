import pageSelect from './src/pageSelect.vue';

/* istanbul ignore next */
pageSelect.install = function(Vue) {
  Vue.component(pageSelect.name, pageSelect);
};

export default pageSelect;
