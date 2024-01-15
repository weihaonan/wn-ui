import dcCheckboxGroup from './src/index.vue';

/* istanbul ignore next */
dcCheckboxGroup.install = function(Vue) {
  Vue.component(dcCheckboxGroup.name, dcCheckboxGroup);
};

export default dcCheckboxGroup;
