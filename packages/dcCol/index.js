import ElCol from './src/index.vue';

/* istanbul ignore next */
ElCol.install = function(Vue) {
  Vue.component(ElCol.name, ElCol);
};

export default ElCol;

