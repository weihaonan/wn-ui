<template>
  <el-collapse
    v-bind:value="value"
    v-on:input='changeInput'
    v-bind="$attrs"
    v-on="$listeners"
    class="el-dcCollapse user-collapse"
  >
  <!-- v-if='!noCollapse' -->
    <template 
      v-for="(item, itemindex) in collapseItem"
      >
      <el-collapse-item
        v-if='!noCollapse'
        :title="item.title"
        :name="item.value"
        :key="itemindex"
        :disabled='item.disabled'
      >
        <!-- 标题插槽 -->
        <template v-if="item.slotTitle" slot="title">
          <slot :name="item.slotTitle" :item="item"></slot>
        </template>
         <!-- 主体插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :item="item"></slot>
        </template>
      </el-collapse-item>
      <divide-panel
        v-else
        :key='item'
        :title="item.title"
        v-bind='$attrs'
        v-on='$listeners'
        >
          <!-- 标题插槽 -->
          <template slot='title'>
            <slot :name='item.slotTitle' :item='item'></slot>
          </template>
          <!-- 操作按钮插槽 -->
          <template slot='extra'>
            <slot :name='item.slotOper' :item='item'></slot>
          </template>
          <!-- 主体插槽 -->
          <slot :name='item.slotName'></slot>
        <!-- <slot name='title' slot='title'></slot>
        <slot name='extra' slot='extra'></slot> -->
      </divide-panel>
    </template>
  </el-collapse>
</template>
<script>
import ElCollapse from 'element-ui/packages/collapse';
import ElCollapseItem from 'element-ui/packages/collapse-item';
import DividePanel from 'dbsec-ui/packages/divide-panel';

export default {
  name: 'dbsec-collapse',
  components: {
    ElCollapse,
    ElCollapseItem,
    DividePanel
  },
  props: {
    array: { type: Array, default: () => [] }, // {title,value,formData|slot}
    value: {},
    noCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    collapseItem: {
      get() {
        return this.array;
      }
    }
  },
  data() {
    return {
    };
  },
  created() {
    // const abc = this.collapse.filter((a) => !a.nocollapse);
    // if (abc.length > 0) {
    //   this.collapseActives = abc.map((a) => a.value);
    // }
  },
  methods: {
    changeInput(val) {
      this.$emit('input', val);
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
