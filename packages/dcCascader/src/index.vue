<template>
  <div class="el-dcCascader">
    <el-cascader 
      ref="cascader"
      v-if="type!='panel'"
      :placeholder="placeholder"
      filterable
      collapse-tags
      size="small"
      :props="newProps"
      v-model="value"
      :options="options"
      v-bind="$attrs"
      v-on="$listeners">
    </el-cascader>
    <el-cascader-panel
      v-else
      v-bind="$attrs"
      v-on="$listeners"
      :options="options">
    </el-cascader-panel>
  </div>
</template>

<script>
import ElCascader from 'element-ui/packages/cascader';
import ElCascaderPanel from 'element-ui/packages/cascader-panel';

export default {
  name: 'dbsec-cascader',
  components: {
    ElCascader,
    ElCascaderPanel
  },
  props: {
    /** 绑定值 */
    value: {},
    type: { // checkbox类型
      type: String
    },
    /** 多选框的配置项 */
    options: {
      type: Object
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object
    },
    separator: {
      type: String,
      default: '/'
    },
    showAllLevels: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    newProps() {
      return {
        ...this.props,
        expandTrigger: 'hover'
      };
    }
  },
  methods: {
    getCheckedNodes() {
      this.$refs.cascader.getCheckedNodes();
    }
  }
};
</script>
