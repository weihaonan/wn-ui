<template>
  <el-empty 
    v-on="$listeners"
    v-bind="$attrs">
    <slot></slot>
  </el-empty>
</template>

<script>
import ElEmpty from 'dbsec-ui/packages/empty';
export default {
  name: 'dbsec-empty',
  components: {
    ElEmpty
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