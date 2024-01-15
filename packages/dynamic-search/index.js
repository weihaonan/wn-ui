import dynamicSearch from './src/index.vue';

/* istanbul ignore next */
dynamicSearch.install = function(Vue) {
  Vue.component(dynamicSearch.name, dynamicSearch);
};

export default dynamicSearch;
