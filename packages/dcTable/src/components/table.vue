<template>
  <el-container
    class="el-extable-main"
    :style="{ height: height }"
  >
    <div class="el-extable__content">
      <el-popover
        v-if="showCheckAll && isCrossCheck"
        v-model="showpopover"
        placement="bottom-start"
        trigger="hover"
      >
        <div style="min-width: 122px" class="checkT">
          <div>
            <el-checkbox
              v-model="crosschecked"
              @change="crossCheckChange"
              style="margin-bottom: 10px"
            >
              {{ t('dc.table.crossCheck') }}
              <span class="textNum">
                {{ getNumberText(pageParams.total) }}
              </span>
              {{ t('dc.table.strip') }}
            </el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="pagechecked" @change="pageCheck">
              {{ t('dc.table.pageCheck') }}
              <span class="textNum">{{ data.length }}</span>
              {{ t('dc.table.strip') }}
            </el-checkbox>
          </div>
        </div>
        <div
          slot="reference"
          class="checkAll"
          :style="{ top: checkOffestTop + 'px' }"
        ></div>
      </el-popover>
      <el-table
        ref="table"
        class="dbsec-table"
        :class="{
          defaultExpandIcon: defaultExpandIcon,
          removeVertical: removeVertical,
          hideRowNumber: hideRowNumber,
        }"
        :size="size"
        :key="tableKey"
        :row-key="rowKey"
        tooltip-effect="light"
        :border="smallTable?false:true"
        :height="height"
        :data="data"
        :stripe="smallTable ? false : stripe"
        header-cell-class-name="dbsec-table-header"
        v-bind="$attrs"
        v-on="new$listeners"
        style="width: 100%"
      >
        <!-- 单选固定列 -->
        <el-table-column
          fixed
          :label="t('dc.table.index')"
          v-if="singleChoice"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <!-- 固定多选列 -->
        <el-table-column
          fixed
          type="selection"
          reserve-selection
          :selectable="selectable"
          width="42"
          v-if="selection"
        >
        </el-table-column>
        <!-- 展开行 -->
        <el-table-column type="expand" v-if="expand">
          <template slot-scope="props">
            <!-- @slot 展开行内容自定义 -->
            <slot name="expand" :item="props.row" :index="props.$index"></slot>
          </template>
        </el-table-column>
        <template v-for="(item, index) in tableColumns">
          <!-- 自定义索引 -->
          <el-table-column
            v-if="item.type === 'index'"
            fixed
            width="50"
            type="index"
            :key="item.id"
            v-bind="bindItem(item)"
          ></el-table-column>
          <!-- 其他 -->
          <el-table-column
            v-else-if="!item.hide"
            :key="item.param + '-' + index"
            v-bind="bindItem(item)"
          >
           <!-- 自定义表头 start -->
            <template slot="header" slot-scope="scope">
              <!-- @slot 表头列显示隐藏功能 -->
              <slot v-if="item.operHeader" name="operHeader"></slot>
              <slot v-else-if="item.expand" name="expandColumnOper" :item="item"></slot>
              <span v-else>{{ item.label }}</span>
            </template>
            <!-- 扩展列功能 -->
             <!-- 自定义表头 end -->
            <template slot-scope="scope">
              <template v-if="item.slotName">
                <!-- @slot customHeader 自定义配置表头显示  列内的动态slotName 自定义配置内容  -->
                <slot
                  :name="item.slotName"
                  :item="scope.row"
                  :index="scope.$index"
                ></slot>
              </template>
              <div v-else class="rowEllipsis">
                <dbsec-tooltip
                  showOverflowTooltip
                  :content="scope.row[item.param] || 'N/A'">
                </dbsec-tooltip>
                <!-- {{ scope.row[item.param] || 'N/A' }} -->
              </div>
            </template>
          </el-table-column>
        </template>
        <template  slot="empty">
          <slot name="empty">
            <el-empty
              class="tableEmpty"
              :image-size="emptyJson['image-size']"
              :image="emptyJson.image"
              :description="emptyJson.text"
            ></el-empty>
          </slot>
        </template>
      </el-table>
    </div>
    <el-footer style="padding: 0" v-if="showPage" height="32px">
      <el-pagination
        v-show="showPage"
        style="float: right"
        :background="!smallTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :layout="
          smallTable
            ? 'prev,pager,next,total'
            : 'prev,pager,next,sizes,total,jumper'
        "
        :pager-count="smallTable ? 5 : 7"
        :current-page.sync="pageParams.pageNum"
        :page-sizes="pageParams.pageSizes||[10,20,50,100]"
        :page-size.sync="pageParams.pageSize"
        :total="pageParams.total"
        v-bind="pageParams"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
/* eslint-disable */
import {
  each,
  remove,
  concat,
  filter,
  some,
  findIndex,
  debounce,
  isEmpty,
  differenceBy,
} from 'lodash';
import Sortable from 'sortablejs';
import {getNumberText} from '../../../../src/utils/dc-util';
import Locale from '../../../../src/mixins/locale';
import ElTable from 'wn-ui/packages/table';
import ElTableColumn from 'wn-ui/packages/table-column';
import ElContainer from 'wn-ui/packages/container';
import ElMain from 'wn-ui/packages/main';
import ElPopover from 'wn-ui/packages/popover';
import ElFooter from 'wn-ui/packages/footer';
import ElInput from 'wn-ui/packages/input';
import ElPagination from 'wn-ui/packages/pagination';
import ElEmpty from 'wn-ui/packages/empty';

// import '../../../assets/fonts/iconfont'
// import '../../../assets/fonts/iconfont.css'
/**  继承了el-table所有的属性配置，可自行配置，不对外开放  */
export default {
  name:'dbsec-extable-main',
  mixins:[Locale],
  components:{
    ElTable,
    ElContainer,
    ElMain,
    ElPopover,
    ElFooter,
    ElPagination,
    ElTableColumn,
    ElInput,
    ElEmpty
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    /**  @model  */
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * 表头列，与el-table属性一致，可自行配置
     *@values  // 其余属性 {
          slotName:   自定义数据,
          param:  默认表格内数据,
          width:  宽度,
          hide:   是否隐藏,  }
     */
    tableColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    /**  显示数据  */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /**  默认的key  */
    rowKey: {
      type: String,
      default: 'id',
    },
    /**  是否显示多选  */
    selection: {
      type: Boolean,
      default: false,
    },
    /**  是否有跨页全选  */
    crossCheck: {
      type: Boolean,
      default: true,
    },
    /**  是否有单行点击事件  */
    rowClick: {
      type: Boolean,
      default: true,
    },
    /**  是否为小表格，小表格无跨页全选，分页最多三个标签，无background，layout只有prev,pager,next,total */
    smallTable: {
      type: Boolean,
      default: false,
    },
    /**  表格为空的时候的文字图片  */
    emptyJson: {
      type: Object,
      default() {
        return {
          'image-size': 0,
          text: '',
          image: '',
        };
      },
    },
    /**  是否有展开行  */
    expand: {
      type: Boolean,
      default: false,
    },
    /**  表格高度  */
    height: {
      type: [Number, String],
      default:'100%'
    },
    // autoHeight: {
    //   type: Boolean,
    //   default: false,
    // },
    /**  是否为单选  */
    singleChoice: {
      type: Boolean,
      default: false,
    },
    /**  是否显示分页  */
    showPage: {
      type: Boolean,
      default: false,
    },
    /** 分页参数 与el-pagination属性一致，可自行配置 */
    pageParams: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pageSizes: [10, 20, 50, 100],
          total: 0,
          pageSize: 20,
        };
      },
    },
    /** 分页后数据总数 */
    // total:{
    //   type:Number,
    //   default:0
    // },
    /**  展开图标是否为默认的上下箭头，现在为+-号  */
    defaultExpandIcon: {
      type: Boolean,
      default: false,
    },
    /** 表格是否去掉竖线 */
    removeVertical: {
      type: Boolean,
      default: false,
    },
    /** 表格是否去掉选择框数字 */
    hideRowNumber: {
      type: Boolean,
      default: false,
    },
    /** 表格是否有斑马线 */
    stripe: {
      type: Boolean,
      default: true,
    },
    /** 是否需要列与列之间的移动排序 */
    isDragColumn: {
      type: Boolean,
      default: false,
    },
    /** 是否需要行与行之间的移动排序 */
    isDragRow: {
      type: Boolean,
      default: false,
    },
    /** 列表为空时是否需要展示占位图 */
    showEmptyJson: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      getNumberText,
      isEmpty,
      tableKey: 0,
      // 多选
      crosschecked: false, // 跨页实时 变化
      checkOffestTop: 10, //
      checkAll: false, // 是否跨页进行时
      pagechecked: false, // 当页全选
      nocheckList: [], // 非全选参数
      showpopover: false,
      pageSize: 10,
      // 多选
      showOper: true,
      cookieColumn: [],
      showColumn: [],
      relSelected: [],
      delSelected: [],
      preselect: [],
      sort_table: null, // 拖拽实例
    };
  },
  computed: {
    // 事件重新定义，否则会有重复调用的问题
    new$listeners() {
      return Object.assign(this.$listeners, {
        'row-click': this.rowChange,
        select: this.selectChange,
        'selection-change': this.selectionChange,
        'current-change': this.currentChange,
        'header-dragend': this.headerDragend,
      });
    },
    existList() {
      return differenceBy(this.relSelected, this.nocheckList, this.rowKey);
    },
    isCrossCheck() {
      return this.crossCheck && this.selection && !this.smallTable;
    },
    showCheckAll() {
      let show = this.isCrossCheck && this.data.length;
      if (this.pageParams.total <= this.pageSize) {
        show = false;
      }
      return show;
    },
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        let value = val;
        if (this.preselect.length) {
          value = concat(val, this.preselect);
        }
        this.setCheckStatus(value);
        /**
         * v-model方法 内部流转，不抛出
         * @property {array} value 返回选中的数据
         */
        this.$emit('input', value);
      },
    },
  },
  watch: {
    data() {
      this.scanPreSelect();
      this.setCheckStatus(this.relSelected);
    },
    // pageParams: {
    //   handler(newValue) {
    //     console.log(newValue);
    //   },
    //   deep: true,
    // },
  },
  beforeMount() {
    window.addEventListener('resize', debounce(this.doLayout, 150));
  },
  mounted() {
    this.resetColumnDrop();
    this.resetRowDrop();
    this.resetSelectHeight();
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.doLayout, 150));
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  methods: {
    // 列属性
    bindItem(item) {
      let itemCol = {
        ...item,
        width: item.width,
        'min-width': item['min-width'] || item.minWidth || '',
        sortable: item.sortable,
        prop: item.param || item.slotName,
        'show-overflow-tooltip': false,
        // align: item.align || 'left',
        align: 'left',
        fixed: item.operHeader ? 'right' : item.fixed,
      };
      if (item.type === 'operation') {
        itemCol = {
          ...itemCol,
          fixed: 'right',
          hide: !this.showOper,
        };
      }
      return itemCol;
    },
    // 拖拽宽度回调
    headerDragend(newWidth, oldWidth, column) {
      const newTableColumns = this.tableColumns.map((col) => {
        if (col.slotName == column.property || col.param == column.property) {
          return {
            ...col,
            width: newWidth < 80 ? 80 : newWidth,
          };
        }
        return col;
      });
      /**
       * 记住cookie列数据
       * @property {array} newTableColumns 返回列数据
       */
      this.$emit('setCookieColumn', newTableColumns);
      if (this.isDragColumn) {
        this.$nextTick(() => {
          this.columnDrop();
        });
      } // 刷新拖拽事件
      this.resetSelectHeight();
    },
    resetSelectHeight() {
      if (this.showCheckAll && this.isCrossCheck) {
        this.$nextTick(() => {
          const wrapperTr = this.$refs.table.$el.querySelector(
            '.el-table__header .el-table-column--selection .cell'
          );
          if (wrapperTr) {
            this.checkOffestTop = wrapperTr.offsetTop;
          }
        });
      }
    },
    columnDrop() {
      // 重新初始化
      if (this.sort_table) {
        this.sort_table.destroy();
      }
      const wrapperTr = this.$refs.table.$el.querySelector('.has-gutter tr');
      // console.log(wrapperTr);
      this.sort_table = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: ({ newIndex, oldIndex }) => {
          const tableColumns = [...this.tableColumns];
          const showColumn = this.tableColumns.filter((a) => !a.hide);
          let newItem = showColumn[newIndex];
          let oldItem = showColumn[oldIndex];
          if (this.selection) {
            newItem = showColumn[newIndex - 1];
            oldItem = showColumn[oldIndex - 1];
          }
          const newI = newItem.colindex;
          const oldI = oldItem.colindex;
          tableColumns.splice(oldI, 1);
          tableColumns.splice(newI, 0, oldItem);
          this.$emit('setCookieColumn', tableColumns);
          this.resetColumnDrop();
        },
      });
    },
    resetColumnDrop() {
      this.tableKey = new Date().getTime();
      if (this.isDragColumn) {
        this.$nextTick(() => {
          this.columnDrop();
        });
      }
    },
    resetRowDrop(tableDatas) {
      this.tableKey = new Date().getTime();
      console.log('resetRowDrop', tableDatas);
      this.$emit('setTableData', tableDatas);
      if (this.isDragRow) {
        this.$nextTick(() => {
          this.rowDrop();
        });
      }
    },
    rowDrop() {
      // 重新初始化
      if (this.sort_table) {
        this.sort_table.destroy();
      }
      const wrapperTbody = this.$refs.table.$el.querySelector(
        '.el-table__body-wrapper tbody'
      );
      console.log(wrapperTbody);
      this.sort_table = Sortable.create(wrapperTbody, {
        animation: 180,
        delay: 0,
        onEnd: ({ newIndex, oldIndex }) => {
          if (newIndex == oldIndex) return;
          const tableData = this.data;
          tableData.splice(newIndex, 0, tableData.splice(oldIndex, 1)[0]);
          const newArray = tableData.slice(0);
          const tableDatas = [...newArray];
          // this.$emit('setTableData', tableDatas);
          this.resetRowDrop(tableDatas);
        },
      });
    },
    // =================================== 自定义复选框事件
    // getRowCheck(row) {
    //   return isEmpty(this.existList.find((a) => a[this.rowKey] == row[this.rowKey]));
    // },
    // changeRowCheck(row) {
    //   this.initNocheckList(row, this.getRowCheck(row));
    //   this.$refs.table.toggleRowSelection(row, this.getRowCheck(row));
    // },
    // ===================================多选
    // 清空所有
    clearCheck() {
      if (!this.isCrossCheck) {
        return;
      }
      this.crosschecked = false;
      this.checkAll = false;
      this.pagechecked = false;
      this.nocheckList = [];
      this.sumTotal([]);
    },
    // 跨页全选
    crossCheckChange() {
      this.toggleSelection(this.data, this.crosschecked);
      this.pagechecked = this.crosschecked;
      this.checkAll = this.crosschecked;
      this.showpopover = false;
      if (!this.crosschecked) {
        this.clearSelection();
      }
      this.nocheckList = [];
      this.sumTotal(this.relSelected);
    },
    // 当页全选
    pageCheck() {
      this.toggleSelection(this.data, this.pagechecked);
      this.showpopover = false;
    },
    // 装入取消选择列表
    initNocheckList(row, type) {
      const { nocheckList } = this;
      const key = row[this.rowKey];
      const isIndex = nocheckList.indexOf(key);
      if (type) {
        if (isIndex > -1) {
          nocheckList.splice(isIndex, 1);
        }
      } else if (isIndex < 0) {
        nocheckList.push(key);
      }
    },
    // 实时监控状态
    setCheckStatus(value) {
      if (!this.isCrossCheck) {
        if (this.selection) {
          this.sumTotal(value);
        }
        return;
      }
      // = ========反选
      if (this.checkAll) {
        this.crosschecked = true;
      }
      if (this.nocheckList.length > 0) {
        this.crosschecked = false;
      }
      // = ========反选
      // = ========单页是否全选
      const nocheckKey = []; // 未被选中的key
      const data = this.data.map((a) => a[this.rowKey]);
      data.forEach((key) => {
        const valueAll = value.map((a) => a[this.rowKey]);
        if (!valueAll.includes(key)) {
          nocheckKey.push(key);
        }
      });
      if (nocheckKey.length) {
        this.pagechecked = false;
      } else {
        this.pagechecked = true;
      }
      // = ========单页是否全选
      // = ========是否全选有取消勾选的情况
      if (this.checkAll) {
        const mustCeck = []; // 是否全选必选值
        data.forEach((key) => {
          const valueCheck = value.map((a) => a[this.rowKey]);
          if (!this.nocheckList.includes(key) && !valueCheck.includes(key)) {
            mustCeck.push(key);
          }
        });
        const rows = this.data.filter((a) => mustCeck.includes(a[this.rowKey]));
        this.toggleSelection(rows, true);
      }
      // = ========是否全选有取消勾选的情况
      // 计数
      this.sumTotal(value);
    },
    sumTotal(value) {
      let num = value.length;
      if (this.checkAll) {
        num = this.pageParams.total - this.nocheckList.length;
      }
      if (num > 0) {
        this.showOper = false;
      } else {
        this.showOper = true;
      }
      /**
       * 实时监控选中数量
       * @property {number} num 选中数量
       * @property {array} checkAll 是否为全选
       * @property {array} nocheckList 取消选中的数据
       */
      this.$emit('sumTotal', num, this.checkAll, this.nocheckList);
    },
    // ===================================多选
    // 大小修改
    handleSizeChange(val) {
      this.pageSize = val;
      /**
       * 每页显示多少
       * @property {number} val
       */
      this.$emit('handleSizeChange', val);
    },
    // 分页
    handleCurrentChange(val) {
      /**
       * 当前页 .$refs.table.bodyWrapper.scrollTop = 0
       * @property {number} val
       */
      this.$refs.table.bodyWrapper.scrollTop = 0; // 解决翻页后页面不回滚到最顶端问题
      this.$emit('changeSize', val,this.pageParams.pageSize);
    },
    doLayout() {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.table.doLayout();
        }
      });
    },
    rowChange(row) {
      console.log('roClikckkkkkkk');
      if (!this.rowClick) {
        return;
      }
      // if (this.selectable(row) && !this.singleChoice) {
      //   const check = isEmpty(
      //     this.existList.find((a) => a[this.rowKey] == row[this.rowKey]),
      //   );
      //   this.initNocheckList(row, check);
        // this.$refs.table.toggleRowSelection(row, check); 点击复选框上才选中
      // }
      /**
       * 单行选中事件
       * @property {object} row 当前行
       * @property {array} selected 选中的列
       */
      this.$emit('row-click', row, this.selected);
    },
    toggleSelection(rows, type) {
      // 多条选择
      this.$nextTick(() => {
        each(rows, (row) => {
          this.initNocheckList(row, type);
          this.$refs.table.toggleRowSelection(row, type);
        });
      });
    },
    clearSelection() {
      this.clearCheck();
      this.$refs.table.setCurrentRow();
      this.$refs.table.clearSelection();
      this.preselect = [];
    },
    toggleRowSelection(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    selectable(row, index) {
      console.log(row)
      let ischeck = true;
      /**
       * 事件判断列是否选中
       * @property {object} val { row, index }
       */
      this.$emit('checkSelectable', { row, index }, (val) => {
        ischeck = val;
      });
      return ischeck;
    },
    selectChange(selection, row) {
      // 单条 选择
      const isCheck = selection.find((a) => a[this.rowKey] == row[this.rowKey]);
      this.initNocheckList(row, isCheck != undefined);
      /** 与el-table select 同  */
      this.$emit('select', selection, row);
    },
    selectionChange(selected) {
      if (this.delSelected.length == 0) {
        /** 与el-table selection-change 同  */
        this.$emit('selection-change', selected);
        this.relSelected = selected;
        this.selected = selected;
      }
      this.delSelected = [];
    },
    setSelection(selectedList) {
      this.clearSelection();
      this.toggleSelection(selectedList);
    },
    preSelect(list) {
      this.$emit('input', list);
      this.preselect = [...list];
      // this.selected = filter(this.data, (item) => some(list, [this.rowKey, item[this.rowKey]]));
      this.scanPreSelect();
    },
    removeSelection(data) {
      const key = this.rowKey;
      const finded = findIndex(this.preselect, [key, data[key]]);
      const findedcolumns = findIndex(this.data, [key, data[key]]);
      const findedselected = findIndex(this.relSelected, [key, data[key]]);
      if (findedselected !== -1) {
        this.delSelected.push(data);
        this.relSelected.splice(findedselected, 1);
      }
      if (finded !== -1) {
        this.preselect.splice(finded, 1);
      } else if (findedcolumns !== -1) {
        this.$refs.table.toggleRowSelection(this.data[findedcolumns], false);
      }
      if (this.relSelected.length == 0 && this.preselect.length == 0) {
        this.selected = [];
        this.clearSelection();
      } else {
        this.selected = [...this.relSelected];
      }
    },
    currentChange(val) {
      if (this.singleChoice) {
        this.selected = [val];
      }
      /** 与el-table current-change 同  */
      this.$emit('current-change', val);
    },
    scanPreSelect() {
      if (this.data.length) {
        const key = this.rowKey;
        let findedpreselect = [];
        if (this.preselect.length) {
          // 外部需要回显数据，缓存数组
          findedpreselect = filter(this.data, (item) =>
            some(this.preselect, [key, item[key]])
          );
          // 未展开数据前
          if (findedpreselect) {
            this.toggleSelection(findedpreselect, true);
          }
        }
        if (this.selected.length) {
          // 如果已经删除，改变的本地缓存数组
          // 展开数据后
          const finded = filter(
            this.data,
            (item) => !some(this.selected, [key, item[key]])
          );
          if (finded && !findedpreselect.length) {
            this.toggleSelection(finded, false);
          }
        }
        if (findedpreselect.length) {
          // 外部回显之后，删除已经回显的数据
          remove(this.preselect, (item) =>
            some(findedpreselect, [key, item[key]])
          );
        }
      }
    },
  },
};
</script>
<!-- <style lang="scss"  >
// 全局公用
.el-table .cell.el-tooltip {
  white-space: normal !important;
}
.el-table .cell {
  word-break: break-word !important;
  line-height:31px;
}
.search-container {
  padding: 0px 5px 10px;
  position: relative;
}
.tableEmpty {
  padding: 0px;
}
</style> -->