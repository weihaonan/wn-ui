<template>
  <el-popover
    placement="top-start"
    :width="width"
    popper-class="el-page-select__poper"
    trigger="click"
    :ref="option.param + 'popover'"
    @show="handleStatusWarn"
  >
    <el-card  v-clickoutside="handleClose">
      <div slot="header" class="clearfix" style="display: flex">
        <el-input
          size="mini"
          v-model="searchName"
          clearable
          placeholder="关键字"
          @input="searchTable(true)"
        ></el-input>
        &nbsp;
        <!-- <el-button
          size="mini"
          :style="vm.$i18n.locale == 'enUS' && 'padding:7px 9px'"
          type="primary"
          @click="searchTable(true)"
        >
          {{ vm.nt('publicCommon_action_label_search') }}
        </el-button> -->
        <!-- <el-button
            size="mini"
            plain
            :style="vm.$i18n.locale == 'enUS' && 'padding:7px 10px'"
            @click="clearSearchInput"
          >
            {{ nt("publicCommon_action_label_clear") }}
          </el-button> -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-table
        ref="pageSelTable"
        v-loading="loading"
        size="mini"
        height="250"
        :data="tableData"
        @row-click="clickRow"
        @selection-change="handleSelectionChange"
        @select="selectRow"
        @select-all="selectAllRow"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column
          v-if="!option.single"
          type="selection"
          width="55"
          class="nowarpCol"
          :selectable="
            option.ifSelectableCb ? option.ifSelectableCb : () => true
          "
        >
        </el-table-column>
        <el-table-column prop="label" :label="option.label"></el-table-column>
        <el-table-column
          prop="label2"
          :label="option.label2"
          v-if="option.label2"
        >
        </el-table-column>
        <!-- 自定义列 -->
        <el-table-column v-if="option.slotCol" width="60">
          <template slot-scope="scope">
            <slot :name="option.slotCol" :item="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        class="smallpage"
        small
        style="text-align: center"
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        @current-change="changePage"
        :page-size="pageSize"
        :total="pageTotal"
      >
      </el-pagination>
    </el-card>
    <el-input
      v-if="!option.labelType"
      slot="reference"
      @input="changeInput"
      v-bind:value="value[option.param]"
      :size="size"
      :placeholder="
        option.placeholder
          ? option.placeholder
          : t('dc.pageSelect.select') + option.label
      "
      :style="inputPageWidth"
      clearable
      @clear="clearInput"
    ></el-input>
    <el-input
      v-else
      size="small"
      slot="reference"
      style="width: 200px"
      :placeholder="t('dc.pageSelect.selectTemplate')"
      v-model="value[option.param]"
    >
      <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
    </el-input>
  </el-popover>
</template>

<script>
import { debounce } from 'lodash';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Locale from 'element-ui/src/mixins/locale';
import ElInput from 'element-ui/packages/input';
import ElCard from 'element-ui/packages/card';
import ElTable from 'element-ui/packages/table';
import ElTableColumn from 'element-ui/packages/table-column';
import ElPagination from 'element-ui/packages/pagination';
import ElPopover from 'element-ui/packages/popover';

export default {
  name: 'dbsec-page-select',
  mixins: [Locale],
  data() {
    return {
      // 选中列表
      selList: [],
      searchName: '', // 查询条件
      currentPage: 1, // 当前页
      loading: false, // 等待画面
      selectList: [], // 选中列表
      debounceChange: debounce(() => {
        debugger;
        this.$emit('selection-change', this.selectList);
      }, 300)
    };
  },
  directives: { Clickoutside },
  components: {
    ElInput,
    ElCard,
    ElTable,
    ElPagination,
    ElTableColumn,
    ElPopover
  },
  props: {
    value: {
      type: Object
    },
    // labelType: { // 触发方式是label 默认是输入框
    //   type: Boolean,
    //   default() {
    //     return false;
    //   },
    // },
    refKey: {
      type: String,
      default: '1'
    },
    // labelType 触发方式是label 默认是输入框
    option: {
      type: Object
    },
    dbsec: {
      type: Boolean,
      default: false
    },
    inputPageWidth: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    width() {
      if (this.option.label2) {
        // 有两列就调宽
        return 600;
      }
      return 360;
    },
    tableData() {
      let list = [];
      console.log(this.option);
      if (this.option.state) {
        // 如果vuex中有缓存就取缓存
        const stateValue = this.option.state;
        list = this.$store ? this.$store.getters[stateValue] : [];
      } else if (this.option.array || this.option.options) {
        // 没有缓存就取json中的array列表
        list = this.option.array || this.option.options;
      }
      // console.log('list', list);
      return list;
    },
    pageTotal() {
      let total = 1;
      const tableData = this.tableData ? this.tableData : [];
      if (tableData.length > 0) {
        total = this.tableData[0].total || this.tableData.length;
      }
      return parseInt(total, 10);
    },
    size() {
      return 'small';
    },
    pageSize() {
      return (this.$store && this.$store.getters['auditSearch/getPageSize']) || 10;
    }
  },
  watch: {
    value(val, oldVal) {
      // 数据变化才触发查询
      if (val[this.option.param] != oldVal[this.option.param]) {
        this.debounceChange();
      }
    },
    tableData(val, oldVal) {
      // 监控反显
      console.log(val, oldVal);
      // 判断是否有回显
      if (this.value[this.option.param]) {
        const values = this.value[this.option.param].split(',');
        // console.log(values);
        val.forEach((item) => {
          values.forEach((value) => {
            if (item.label == value) {
              setTimeout(() => {
                this.$refs.pageSelTable.toggleRowSelection(item);
              }, 100);
            }
          });
        });
      }
    }
  },
  // 方法集合
  methods: {
    handleClose() {
      if (this.option.slotCol) {
        // 如果有自定义操作列，暂时将此功能关闭
        return;
      }
      this.$refs[`${this.option.param}popover`].doClose();
    },
    // 输入框输入事件
    changeInput(val) {
      if (this.option.notInput) {
        // 对于不能输入的字段
        this.value[this.option.param] = this.value[this.option.param];
      } else {
        this.value[this.option.param] = val;
        const values = val.split(',');
        this.$refs.pageSelTable.clearSelection();
        // 反显是否选中列表
        this.tableData.forEach((item) => {
          values.forEach((value) => {
            if (item.label == value) {
              setTimeout(() => {
                this.$refs.pageSelTable.toggleRowSelection(item);
              }, 100);
            }
          });
        });
      }
      // this.debounceChange();
    },
    clearSearchInput() {
      this.searchName = '';
    },
    /**
     * 换页回调
     */
    changePage(page) {
      if (this.option.callback) {
        this.option.callback(this.searchName, page).then(() => {
          this.$refs.pageSelTable.bodyWrapper.scrollTop = 0;
        });
      }
    },
    /**
     * 点击单行回调
     */
    handleCurrentChange(val) {
      if (this.option.single && val) {
        // console.log('valllllll', val);
        this.value[this.option.param] = val.label;
        this.value[this.option.paramKey] = val.value
          ? val.value.toString()
          : val.value;
        this.$emit('changeSelect', this.option, val);
        this.$refs[`${this.option.param}popover`].doClose(); // 单选选中后就直接关闭弹框
      }
    },
    // 查询表格
    searchTable() {
      // //console.log(type, '33', this.option, this.searchName);
      if (this.option.callback) {
        const callback = this.option.callback(this.searchName);
        if (callback) {
          this.loading = true;
          callback
            .then((data) => {
              console.log(data);
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      }
    },
    // 清除
    clearInput() {
      this.$refs.pageSelTable.clearSelection();
      this.value[this.option.param] = ''; // todo 全清还是只清当前页
      if (Array.isArray(this.value[this.option.paramKey])) {
        // 如果是数组设置成空数组
        this.value[this.option.paramKey] = [];
      } else {
        this.value[this.option.paramKey] = '';
      }
      this.$emit('clearPageInput');
    },
    /**
     * 打开前关闭其他pop
     */
    // afterenter() {
    //   const pageselectpop = document.querySelectorAll('.pageselect-pop');
    //   // //console.log(this.$refs.popover.popperElm);
    //   pageselectpop.forEach((a) => {
    //     if (this.$refs.popover.popperElm != a) {
    //       // eslint-disable-next-line no-param-reassign
    //       a.style.display = 'none';
    //     }
    //   });
    // },
    /**
     * 点击下拉
     */
    handleStatusWarn() {
      this.searchTable();
      this.$nextTick(() => {
        this.currentPage = 1;
      });
      const e = window.event;
      e.stopPropagation();
    },
    visiblechange() {
      this.clicksel();
    },
    /**
     * 添加单行
     */
    addRow(row) {
      this.selList.push(row);
      if (this.option.paramKey) {
        // 区分value label
        if (Array.isArray(this.value[this.option.paramKey])) {
          // 判断类型
          this.value[this.option.paramKey].push(row.value);
        } else if (typeof this.value[this.option.paramKey] == 'string') {
          this.value[this.option.paramKey] = row.value;
        }
      }
      this.value[this.option.param] += `,${row.label}`;
      // 去掉字符串后的最后一个逗号
      const reg = /^,/gi;
      this.value[this.option.param] = this.value[this.option.param].replace(
        reg,
        ''
      );
    },
    /**
     * 点击行回调
     */
    clickRow(row) {
      // 如果ifSelectableCb有并且返回true   或者  没有ifSelectableCb
      if ((this.option.ifSelectableCb && this.option.ifSelectableCb(row)) ||
      !this.option.ifSelectableCb) {
        // 行是否可以被点击
        if (!this.option.single) {
          this.$refs.pageSelTable.toggleRowSelection(row);
          this.$nextTick(() => {
            this.selectRow(this.selectList, row);
          });
        }
      }
    },
    /**
     * 删除单行
     */
    // eslint-disable-next-line consistent-return
    deleteRow(row) {
      if (this.option.paramKey) {
        const arr = this.value[this.option.paramKey];
        // this.value[this.option.paramKey].remove(row.value);
        // console.log(arr.findIndex((item) => item === row.value));
        if (arr.findIndex((item) => item === row.value) > -1) {
          // 找得到才从arr中删除
          arr.splice(
            arr.findIndex((item) => item === row.value),
            1
          );
        }
      }
      // 去逗号
      // 为空 不为空
      if (!this.value[this.option.param]) {
        return false;
      }
      const selectedParamList = this.value[this.option.param].split(',');
      const curIndex = selectedParamList.findIndex((item) => item == row.label); // 查找在选中列表的第几个
      if (curIndex != -1) {
        // 表示能找到
        selectedParamList.splice(curIndex, 1);
      }
      this.value[this.option.param] = selectedParamList.join(',');
    },
    /**
     * 切换单行选中
     */
    selectRow(selection, row) {
      debugger;
      // //console.log(selection, row);
      // 判断是选中还是删除
      const ifAdd = selection.find((item) => item.value == row.value);
      if (ifAdd) {
        this.addRow(ifAdd); // 添加一行选中
      } else {
        this.deleteRow(row);
      }
    },
    /**
     * 全选
     */
    selectAllRow(selection) {
      // //console.log(selection);
      if (selection.length == 0) {
        // 取消全选 直接从选中中删除
        // //console.log(this.tableData);
        // //console.log(this.value);
        this.tableData.forEach((item) => {
          // 从选中列表中删除
          this.deleteRow(item);
        });
      } else {
        this.tableData.forEach((item) => {
          // 先从选中列表中删除 防止重复添加
          this.deleteRow(item);
          // if ()
          // 再添加
          this.addRow(item);
        });
      }
      this.debounceChange();
    },
    /**
     * 切换选中,要不要触发父级change事件
     */
    handleSelectionChange(val) {
      // console.log(val, this.value[this.option.param], 'select');
      this.selectList = val;
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>
