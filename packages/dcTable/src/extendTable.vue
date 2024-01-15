<template>
  <Table
    ref="table"
    v-on="$listeners"
    v-bind="$attrs"
    v-on:setCookieColumn="setCookieColumn"
    v-on:setTableData="setTableData"
    :tableColumns="tableColumns"
    :operColspan="operColspan"
    :span-method="objectSpanMethod"
    :showPage="showPage"
  >
    <!-- 自定义表头 -->
    <template slot-scope="{ item }" slot="customHeader">
      <slot :name="item.customHeader" :label="item.label"></slot>
    </template>
    <!-- 自定义操作列 -->
    <template slot="itemSlot" slot-scope="{ item, scope }">
      <!-- @slot 与tableSever保持一致 -->
      <slot
        :name="item.slotName"
        :item="scope.row"
        :index="scope.$index"
      ></slot>
    </template>
    <!-- 自定义表格下拉 -->
    <template slot-scope="{ item }" slot="expand">
      <slot :item="item" name="expand"></slot>
    </template>
    <!-- 自定义插槽 -->
    <template
      :slot="colObj.slotName"
      slot-scope="{ item, index }"
      v-for="colObj in tableColumns"
    >
      <slot :name="colObj.slotName" :item="item" :index="index"></slot>
    </template>
    <!-- 隐藏显示表头列 -->
    <div slot="operHeader" >
      <el-popover popper-class="el-extable-poper" trigger="hover">
        <span class="el-dropdown-link" slot="reference" style="cursor: pointer">
          <i class="dbsec-icon-cols-two" style="font-size: 16px"></i>
        </span>
        <!-- 下拉切换显示列 -->
        <TriggerCol
          :tableColumns="tableColumns"
          v-on="$listeners"
          v-on:setCookieCol="setCookieColumn"
          v-bind="$attrs"
          :columns="columns"
          :tableName="tableName"
        ></TriggerCol>
      </el-popover>
    </div>
    <!-- 扩展列 -->
    <div slot="expandColumnOper" slot-scope="{ item }" >
        <slot name="expandColumnOper">
          <ColumnOper
            ref="column-oper"
            :sortValue="sortValue"
            :tableName="tableName"
            :tableColumns="tableColumns"
            :column="item"
            v-bind="$attrs"
            v-on:setCookieCol="setCookieColumn"
            v-on="$listeners"
            v-on:closePoper="closePoper"
          >
          </ColumnOper>
        </slot>
    </div>
    <slot slot="empty" name="empty"></slot>
  </Table>
</template>

<script>
import { sortBy, has } from 'lodash';
// import $ from 'jquery';
import Table from './components/table.vue';
import TriggerCol from './components/triggColumn.vue';
import ColumnOper from './components/ColumnOper.vue';
import ElPopover from 'dbsec-ui/packages/popover';

/**  继承了el-table与tableServe所有的属性配置，可自行配置  */
export default {
  name: 'dbsec-table',
  props: {
    /**
     * 表头列，与el-table属性一致，可自行配置
     *@values  // 其余属性 {
          slotName:   自定义数据,
          param:  默认表格内数据,
          width:  宽度,
          hide:   是否隐藏,  }
     */
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 用于cookie记住当前保存的列，唯一值 没有则不用cookie记住
     */
    tableName: {
      type: String,
      default: ''
    },
    /**  是否有单独设置列功能  */
    operColspan: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean
    }
  },
  data() {
    return {
      cookieColumn: [],
      sortValue: {
        type: '',
        value: ''
      }
    };
  },
  components: {
    TriggerCol,
    Table,
    ElPopover,
    ColumnOper
  },
  computed: {
    tableColumns() {
      // const isCookie = this.tableName && this.cookieColumn.length;
      let newVal = this.columns.map((item, itemindex) => {
        let one = this.cookieColumn.find(
          (a) => a.name === (item.param || item.slotName)
        );
        if (!one) {
          one = {
            show: !item.hide,
            index: itemindex,
            fixed: item.fixed
          };
        }
        return {
          ...item,
          hide: !one.show,
          colindex: one.index,
          fixed: one.fixed ? one.fixed : false,
          width: one.width ? one.width : item.width
        };
      });
      newVal = sortBy(newVal, 'colindex');
      if (this.operColspan) {
        newVal = newVal.concat([
          {
            param: 'operColumn',
            operHeader: true,
            width: '40'
          }
        ]);
      }
      // console.log(newVal);
      return newVal;
    },
    showColCount() {
      let count = 0;
      this.tableColumns.forEach((item) => {
        if (!item.hide) {
          count += 1;
        }
      });
      if (has(this.$attrs, 'selection')) { // 如果有多选 则多一列
        count += 1;
      }
      if (has(this.$attrs, 'singleChoice')) { // 如果有序号 则多一列
        count += 1;
      }
      return count;
    },
    // 传pageParams就表示分页
    showPage() {
      if (this.$attrs.pageParams) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    // // 如果有鼠标移入表头事件
    // if (this.hasMouseEvent) {
    //   this.$nextTick(() => {
    //     this.mouseEnterEvent();
    //   });
    // }
  },
  methods: {
    mouseEnterEvent() {
      // 鼠标移入移出表头事件
      // eslint-disable-next-line no-unused-vars
      // let timer;
      // let enterTimer;
      // let leavePopTimer;
      // let canClosePoper = true;
      // // eslint-disable-next-line no-unused-vars
      // let canClose = true;
      // $('body').on('mouseleave', '.header-mouse-event .el-table__header', () => {
      //   console.log(1);
      //   clearTimeout(enterTimer);
      // });
      // $('body').on('mouseenter', '.header-mouse-event .el-table__header', () => {
      //   clearTimeout(timer);
      //   clearTimeout(leavePopTimer);
      //   enterTimer = setTimeout(() => {
      //     this.isheaderHover = true;
      //     canClose = true;
      //   }, 200);
      // });
      // // $('.el-table__header').mouseenter();
      // $('body').on(
      //   'mouseenter',
      //   '.pageselect-pop,.expand-poper,.el-select-dropdown',
      //   () => {
      //     canClose = false;
      //     canClosePoper = false;
      //   },
      // );
      // $('body').on(
      //   'mouseleave',
      //   '.pageselect-pop,.expand-poper,.el-select-dropdown',
      //   () => {
      //     console.log(3);
      //     canClosePoper = true;
      //     leavePopTimer = setTimeout(() => {
      //       if (canClosePoper) {
      //         canClose = true;
      //       }
      //     }, 300);
      //   },
      // );
      // 鼠标移入移出表头事件end
    },
    preSelect(list) {
      this.$refs.table.preSelect(list);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    removeSelection(obj) {
      this.$refs.table.removeSelection(obj);
    },
    toggleRowSelection(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    closePoper() {
      this.isheaderHover = false;
    },
    // = =============== cookie  记住显示隐藏列
    setCookieColumn(tableColumns) {
      const newArray = tableColumns.map((item, itemindex) => ({
        name: item.param || item.slotName,
        show: !item.hide,
        index: itemindex,
        width: item.width,
        fixed: item.fixed ? item.fixed : false // 锁定
      }));
      this.cookieColumn = newArray;
      if (this.tableName) {
        window.sessionStorage.setItem(
          `${this.tableName}columns`,
          JSON.stringify(newArray)
        );
      }
      // this.doLayout();
    },
    setTableData(data) {
      console.log('dddddd', data);
      this.$emit('setTableData', data);
    },
    // 保存table列于本地
    initStorageColumn() {
      // type  set 记住cookie get 拿到cookie
      // const Cookiescolumns = this.$Cookies.get(`${this.tableName}columns`);
      const Cookiescolumns = window.sessionStorage.getItem(
        `${this.tableName}columns`
      );
      if (this.tableName) {
        if (!Cookiescolumns) {
          this.setCookieColumn(this.tableColumns);
          return;
        }
        // 赋值
        this.cookieColumn = JSON.parse(Cookiescolumns);
      }
    },
    /**
     * 合併行列回調 有显示隐藏列操作时合并最后两列
     * */
    objectSpanMethod({ columnIndex }) {
      let data = [1, 1];
      if (this.operColspan) {
        if (columnIndex === this.showColCount - 2) {
          data = [1, 2];
        } else if (columnIndex === this.showColCount - 1) {
          data = [0, 0];
        }
      }
      return data;
    },
    doLayout() {
      this.$refs.table.doLayout();
    }
    // = =============== cookie  记住显示隐藏列
  },
  watch: {
    columns: {
      handler(newValue) {
        this.setCookieColumn(newValue);
      },
      deep: true
    }
  },
  created() {
    this.initStorageColumn();
  }
};
</script>
