<template>
  <div class="expand-cols">
    <span style=""
      >{{ column.label }}
      <i
        class="dbsec-icon-edu-custom-asc sort-icon"
        v-show="sortValue.type=='up' && sortValue.value == column.param"
      ></i>
      <i
        class="dbsec-icon-sort-down sort-icon"
        v-show="sortValue.type=='down' && sortValue.value == column.param"
      ></i>
    </span>
    <dbsec-popover
      :ref="column.param"
      popper-class="expand-cols-poper"
      style="cursor: pointer"
      placement="bottom-start"
      trigger="click"
    >
      <div v-on:click="popClose" class="column-oper">
        <ul>
          <li
            :class="{'expand-li': true,
              'dis-click':sortValue.type=='up' && sortValue.value==column.param}"
            v-show="column.expand.indexOf('sort') != -1"
            v-on:click="upSort"
          >
            <i class="dbsec-icon-edu-custom-asc"></i>
            {{ t("dc.table.upsort") }}
          </li>
          <li
             :class="{'expand-li': true,
              'dis-click':sortValue.type=='down' && sortValue.value==column.param}"
            v-show="column.expand.indexOf('sort') != -1"
            v-on:click="downSort"
          >
            <i class="dbsec-icon-sort-down"></i>
            {{ t("dc.table.downsort") }}
            <hr v-show="column.expand.length>=2"/>
          </li>
          <li
            class="expand-li"
            @click="lockCol"
            v-show="column.expand.indexOf('lock') != -1"
          >
            <i
              :class="{
                'dbsec-icon-unlock': column.fixed,
                'dbsec-icon-lock': !column.fixed,
              }"
            ></i>
            {{
              column.fixed
                ? t("dc.table.unlock")
                : t("dc.table.lock")
            }}
            <hr v-show="column.expand.length>=2" />
          </li>
          <li
            class=""
            disabled
            v-show="seniorFormItems&&seniorFormItems.length>0"
            style="color: #aaa; margin: 8px 4px;position:relative"
          >
            <i class="iconfont icon-shaixuan"></i>
            {{ t("dc.table.sift") }}
            <!-- TODO -->
            <dbsec-form
              class="table-form"
              ref="formOper"
              inputWidth="250px"
              :model="formData"
              labelWidth="15px"
              :formItems="formCondList"
            >
              <template slot="label"> &nbsp; </template>
              <!-- 会话开始时间 -->
              <template slot="loginTime"  >
                <dbsec-timeDate class="table-time" v-model="formData.loginTime"  >
                </dbsec-timeDate>
              </template>
              <!-- 会话结束时间 -->
              <template slot="logoutTime" slot-scope="{ item }">
                <dbsec-timeDate :form="formData" :item="item"> </dbsec-timeDate>
              </template>
              <!-- 查询按钮 -->
              <template slot="searchBtn">
                <dbsec-button type="primary"
                  style="margin-left:4px"
                  @click="onSearch"
                  size="mini">
                  {{ t("dc.table.search") }}
                </dbsec-button>
              </template>
            </dbsec-form> 
            <!-- <el-form ref="form">
              <el-form-item style="float: right; margin: 10px 5px 0px">
                <el-button size="mini" @click="cancel">{{
                  t("publicCommon_action_label_cancel")
                }}</el-button>
                <el-button type="primary" @click="onSearch" size="mini">
                  {{ t("publicCommon_action_label_search") }}
                </el-button>
              </el-form-item>
            </el-form> -->
          </li>
        </ul>
      </div>
      <dbsec-button
        slot="reference"
        size="mini"
        type="text"
        class="oper-btn"
      >
        <i class="el-icon-arrow-down" style="color:#C0C4CC"></i
      ></dbsec-button>
    </dbsec-popover>
  </div>
</template>
<script>
// import { find } from 'lodash';
// import Form from '../../FormCommon/Form.vue';
// import timeDate from '../../FormCommon/components/timeDate.vue';
import Locale from '../../../../src/mixins/locale';

export default {
  mixins: [Locale],
  data() {
    return {
      formData: {}, // 表单对象
      // seniorFormItems: [], // 查询条件项
      curParam: '' // 当前选项的key值
    };
  },
  components: {
    // Form,
    // timeDate,
  },
  // inject: ['getCacheId', 'getSecondSearch'],
  props: {
    // seniorFormItems: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // },
    column: {
      type: Object
    },
    // tableName: {
    //   type: String,
    //   default() {
    //     return '';
    //   }
    // },
    tableColumns: {
      type: Array,
      default() {
        return [];
      }
    },
    // searchType: {
    //   type: String,
    //   default() {
    //     return 'sql';
    //   }
    // },
    sortValue: {
      type: Object,
      default() {
        return {
          type: '',
          value: ''
        };
      }
    }
  },
  computed: {
    // 查询项表单列表
    seniorFormItems() {
      return this.column.seniorFormItems || [];
    },
    // 筛选表单列表
    formCondList() {
      return [
        {
          ...this.seniorFormItems[0],
          endbtn: 'searchBtn'
        }
      ];
    },
    // cacheId() {
    //   return this.getCacheId ? this.getCacheId() : '';
    // },
    ifSecondLevel() {
      return this.getSecondSearch ? this.getSecondSearch() : '';
    },
    // secondSearchList() {
    //   return this.$store.getters['auditSearch/getSecondSearchList'][this.searchType];
    // },
    condObj() {
      return this.seniorFormItems[0];
    }
  },
  watch: {
    // secondSearchList(val) {
    //   console.log(val);
    // }
    // seniorFormItems(val) {
    //   val.forEach((item) => {
    //     this.formData = { [item.param]: '' };
    //     if (item.paramKey) { // 如果一个表单对应两个传参  一个字符串 一个value
    //       this.formData[item.paramKey] = item.default ?
    // JSON.parse(JSON.stringify(item.default)) : '';
    //     }
    //   });
    // },
  },
  methods: {
    // triggerHover(type) {
    //   this.isheaderHover = type;
    // },
    /** 关闭 */
    popClose() {
      // debugger;
      // if (this.$refs.formOper && this.$refs.formOper.$refs.pageselect) {
      //   const pops = this.$refs.formOper.$refs.pageselect;
      //   pops.forEach((pop) => {
      //     pop.$refs.popover.doClose();
      //   });
      // }
    },
    /** 下拉对象列表 */
    // getObjectList(value, page) {
    //   const columnParam = {};
    //   if (this.secondSearchList) {
    //     this.secondSearchList.forEach((item) => {
    //       columnParam[item.param] = item.value;
    //     });
    //   }
    //   return new Promise((resolve, reject) => {
    //     this.$api.actionSearch
    //       .getAuditLevel2SelectObjectList({
    //         cacheId: this.cacheId,
    //         page: page || 1,
    //         pageSize: this.$store.getters['auditSearch/getPageSize'] || 10,
    //         columnParam,
    //         value,
    //         searchCode: this.column.searchCode
    //       })
    //       .then((result) => {
    //         // eslint-disable-next-line no-param-reassign
    //         // const result = { list: ['1.1.1.1'], total: 1 };
    //         console.log(this.seniorFormItems);
    //         this.seniorFormItems = [
    //           {
    //             ...this.condObj,
    //             array: result.list.map((item) => ({
    //               label: item.name,
    //               value: item.id,
    //               total: result.total
    //             }))
    //           }
    //         ];
    //         resolve(this.seniorFormItems);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    // 获取条件下拉列表
    // getStringList(value, page) {
    //   const columnParam = {};
    //   if (this.secondSearchList) {
    //     this.secondSearchList.forEach((item) => {
    //       columnParam[item.param] = item.value;
    //     });
    //   }
    //   if (this.column.callback) { // 自定义的点击下拉回调
    //     return new Promise((resolve, reject) => {
    //       this.column.callback({
    //         page: page || 1,
    //         pageSize: this.$store.getters['auditSearch/getPageSize'] || 10,
    //         value,
    //         columnParam,
    //         searchCode: this.column.searchCode
    //       }).then((result) => {
    //         console.log(this.seniorFormItems);
    //         this.seniorFormItems = [
    //           {
    //             ...this.condObj,
    //             array: result.list.map((item) => ({
    //               label: item,
    //               value: item,
    //               total: result.total
    //             }))
    //           }
    //         ];
    //         resolve(this.seniorFormItems);
    //       }).catch((err) => {
    //         reject(err);
    //       });
    //     });
    //   }
    //   return new Promise((resolve, reject) => {
    //     this.$api.actionSearch
    //       .getAuditLevel2SelectStringList({
    //         cacheId: this.cacheId,
    //         page: page || 1,
    //         pageSize: this.$store.getters['auditSearch/getPageSize'] || 10,
    //         value,
    //         columnParam,
    //         searchCode: this.column.searchCode
    //       })
    //       .then((result) => {
    //         // eslint-disable-next-line no-param-reassign
    //         // const result = { list: ['1.1.1.1'], total: 1 };
    //         console.log(this.seniorFormItems);
    //         this.seniorFormItems = [
    //           {
    //             ...this.condObj,
    //             array: result.list.map((item) => ({
    //               label: item,
    //               value: item,
    //               total: result.total
    //             }))
    //           }
    //         ];
    //         resolve(this.seniorFormItems);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    // 锁定列
    lockCol() {
      console.log(this.column);
      if (this.column.fixed) {
        this.column.fixed = false;
      } else {
        this.column.fixed = 'left';
      }
      const columns = this.tableColumns.map((item) => {
        if (item.param == this.column.param) {
          return {
            ...item,
            fixed: this.column.fixed
          };
        }
        return item;
      });
      this.$emit('setCookieCol', columns);
      // this.$emit('triggLock', this.column);
      this.closePoper();
    },
    // 升序
    upSort() {
      // this.$store.dispatch('auditSearch/setSortValue', {
      //   type: 'up',
      //   value: this.column.param
      // });
      this.sortValue.type = 'up';
      this.sortValue.value = this.column.param;
      this.$emit('upSort', this.column, this.sortValue);
      this.closePoper();
    },
    // 降序
    downSort() {
      // this.$store.dispatch('auditSearch/setSortValue', {
      //   type: 'down',
      //   value: this.column.param
      // });
      this.sortValue.type = 'down';
      this.sortValue.value = this.column.param;
      this.$emit('downSort', this.column, this.sortValue);
      this.closePoper();
    },
    // 取消
    cancel() {
      this.closePoper();
    },
    /**
     * 查询
     */
    onSearch() {
      // 根据value找出label
      this.$refs.formOper.$refs.validateForm.validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let labelValue = '';
          const value = this.formData[this.curParam]
            ? `${this.formData[this.curParam]}`.split(',')
            : '';
          if (value && this.condObj.array && this.condObj.array.length > 0) {
            // 根据下拉key获取label
            labelValue = this.condObj.array
              .filter((item) => value.indexOf(`${item.value}`) != -1)
              .map((cond) => cond.label)
              .join(' ');
          } else {
            labelValue = this.formData[this.curParam];
          }
          this.$emit('filterTable', {
            label: this.column.label,
            labelValue: labelValue || this.formData[this.curParam],
            value,
            condObj: this.condObj
          });
          this.closePoper();
          this.clearData();
          return false;
        }
        return false;
      });
    },
    clearData() {
      this.formData[this.curParam] = '';
    },
    closePoper() {
      this.$emit('closePoper');
      this.$refs[this.column.param].doClose();
    }
  },
  created() {
    // 获取字段对应的条件下拉列表
    // const conditionObj = find(
    //   this.column.expand,
    //   (item) => typeof item === 'object'
    // ); // 查询条件项
    // if (conditionObj) {
    //   const seniorFormItems = this.column.secondSearchForm;
    //   if (seniorFormItems.formType == 'pageselect') {
    //     if (seniorFormItems.param == 'auditDbName') {
    //       // 客户端mac跟数据库查询对象接口
    //       this.seniorFormItems = [
    //         {
    //           ...seniorFormItems,
    //           fixLabel: true,
    //           noCache: true, // 不要缓存
    //           callback: this.getObjectList,
    //           state: '',
    //           show: true
    //         }
    //       ];
    //     } else {
    //       this.seniorFormItems = [
    //         {
    //           ...seniorFormItems,
    //           fixLabel: true,
    //           callback: this.getStringList,
    //           state: '',
    //           show: true,
    //           rules: conditionObj.rules // 二次检索下拉列表不需要验证
    //         }
    //       ];
    //     }
    //   } else {
    //     this.seniorFormItems = [{ ...seniorFormItems, fixLabel: true, show: true }];
    //   }
    // }
    this.seniorFormItems.forEach((item) => {
      this.curParam = item.paramKey ? item.paramKey : item.param;
      this.formData = { [item.param]: '' };
      if (item.paramKey) {
        // 如果一个表单对应两个传参  一个字符串 一个value
        this.formData[item.paramKey] = item.default
          ? JSON.parse(JSON.stringify(item.default))
          : '';
      }
    });
  },
  mounted() {

  }
};
</script>
<!-- <style lang='scss' scoped>
.column-oper {
  .table-form {
    margin: 10px 1px;
    padding: 15px 15px 1px 5px;
    background: rgb(243, 243, 243);
    .el-form-item {
      .el-form-item__label {
        line-height: 16px;
      }
    }
  }
}
.expand-li {
  margin: 8px 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: var(--main-color);
  }
  .iconfont {
    font-size: 14px;
    margin-right: 5px;
  }
  .filt-area {
    background: rgb(243, 243, 243);
    margin: 4px 1px;
    padding: 10px 5px;
  }
  hr {
    height: 1px;
    border: 0;
    border-bottom: 1px solid #e5e0e0;
    margin: 11px 0px;
  }
}
.table-form .el-select {
  width: 100%;
}
.table-form .table-time .el-select {
  width: 88px !important;
}
.sort-icon {
  font-size:12px;
  color: var(--main-color)
}
.dis-click {
  pointer-events: none;
  color:#ddd
}
.oper-btn {
  position: absolute;
  right: 3px;
  line-height: 18px;
  font-size: 14px;
  i:hover{
    color:#f08300 !important
  }
}
</style> -->
