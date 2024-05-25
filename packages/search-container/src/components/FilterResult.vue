<template>
  <div
    class="filter-result ValignCenterAlign"
    :class="{ noExpend: !isExpend }"
    v-if="lastSearchConditions.length"
    style="display:none"
  >
    <i class="el-icon-warning textmain"></i>
    <div class="scrollDiv m-bar">
      <template v-if="isExpend">
        <div
          v-for="item in lastSearchConditions"
          :key="item.param"
          class="filterspan"
          :class="{ active: activeparam == item.param }"
        >
          <div class="textdiv">
            {{ item.label }}：
            <template v-if="item.prefix">{{ item.prefix }}</template>
            {{ item.value | inputTextFilter }}
            <template v-if="item.suffix">{{ item.suffix }}</template>
          </div>
          <i
            v-if="!item.noClose"
            class="el-icon-circle-close"
            @mouseover="activeShow(item.param)"
            @mouseout="activeHide(item.param)"
            @click="close(item.param, true)"
            style="cursor: pointer"
          ></i>
        </div>
      </template>
      <template v-else>
        <div class="filterspan">
          <div class="textdiv">
            包含条件<span
              v-for="item in lastSearchConditions"
              class="colorPrimary"
              :key="item.param"
            >
              {{ item.label }}
            </span>
            {{ lastSearchConditions.length }}项
          </div>
        </div>
      </template>
    </div>
    <el-link
      :underline="false"
      @click.stop.prevent="clear"
      class="filter-result-clear"
    >
      {{ t('dc.form.clear') }}
    </el-link>
    <el-link
      :underline="false"
      @click.stop.prevent="isExpend = !isExpend"
      class="filter-result-clear"
    >
      {{ isExpend ? '收起' : '展开' }}
    </el-link>
  </div>
</template>

<script>
import { isArray, isUndefined } from 'lodash';
import Locale from 'wn-ui/src/mixins/locale';
import ElLink from 'element-ui/packages/link';

export default {
  mixins: [Locale],
  components: {
    ElLink
  },
  filters: {
    inputTextFilter(item) {
      let text = item;
      if (item.length > 101) {
        text = `${item.slice(0, 100)}...`;
      }
      return text;
    }
  },
  props: {
    formObj: {
      type: Object,
      default() {
        return {};
      }
    },
    otherSearch: {
      // 纯自定义展示数组
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isExpend: true,
      activeparam: '',
      searchConditions: []
    };
  },
  computed: {
    // 处理searchConditions,如果有secondLevel优先使用
    lastSearchConditions() {
      const list = [];
      this.searchConditions.forEach((cond) => {
        if (cond.type == 'secondLevel') {
          // eslint-disable-next-line no-param-reassign
          cond.label += '(二次筛选)';
        }
        // if (!param) {
        list.push(cond);
        // }
      });
      return [...this.otherSearch, ...list];
    }
  },
  mounted() {
    this.initParam();
  },
  methods: {
    activeShow(param) {
      this.activeparam = param;
    },
    activeHide() {
      this.activeparam = '';
    },
    initParam() {
      const searchConditions = [];
      // console.log(this.formObj);
      Object.keys(this.formObj).forEach((parama) => {
        const obj = this.options.find((a) => a.param == parama);
        const objArray = this.options.find(
          (a) => a.resultArray && a.resultArray.includes(parama)
        );
        const newObj = obj || objArray;
        const value = this.formObj[parama];
        const isArrayEmpty = isArray(value) && value.length == 0;
        if (
          newObj &&
          value !== '' &&
          value != null &&
          value != undefined &&
          !isArrayEmpty
        ) {
          const { param } = newObj;
          const isExist = newObj.resultArray &&
            searchConditions.find((a) => a.param == param);
          if (isExist) {
            return;
          }
          const { label, resultArray } = newObj;
          if (newObj.formType == 'select') {
            // 选择
            const { array } = obj;
            let value2 = [];
            let labelArray = [];
            if (newObj.multiple) {
              labelArray = array.filter((a) => value.includes(a.value));
            } else {
              labelArray = array.filter((a) => value == a.value);
            }
            value2 = labelArray.map((a) => a.label);
            searchConditions.push({
              param,
              label,
              value: value2.length ? value2.join(' / ') : '',
              noClose: newObj.noClose
            });
          } else if (newObj.formType == 'date-picker' && isArray(value)) {
            // 时间
            if (value != null) {
              searchConditions.push({
                param,
                label,
                value: value.join(' - '),
                noClose: newObj.noClose
              });
            }
          } else if (resultArray) {
            // 自定义显示数据
            const newResult = [];
            resultArray.forEach((a) => {
              const avalue = this.formObj[a];
              if (avalue) {
                newResult.push(avalue);
              }
            });
            searchConditions.push({
              param,
              label,
              value: newResult.join(' - '),
              noClose: newObj.noClose
            });
          } else {
            // 普通显示param
            searchConditions.push({
              param,
              label,
              value,
              type: newObj.type,
              prefix: newObj.prefix ? newObj.prefix : '',
              suffix: newObj.suffix ? newObj.suffix : '',
              noClose: newObj.noClose
            });
          }
        }
      });
      this.searchConditions = searchConditions;
    },
    close(param, isEmit) {
      const obj = this.options.find(
        (a) => a.param == param || a.paramKey == param
      );
      const objArray = this.options.find(
        (a) => a.resultArray && a.resultArray.includes(param)
      );
      const otherSearchArray = this.otherSearch.find(
        (a) => a.param == param || a.paramKey == param
      );
      const newObj = obj || objArray || otherSearchArray;
      if (!newObj) {
        return;
      }
      if (newObj.noClose) {
        return;
      }
      // console.log(newObj);
      if (newObj.resultArray && newObj.resultArray.length) {
        newObj.resultArray.forEach((a) => {
          this.formObj[a] = '';
        });
      }
      if (!isUndefined(this.formObj[param])) {
        if (isArray(this.formObj[param])) {
          this.formObj[param] = [];
        } else {
          this.formObj[param] = '';
        }
      }
      if (isEmit) {
        this.$emit('remove', newObj);
      }
    },
    clear() {
      Object.keys(this.formObj).forEach((key) => {
        this.close(key);
      });
      this.$emit('remove');
    }
  }
};
</script>

