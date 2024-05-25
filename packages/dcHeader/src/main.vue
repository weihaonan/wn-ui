<template>
  <el-header v-bind='$attrs'>
    <slot></slot>
  </el-header>
</template>

<script>
import ElHeader from 'wn-ui/packages/header';
export default {
  name: 'dbsec-header',

  components: {
    ElHeader
  },

  props: {
  }
};
</script>
