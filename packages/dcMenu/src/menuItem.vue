<template>
  <div
    class="el-dcMenu-poper"
    style="display: flex; position: relative"
    @mouseenter="enterUl(item)"
    @mouseleave="leaveUl(item)"
  >
    <ul class="el-dcMenu-ul magic-bar" @mousemove="handleMouseMove">
      <li
        v-for="item in menuList"
        :class="{ active: activeArray.includes(item.value) }"
        :key="item.value"
        :id="item.value"
        @mouseenter="routerEnter(item)"
        @mouseleave="routeLeave(item)"
        @click.stop="routerClick(item)"
      >
        <div>{{ item.label }}</div>
        <i class="elicon el-icon-arrow-right" v-if="item.children&&item.children.length"></i>
      </li>
      <svg ref='hoverZone' class='el-cascader-menu__hover-zone'></svg>
    </ul>

    <span class="divider"></span>
    <subMenuNew
      :menuList="menuSubList"
      ref="menuList"
      v-if="menuSubShow"
    ></subMenuNew>
  </div>
</template>
<script>
import { find } from 'lodash';

export default {
  name: 'subMenuNew',
  props: ['menuList'],
  data() {
    return {
      menuSubShow: false,
      activeArray: [],
      menuSubList: [],
      activeNode: ''
    };
  },
  computed: { },
  watch: {
    menuList() {
      console.log(1);
    }
  },
  mounted() {
    // this.setMenuId();
  },
  methods: {
    // 鼠标移动事件，计算svg位置
    handleMouseMove(e) {
      const { activeNode, hoverTimer } = this;
      const { hoverZone } = this.$refs;

      if (!activeNode || !hoverZone) return;

      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);

        const { left } = this.$el.getBoundingClientRect();
        const startX = e.clientX - left;
        const { offsetHeight } = this.$el;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;

        hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${190} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${190} ${offsetHeight} V${bottom} Z" />
        `;
      } else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, 500);
      }
    },
    clearHoverZone() {
      const { hoverZone } = this.$refs;
      if (!hoverZone) return;
      hoverZone.innerHTML = '';
    },
    routerClick(item) {
      const { children } = item;
      if (!children || children.length == 0) {
        this.$router.push({ path: item.urlVue });
      }
    },
    // 进入下拉菜单
    enterUl() {
      this.activeArray = [];
    },
    // 离开下拉菜单
    leaveUl() {
      this.setMenuId();
      const activeNode = find(this.menuList, (menu) => menu.menuid == this.activeArray[1]);
      // 反显当前选中
      if (activeNode) {
        const { submenu } = activeNode;
        this.menuSubList = [];
        if (submenu.length) {
          this.menuSubList = submenu;
          this.menuSubShow = true;
          this.activeArray.push(activeNode.menuid);
        } else {
          this.menuSubList = [];
          this.menuSubShow = false;
        }
      }
    },
    routerEnter(item) {
      this.activeNode = document.getElementById(item.value);
      this.activeArray = [];
      this.menuSubShow = false;
      this.timeout = setTimeout(() => {
        const { children } = item;
        this.menuSubList = [];
        if (children.length) {
          this.menuSubList = children;
          this.menuSubShow = true;
          this.activeArray.push(item.value);
        } else {
          this.menuSubList = [];
          this.menuSubShow = false;
        }
      }, 1);
    },
    routeLeave() {
      clearTimeout(this.timeout);
    },
    setMenuId() {
      // const { crumbs } = commonVue.getNowMenu(this.menuData);
      this.activeArray = ([]).map((a) => a.menuid);
    }
  }
};
</script>
