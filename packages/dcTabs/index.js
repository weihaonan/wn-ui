import DcTabs from './src/tabs';

/* istanbul ignore next */
DcTabs.install = function(Vue) {
  Vue.component(DcTabs.name, DcTabs);
};

export default DcTabs;
