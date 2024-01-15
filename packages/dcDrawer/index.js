import dcDrawer from './src/main';

/* istanbul ignore next */
dcDrawer.install = function(Vue) {
  Vue.component(dcDrawer.name, dcDrawer);
};

export default dcDrawer;
