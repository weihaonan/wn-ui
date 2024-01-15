import dividePanel from './src/index.vue';

/* istanbul ignore next */
dividePanel.install = function(Vue) {
  Vue.component(dividePanel.name, dividePanel);
};

export default dividePanel;
