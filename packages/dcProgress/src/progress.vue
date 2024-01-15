<template>
  <el-progress
    status=''
    v-on="$listeners"
    v-bind="$attrs"></el-progress>
</template>

<script>
import ElProgress from 'element-ui/packages/progress';

export default {
  name: 'dbsec-progress',
  components: {
    ElProgress
  },
  data() {
    return {

    };
  },
  props: {
    color: {
      type: String
    },
    effect: {
      type: String
    },
    type: {

    }
  },
  computed: {
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