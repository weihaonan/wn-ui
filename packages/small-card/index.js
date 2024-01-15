import smallCard from './src/index.vue';

/* istanbul ignore next */
smallCard.install = function(Vue) {
  Vue.component(smallCard.name, smallCard);
};

export default smallCard;
