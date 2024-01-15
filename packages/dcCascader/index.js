import dcCascader from './src/index.vue';

/* istanbul ignore next */
dcCascader.install = function(Vue) {
  Vue.component(dcCascader.name, dcCascader);
};

export default dcCascader;
