import Row from './src/index.vue';

/* istanbul ignore next */
Row.install = function(Vue) {
  Vue.component(Row.name, Row);
};

export default Row;

