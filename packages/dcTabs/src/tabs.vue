<template>
  <el-tabs
    class="sss"
    v-model="model"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-tabs>
</template>
<script>
import ElTabs from 'element-ui/packages/tabs';
export default {
  name: 'dbsec-tabs',
  componentName: 'DbsecTabs',
  components: {
    ElTabs
  },
  props: {
    value: {
      type: String
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        // this.$emit('input', val); v-on='$listener'会触发input事件
      }
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>