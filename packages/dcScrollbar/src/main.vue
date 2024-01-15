<template>
  <el-scrollbar
    v-bind="$attrs"
    v-on="$listeners">
    <slot></slot>  
  </el-scrollbar>
</template>

<script>
import ElScrollbar from 'element-ui/packages/scroll-bar';
export default {
  name: 'dbsec-scrollbar',
  components: {
    ElScrollbar
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