<template>
  <el-tree
    v-on='$listeners'
    v-bind='$attrs'></el-tree>
</template>

<script>
import ElTree from 'element-ui/packages/tree';

export default {
  name: 'dbsec-tree',
  components: {
    ElTree
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