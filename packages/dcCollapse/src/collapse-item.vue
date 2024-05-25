<template>
  <el-collapse-item
    :title="title"
    v-if="!noCollapse"
    v-on="$listeners"
    v-bind="$attrs">
    <slot name="title" slot="title"></slot>
    <slot></slot>
  </el-collapse-item>
  <divide-panel
    v-else
    :title="title"
    v-bind='$attrs'
    v-on='$listeners'
    >
      <!-- 标题插槽 -->
      <template slot='title'>
        <slot name='title' :item='item'></slot>
      </template>
      <!-- 操作按钮插槽 -->
      <template slot='extra'>
        <slot name='extra' :item='item'></slot>
      </template>
      <!-- 主体插槽 -->
      <slot></slot>
    <!-- <slot name='title' slot='title'></slot>
    <slot name='extra' slot='extra'></slot> -->
  </divide-panel>
</template>

<script>
import ElCollapseItem from 'element-ui/packages/collapse-item';
import DividePanel from 'wn-ui/packages/divide-panel';
export default {
  components: {
    ElCollapseItem,
    DividePanel
  },
  name: 'dbsec-collapse-item',
  data() {
    return {
      _collapseObj: {}
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    noCollapse() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'DbsecCollapse') {
          parent = parent.$parent;
        } else {
          this._collapseObj = parent;
          if (this._collapseObj.$attrs.hasOwnProperty('noCollapse')) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
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