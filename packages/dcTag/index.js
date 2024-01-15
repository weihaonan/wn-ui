import DcTag from './src/tag';

/* istanbul ignore next */
DcTag.install = function(Vue) {
  Vue.component(DcTag.name, DcTag);
};

export default DcTag;
