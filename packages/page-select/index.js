import pageSelect from './src/index.vue';

/* istanbul ignore next */
pageSelect.install = function(Vue) {
  Vue.component(pageSelect.name, pageSelect);
};

export default pageSelect;
