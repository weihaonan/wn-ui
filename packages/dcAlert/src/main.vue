<template>
  <el-alert
    :type='progressType'
    close-text=''
    effect="light"
    v-bind='$attrs'
    v-on='$listeners'></el-alert>
</template>

<script>
import ElAlert from 'element-ui/packages/alert';

export default {
  name: 'dbsec-alert',
  components: {
    ElAlert
  },
  props: {
    type: {
      type: String
    }
  },
  computed: {
    progressType() {
      if (this.type == 'error') {
        return 'error';
      }
      return 'info';
    }
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