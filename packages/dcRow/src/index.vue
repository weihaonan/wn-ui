<template>
  <el-row
    v-bind='$attrs'>
    <slot></slot>  
  </el-row>
</template>

<script>
import ElRow from 'dbsec-ui/packages/row';
export default {
  name: 'dbsec-row',
  components: {
    ElRow
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