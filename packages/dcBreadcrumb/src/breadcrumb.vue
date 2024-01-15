<template>
  <el-breadcrumb
    v-bind='$attrs'
    v-on='$listeners'>
    <slot></slot>  
  </el-breadcrumb>
</template>
<script>
import ElBreadcrumb from 'element-ui/packages/breadcrumb';

export default {
  name: 'dbsec-breadcrumb',
  components: {
    ElBreadcrumb
  },
  props: {
  },

  provide() {
    return {
      elBreadcrumb: this
    };
  },

  mounted() {
    const items = this.$el.querySelectorAll('.el-breadcrumb__item');
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page');
    }
  }
};
</script>
