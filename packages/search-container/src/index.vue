<template>
  <el-container class="el-search-container">
    <el-header height="auto" class="el-search__header nopadding">
      <div class="headerForm valignCenter" v-show="lastFormList.length">
        <Filtering
          v-show="!isCheck || showNoneNum"
          :formObj="formObj"
          ref="Filtering"
          class="assets-list-filtering"
          :options="lastFormList"
          @change="debounceGetList"
          v-on="$listeners"
          v-bind="$attrs"
        >
          <template v-for="seach in lastFormList">
            <template :slot="seach.param">
              <slot
                :name="seach.param"
                :item="seach"
                v-if="seach.formType == 'other'"
              ></slot>
            </template>
            <template :slot="seach.prepend">
              <slot :name="seach.prepend" :item="seach"></slot>
            </template>
            <template :slot="seach.append">
              <slot :name="seach.append" :item="seach"></slot>
            </template>
            <template :slot="seach.prefix">
              <slot :name="seach.prefix" :item="seach"></slot>
            </template>
          </template>
        </Filtering>
        <div
          v-show="!showNoneNum"
          class="ValignCenterAlign"
          :class="{ lotButon: isCheck }"
          style="height: 40px"
        >
        <div 
          class="el-filter__btn"
          :class="{ 'tableRight reverse': !isCheck }">
          <div class="filterspan" v-show="isCheck">
            {{ t('dc.form.selected') }}
            <span class="textmain" style="padding: 0px 3px">
              {{ checkJson.total }}
            </span>
            {{ t('dc.form.item') }}
          </div>
          <!-- 按钮 -->
          <template v-for="(btn, btnindex) in btnShow">
            <template v-if="btn.custom !== -1">
              <dbsec-button
                class="elbutton"
                :key="btnindex + 'btn'"
                size="mini"
                v-on:click="btn.callback"
                :type="btn.type"
                :plain="btn.plain"
                >{{ btn.label }}
              </dbsec-button>
            </template>
            <template v-else>
              <slot :name="btn.param" :item="btn"></slot>
            </template>
          </template>
          <slot name="customButtons" v-if="!isCheck"></slot>
          <!-- {{btnMoreMenu}} -->
          <el-dropdown v-if="moreShow.length" placement="bottom">
            <dbsec-button size="mini">
              {{ t('dc.form.moreOper')
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </dbsec-button>
            <el-dropdown-menu style="min-width: 110px" slot="dropdown">
              <template v-for="(btn, index) in moreShow">
                <el-dropdown-item v-if="btn.show" :key="index + 'menu'">
                  <p class="dropdownMenu" v-on:click="btn.callback">
                    {{ btn.label }}
                  </p>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
          <!-- 按钮 -->
          <div class="removeBtn" v-show="isCheck">
            <dbsec-button type="primary" plain size="mini" @click="clearSelection"
              >X</dbsec-button
            >
          </div>
        </div>
      </div>
      <FilterResult
        v-show="!isCheck"
        :formObj="resultFormObj"
        ref="FilterResult"
        class="assets-list-filter-result"
        :options="resultFormList"
        @remove="removeParams"
      ></FilterResult>
      <!-- <div style="height: 5px; width: 2px"></div> -->
    </el-header>
    <el-main
      class="el-search__main"
      v-if="lastColumns.length"
    >
      <div  style="padding:0px 5px">
        <slot name="customTable" :notOper="isCheck"></slot>
      </div>
      <el-main class="el-search__table" style="padding-bottom:0px">
        <template v-if="$slots.customView">
          <slot name="customView"></slot>
        </template>
        <template v-else>
          <dbsec-table
            style="flex-grow: 1"
            ref="table"
            :columns="lastColumns"
            :smallTable="smallTable"
            v-on="$listeners"
            v-bind="$attrs"
            @filterTable="filterTable"
            @sumTotal="sumTotal"
            @changeSize='changeSize'
            @handleSizeChange='handleSizeChange'
          >
            <!-- 插槽 -->
              <template
                :slot="col.slotName"
                slot-scope="{ item }"
                v-for="col in columns"
              >
                <slot :name="col.slotName" :item="item" :notOper="isCheck"></slot>
              </template>
            <template v-for="col in columns">
              <template v-if="col.customHeader" :slot="col.customHeader">
                <slot :name="col.customHeader"></slot>
              </template>
            </template>
          </dbsec-table>
        </template>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import { debounce } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import Filtering from './components/Filtering.vue';
import FilterResult from './components/FilterResult.vue';
import Locale from 'dbsec-ui/src/mixins/locale';
import ElContainer from 'element-ui/packages/container';
import ElMain from 'element-ui/packages/main';
import ElDropdown from 'element-ui/packages/dropdown';
import ElDropdownMenu from 'element-ui/packages/dropdown-menu';
import ElDropdownItem from 'element-ui/packages/dropdown-item';
import ElHeader from 'element-ui/packages/header';

// import {
//   find, filter, map, isArray,
// } from 'lodash';
/**
 * 包含Table与Form的所有特性，可自行配置；
 * 重要配置项：
 * formObj 筛选表单json；
 * formList  筛选表单配置项；
 * [{
 * ...Form的所有特性,
 * resultArray:array;如果此参数是一个区间，或者需要两个参数展示，可配置此参数，默认‘-’连接，不配置会按照param显示
 * },...]；
 * btnList: 筛选表单右侧按钮  {
          label: label,
          callback: this.addItem,
          show: true,
          type: 'primary',
        }；
 * btnLotList：有选项时筛选表单右侧按钮
 *
 */
export default {
  name: 'dbsec-search-container',
  mixins: [Locale],
  components: {
    Filtering,
    FilterResult,
    ElContainer,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElMain,
    ElHeader
  },
  data() {
    return {
      lastColumns: [],
      lastFormList: [],
      checkJson: {
        total: 0,
        checkAll: false,
        nocheckList: []
      },
      removeObj: {}, // 当前删除的对象
      secondLevelObj: {
        formObj: {},
        formList: []
      },
      debounceGetList: debounce(() => {
        if (this.removeObj && this.removeObj.type == 'secondLevel') {
          this.secondLevelObj.formList = this.secondLevelObj.formList
            .filter((form) => form.param != this.removeObj.param);
          delete this.secondLevelObj.formObj[this.removeObj.param];
        } else {
          this.secondLevelObj.formList = [];
          this.secondLevelObj.formObj = {};
        }
        this.removeObj = {};// 还原
        this.$nextTick(() => {
          this.searchTable();
        });
      }, 300)
    };
  },
  props: {
    value: {},
    smallTable: {},
    formObj: {},
    formList: {},
    selected: {},
    btnList: {},
    btnLotList: {},
    columns: {},
    showNoneNum: {}
  },
  watch: {
    formList: {
      handler(newValue) {
        // console.log('newValue', newValue);
        this.lastFormList = newValue;
      },
      deep: true
    },
    columns(val) {
      this.lastColumns = val;
    }
  },
  computed: {
    // 查询结果列表 结果列表
    resultFormList() {
      return [...this.lastFormList, ...this.secondLevelObj.formList];
    },
    // 查询结果列表对象
    resultFormObj() {
      // eslint-disable-next-line prefer-object-spread
      return Object.assign(this.formObj, this.secondLevelObj.formObj);
    },
    params() {
      return this.value;
    },
    isCheck() {
      if (this.smallTable) {
        return false;
      }
      if (!this.checkJson.total) {
        return false;
      }
      return this.checkJson.total;
    },
    lastBtnList() {
      if (this.isCheck) {
        return this.btnLotList || [];
      }
      return this.btnList || [];
    },
    // 所有show:true需要显示的btn
    btnShowAll() {
      const showOptions = this.lastBtnList.filter((a) => a.show);
      return showOptions;
    },
    btnMoreMenu() {
      let newArray = [];
      newArray = this.btnShowAll.map((a, aindex) => ({
        ...a,
        showSearch: this.btnShowAll.length <= 4 || aindex < 3 // 为true平铺显示
      }));
      return newArray;
    },
    btnShow() {
      const showOptions = this.btnMoreMenu.filter((a) => a.showSearch);
      return showOptions;
    },
    moreShow() {
      const moreOptions = this.btnMoreMenu.filter((a) => !a.showSearch);
      return moreOptions;
    }
  },
  created() {},
  mounted() {
    console.log(this.columns);
    this.lastFormList = this.formList;
    this.lastColumns = this.columns;
  },
  // 方法集合
  methods: {
    /** 二次筛选 */
    filterTable(params) {
      console.log(params);
      const option = params.condObj;
      option.type = 'secondLevel';
      option.key = params.condObj.param;
      option.param = `${params.condObj.param}_secondLevel`;
      this.secondLevelObj.formObj = { [option.param]: params.value.join(',') };
      this.secondLevelObj.formList.push(option);
      this.$nextTick(() => {
        this.searchTable();
      });
    },
    // ============================表单
    removeParams(param) {
      console.log(param);
      this.removeObj = param;
      this.$refs.Filtering.submitSeachfilter(true);
      /** 一键清空所有选项的时候抛出方法  */
      this.$emit('removeFilter');
    },
    initParam() {
      this.$refs.FilterResult.initParam();
    },
    searchTable() {
      this.initParam();
      /** 调用主方法  */
      this.$emit('searchTable', this.resultFormObj);
    },
    // ============================表单
    // ============================表格
    sumTotal(num, checkAll, nocheckList) {
      this.checkJson = {
        total: num,
        checkAll,
        nocheckList
      };
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    changeSize(page, pageSize) {
      this.$emit('changeSize', page, pageSize);
      this.$emit('searchTable', this.resultFormObj, {
        pageNum: page,
        pageSize: pageSize
      });

    },
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size);
      this.$emit('searchTable', this.resultFormObj, {
        pageNum: 1,
        pageSize: size
      });
    }
    // ============================表格
  }
};
</script>
