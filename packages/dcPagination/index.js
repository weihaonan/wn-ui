import dcPagination from './src/index.vue';

/* istanbul ignore next */
dcPagination.install = function(Vue) {
  Vue.component(dcPagination.name, dcPagination);
};

export default dcPagination;
