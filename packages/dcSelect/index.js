import dcSelect from './src/index.vue';

/* istanbul ignore next */
dcSelect.install = function(Vue) {
  Vue.component(dcSelect.name, dcSelect);
};

export default dcSelect;
