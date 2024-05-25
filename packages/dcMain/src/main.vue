<template>
  <el-main v-bind='$attrs'>
    <slot></slot>
  </el-main>
</template>

<script>
import ElMain from 'wn-ui/packages/main';
export default {
  name: 'dbsec-main',
  components: {
    ElMain
  }
};
</script>
