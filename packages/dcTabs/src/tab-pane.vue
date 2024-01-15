<template>
  <el-tab-pane
    class="112"
    v-bind="$attrs"
    :label="label"
    :labelContent="labelContent"
    :name="name"
    v-on="$listeners">123
    <slot></slot>  
  </el-tab-pane>
</template>

<script>
import ElTabPane from 'dbsec-ui/packages/tab-pane';

export default {
  name: 'dbsec-tab-pane',
  componentName: 'dbsec-tab-pane',
  data() {
    return {

    };
  },
  props: {
    label: String,
    labelContent: Function,
    name: String
  },
  components: {
    ElTabPane
  },
  computed: {
    active() {
      const active = this.$parent.currentName === (this.name || this.index);
      if (active) {
        this.loaded = true;
      }
      return active;
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