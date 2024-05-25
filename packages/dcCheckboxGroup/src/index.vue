<template>
  <el-checkbox-group
    v-model="value"
    v-on:input="changeValue"
    v-on="$listeners"
    v-bind="$attrs">
    <slot></slot>
  </el-checkbox-group>
</template>

<script>
import ElCheckboxGroup from 'wn-ui/packages/checkbox-group';
export default {
  name: 'dbsec-checkbox-group',
  componentName: 'dbsec-checkbox-group',
  components: {
    ElCheckboxGroup
  },
  data() {
    return {

    };
  },
  props: {
    value: {
      type: Array
    }
  },
  watch: {},
  // 方法集合
  methods: {
    changeValue(val) {
      this.$emit('input', val);
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style>
  
</style>