<template>
  <el-divider
    v-bind='$attrs'>
    <slot></slot>  
  </el-divider>
</template>

<script>
import ElDivider from 'element-ui/packages/divider';
export default {
  name: 'dbsec-divider',
  components: {
    ElDivider
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