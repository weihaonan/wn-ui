<!-- eslint-disable no-unused-vars -->
<template>
  <div class="operationDiv">
      <div class="operationBtn">
        <p
          :class="[
            'normalBtn',
            isCheckedAll ? 'primaryBtn' : 'unPrimaryBtn',
          ]"
          @click="selectAllHeader"
        >
          <i
            :class="[
              isCheckedAll ? 'dbsec-icon-eye' : 'dbsec-icon-eye-close',
            ]"
          ></i>
          {{ t("dc.table.checkAll") }}
        </p>
        <p class="resetBtn" @click="resetHeader">
          <i class="el-icon-refresh-left"></i
          >{{ t("dc.table.resetFilter") }}
        </p>
      </div>
      <div class="dropdownItems magic-bar">
        <template v-for="item in tableColumns">
          <template
            v-if="
              item.param != 'operColumn' &&
              item.type != 'operation' &&
              !item.fixed
            "
          >
            <el-dropdown-item
              :disabled="item.fixShow"
              :icon="
                item.hide&&!item.fixShow
                  ? 'dbsec-icon-eye-close'
                  : 'dbsec-icon-eye'
              "
              :key="item.param"
              :class="item.hide&&!item.fixShow ? 'unCheckItem' : 'checkItem'"
              @click.native="toggleColumn(item)"
            >
              {{ item.label }}
            </el-dropdown-item>
          </template>
        </template>
      </div>
    </div>
</template>
<script>
import Locale from '../../../../src/mixins/locale';
import ElDropdownItem from 'element-ui/packages/dropdown-item';

export default {
  mixins: [Locale],
  data() {
    return {
      formData: {}, // 表单对象
      conditionList: [], // 查询条件项
      curParam: '' // 当前选项的key值
    };
  },
  components: {
    ElDropdownItem
  },
  props: {
    // 所有表格列
    tableColumns: {
      type: Array,
      default() {
        return [];
      }
    },
    tableName: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    // 是否全选
    isCheckedAll() {
      const checkedOptions = this.tableColumns.filter((a) => !a.hide);
      if (checkedOptions.length === this.tableColumns.length) {
        return true;
      }
      return false;
    }
  },
  watch: {
  },
  methods: {
    // 全选
    selectAllHeader() {
      this.$emit('setCookieCol', this.tableColumns.map((a) => ({ ...a, hide: false })));
      this.$emit('triggerColumn', this.tableColumns.map((a) => ({ ...a, hide: false })));
    },
    // 重置
    resetHeader() {
      // this.setCookieColumn(this.columns);
      const columns = this.columns.map((item) => {
        const { defaultShow } = item;
        let { hide } = item;
        if (defaultShow) {
          hide = false;
        }
        return {
          ...item,
          hide
        };
      });
      this.$emit('setCookieCol', columns);
      this.$emit('triggerColumn', columns);
    },
    /**
     * 切换显示列
     */
    toggleColumn(col) {
      // eslint-disable-next-line no-param-reassign
      col.hide = !col.hide;
      this.$emit('setCookieCol', this.tableColumns);
      this.$emit('triggerColumn', this.tableColumns);
      // this.doLayout();
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
