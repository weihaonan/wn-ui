import dcTooltip from './src/index.vue';

/* istanbul ignore next */
dcTooltip.install = function(Vue) {
  Vue.component(dcTooltip.name, dcTooltip);
};

export default dcTooltip;
