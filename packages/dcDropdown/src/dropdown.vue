<template>
  <el-dropdown 
    :hide-on-click='hideOnClick'
    :trigger='trigger'
    :type='type'
    :split-button='splitButton'
    size=''
    class='el-dcDropdown'
    @command="onChange" 
    style="margin-right: 10px"
    v-on='$listeners'
    v-bind='$attrs'>
    <slot></slot>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="a.disabled "
        v-for="(a, aindex) in optionsArray"
        :key="aindex"
        :command="a.value"
        :icon='a.icon'
        :divided='a.divided'
        >{{ a.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import ElDropdown from 'element-ui/packages/dropdown';
import ElDropdownMenu from 'element-ui/packages/dropdown-menu';
import ElDropdownItem from 'element-ui/packages/dropdown-item';
export default {
  name: 'dbsec-dropdown',
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu
  },
  props: {
    array: {
      type: Array
    },
    options: {
      type: Array
    },
    splitButton: {
      type: Boolean,
      default: false
    },
    size: {
      type: String
    },
    trigger: {
      type: String
    },
    type: {
      type: String
    },
    hideOnClick: {
      type: Boolean
    }
  },
  computed: {
    optionsArray() {
      const options = this.array || this.options;
      const array = options.filter((a) => !a.hide);
      return array;
    }
  },
  methods: {
    onChange(name) {
      this.$emit('handleChange', name);
      this.$emit('change', name);
    }
  }
};
</script>
<!-- <style lang="less" scoped>
.user-collapse {
  margin: 0 -10px;
  border: 0 none;

  .role-collapse-icon {
    color: #e6a23c;
    margin-left: 5px;
    font-size: 16px;
  }

  /deep/ .el-collapse-item__header {
    border-left: 3px solid #ec8500;
    border-bottom: 0 none;
    font-weight: 700;
    font-size: 14px;
    color: #333;
  }

  /deep/ .el-collapse-item__wrap {
    padding: 0 20px;
    border-bottom: 0 none;
  }

  /deep/ .el-collapse-item__content {
    padding: 20px 0;
  }
}
</style> -->
