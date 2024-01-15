import dcCheckbox from './src/index.vue';

/* istanbul ignore next */
dcCheckbox.install = function(Vue) {
  Vue.component(dcCheckbox.name, dcCheckbox);
};

export default dcCheckbox;
