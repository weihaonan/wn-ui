import dcCard from './src/index.vue';

/* istanbul ignore next */
dcCard.install = function(Vue) {
  Vue.component(dcCard.name, dcCard);
};

export default dcCard;
