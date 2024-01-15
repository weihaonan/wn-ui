<template>
  <el-popconfirm
    v-on="$listeners"
    v-bind="$attrs">
      <slot name="reference" slot="reference"></slot>
  </el-popconfirm>
</template>

<script>
import ElPopconfirm from 'dbsec-ui/packages/popconfirm';

export default {
  name: 'dbsec-popconfirm',
  components: {
    ElPopconfirm
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