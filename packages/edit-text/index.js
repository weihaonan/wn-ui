import editText from './src/index.vue';

/* istanbul ignore next */
editText.install = function(Vue) {
  Vue.component(editText.name, editText);
};

export default editText;
