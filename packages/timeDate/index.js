import TimeDate from './src/TimeDate.vue';

/* istanbul ignore next */
TimeDate.install = function(Vue) {
  Vue.component(TimeDate.name, TimeDate);
};

export default TimeDate;
