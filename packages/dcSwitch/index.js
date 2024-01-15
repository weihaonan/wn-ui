import dcSwitch from './src/component';

/* istanbul ignore next */
dcSwitch.install = function(Vue) {
  Vue.component(dcSwitch.name, dcSwitch);
};

export default dcSwitch;

