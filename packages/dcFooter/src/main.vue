<template>
  <el-footer v-bind='$attrs'>
    <slot></slot>
  </el-footer>
</template>

<script>
import ElFooter from 'dbsec-ui/packages/footer';
export default {
  name: 'dbsec-footer',

  components: {
    ElFooter
  },

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
};
</script>
