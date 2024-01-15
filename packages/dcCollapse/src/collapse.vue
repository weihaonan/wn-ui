<template>
  <el-collapse
    v-model="model"
    v-bind="$attrs"
    v-on="$listeners"
    class="el-dcCollapse user-collapse"
  >
    <slot></slot>
  </el-collapse>
</template>
<script>
import ElCollapse from 'element-ui/packages/collapse';

export default {
  name: 'dbsec-collapse',
  componentName: 'DbsecCollapse',
  components: {
    ElCollapse
  },
  props: {
    value: {
      type: [Array, String, Number],
      default() {
        return [];
      }
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
