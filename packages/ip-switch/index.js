import ipSwitch from './src/ipSwitch.vue';

/* istanbul ignore next */
ipSwitch.install = function(Vue) {
  Vue.component(ipSwitch.name, ipSwitch);
};

export default ipSwitch;
