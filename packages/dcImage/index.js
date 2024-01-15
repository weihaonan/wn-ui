import dcImage from './src/index.vue';

/* istanbul ignore next */
dcImage.install = function(Vue) {
  Vue.component(dcImage.name, dcImage);
};

export default dcImage;
