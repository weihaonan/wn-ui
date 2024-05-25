<template>
  <el-tag
    :size="processSize"
    :effect="processEffect"
    v-on="$listeners"
    v-bind="$attrs">
    <slot></slot>
  </el-tag>
</template>

<script>
import ElTag from 'wn-ui/packages/tag';

export default {
  name: 'dbsec-tag',
  components: {
    ElTag
  },
  data() {
    return {

    };
  },
  props: {
    // type: {
    //   type: String
    // },
    size: {
      type: String
    },
    effect: {
      type: String
    }
  },
  computed: {
    // processType() {
    //   if (!this.type) {
    //     return '';
    //   }
    //   return 'info';
    // },
    processSize() {
      if (this.size == 'mini') {
        return 'mini';
      }
      return 'small';
    },
    processEffect() {
      if (this.effect == 'plain') {
        return 'plain';
      }
      return '';
    }
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