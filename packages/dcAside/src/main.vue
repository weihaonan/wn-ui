<template>
  <el-aside v-bind='$attrs'>
    <slot></slot>
  </el-aside>
</template>

<script>
import ElAside from 'wn-ui/packages/aside';
export default {
  name: 'dbsec-aside',

  components: {
    ElAside
  },

  props: {
  }
};
</script>
