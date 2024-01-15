import searchContainer from './src/index.vue';

/* istanbul ignore next */
searchContainer.install = function(Vue) {
  Vue.component(searchContainer.name, searchContainer);
};

export default searchContainer;
