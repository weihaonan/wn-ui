<template>
  <el-transfer v-model="value" :data="data"
    v-on='$listeners'
    v-bind="$attrs"></el-transfer>
</template>

<script>
import ElTransfer from 'element-ui/packages/transfer';

export default {
  name: 'dbsec-transfer',
  data() {
    return {

    };
  },
  props: {
    value: {
      type: Array
    },
    data: {

    }
  },
  components: {
    ElTransfer
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