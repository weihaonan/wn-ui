<template>
  <el-checkbox
    v-on="$listeners"
    v-bind="$attrs">
    <slot></slot>  
  </el-checkbox>
</template>

<script>
import ElCheckbox from 'element-ui/packages/checkbox';
export default {
  name: 'dbsec-checkbox',
  components: {
    ElCheckbox
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