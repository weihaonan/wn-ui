import dcTable from '../dcTable/src/components/table.vue';

/* istanbul ignore next */
dcTable.install = function(Vue) {
  Vue.component(dcTable.name, dcTable);
};

export default dcTable;
