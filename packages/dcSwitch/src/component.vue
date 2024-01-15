<template>
  <el-switch
    v-model="model"
    v-bind="$attrs"
    v-on='$listeners'></el-switch>
</template>
<script>
import ElSwitch from 'element-ui/packages/switch';

export default {
  name: 'dbsec-switch',
  components: {
    ElSwitch
  },
  props: {
    value: {
      type: Boolean
    },
    activeColor: {

    },
    inactiveColor: {

    },
    activeText: {},
    inactiveText: {}
  },
  data() {
    return {
    };
  },
  created() {
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
  watch: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>
