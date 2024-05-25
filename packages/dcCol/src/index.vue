<template>
  <el-col
    v-bind='$attrs'>
    <slot></slot>
  </el-col>
</template>

<script>
import ElCol from 'wn-ui/packages/col';

export default {
  name: 'dbsec-col',
  components: {
    ElCol
  },
  data() {
    return {

    };
  },
  watch: {},
  // 方法集合
  methods: {

  },
  created() {

  },
  mounted() {

  }
};
</script>

<style>
  
</style>