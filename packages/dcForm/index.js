import dcForm from './src/index.vue';

/* istanbul ignore next */
dcForm.install = function(Vue) {
  Vue.component(dcForm.name, dcForm);
};

export default dcForm;
