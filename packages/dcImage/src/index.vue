<template>
  <el-image
    v-bind="$attrs"
    v-on="$listeners">
      <template slot="placeholder">
        <slot name="placeholder"></slot>
      </template>
      <template slot="error">
        <slot name="error"></slot>
      </template>
  </el-image>
</template>

<script>
import ElImage from 'dbsec-ui/packages/image';
export default {
  name: 'dbsec-image',
  data() {
    return {

    };
  },
  components: {
    ElImage
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