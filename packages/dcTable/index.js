import extendTable from './src/extendTable.vue';

/* istanbul ignore next */
extendTable.install = function(Vue) {
  Vue.component(extendTable.name, extendTable);
};

export default extendTable;
