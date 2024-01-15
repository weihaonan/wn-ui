<template>
  <el-menu
    class='el-dcMenu'
    mode="horizontal"
    :collapse-transition="false"
    :collapse="false"
    background-color="#fff"
    text-color="#1F1F1F"
    active-text-color="#F18101"
    v-on='$listeners'
    v-bind='$attrs'
  >
    <template v-for="item in array">
      <el-popover
        popper-class="el-dcMenu--popup"
        :key="item.value"
        placement="bottom-start"
        :disabled="!item.children.length"
        :open-delay="200"
        :close-delay="100"
        @hide="hidepopover"
        trigger="hover"
        :visible-arrow="false"
      >
        <menu-item :menuList="item.children" ref="menuList"></menu-item>
        <template slot="reference">
          <!-- 一级菜单 -->
          <el-menu-item :index="item.value">
            <div class="bigicon">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </div>
            <div class="smallicon">
              <el-tooltip
                class="item"
                :content="item.label"
                placement="top-start"
                effect="light"
              >
                <div class="iconfont" :class="item.icon"></div>
              </el-tooltip>
            </div>
          </el-menu-item>
        </template>
      </el-popover>
    </template>
  </el-menu>
</template>

<script>
import ElMenu from 'element-ui/packages/menu';
import popover from 'element-ui/packages/popover';
import tooltip from 'element-ui/packages/tooltip';
import ElMenuItem from 'element-ui/packages/menu-item';
import MenuItem from './menuItem.vue';

export default {
  name: 'dbsec-menu',
  components: {
    ElMenu,
    MenuItem,
    ElMenuItem,
    ElPopover: popover,
    ElTooltip: tooltip
  },
  props: {
    array: {
      type: Array
    }
  },
  data() {
    return {

    };
  },
  watch: {},
  // 方法集合
  methods: {
    // 收起下拉
    hidepopover() {
      this.$emit('hide');
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style>
  
</style>