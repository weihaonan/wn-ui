<template>
  <el-aside v-bind='$attrs'>
    <slot></slot>
  </el-aside>
</template>

<script>
import ElAside from 'dbsec-ui/packages/aside';
export default {
  name: 'dbsec-aside',

  components: {
    ElAside
  },

  props: {
  }
};
</script>
