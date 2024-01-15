<template>
  <el-container
    v-bind='$attrs'>
    <slot></slot>  
  </el-container>
</template>

<script>
import ElContainer from 'dbsec-ui/packages/container';
export default {
  name: 'dbsec-container',

  components: {
    ElContainer
  },
  props: {
  },

  computed: {
  }
};
</script>
