<template>
  <div class="timeDataSeach el-timedate" :style="{ width: getLabelWidth }">
    <el-select
      v-model="timeType"
      size="small"
      :placeholder="placeholder"
      :clearable="hasClear"
      @change="changeTime(true)"
      :class="timeType != 'diy' ? 'fullAll' : 'fullOne'"
    >
      <el-option
        v-for="item in pickerOptions"
        :key="item.type"
        :label="item.label"
        :value="item.type"
      >
      </el-option>
    </el-select>
    <template v-if="timeType == 'diy'">
      <el-date-picker
        size="small"
        ref="picker"
        class="singleTime"
        popper-class="noclear"
        v-model="time"
        :type="pickerType"
        range-separator="-"
        :clearable="true"
        :editable="editable"
        :default-time="defaultTime"
        :start-placeholder="t('dc.timeDate.startTime')"
        :end-placeholder="t('dc.timeDate.endTime')"
        @change="changeTime"
        @focus="focusInput"
      >
      </el-date-picker>
    </template>
  </div>
</template>
<script>
import { isNumber, find } from 'lodash';
import $ from 'jquery';
import dateFormat from './dateFormat';
import TimeDate from './timeDate';
import Locale from 'element-ui/src/mixins/locale';
import ElSelect from 'element-ui/packages/select';
import ElOption from 'element-ui/packages/option';
import ElDatePicker from 'element-ui/packages/date-picker';

const nowDate = dateFormat(new Date(), '%Y-%M-%D');

export default {
  name: 'dbsec-timeDate',
  components: {
    ElSelect,
    ElOption,
    ElDatePicker
  },
  mixins: [Locale],
  props: {
    /**  @model  */
    value: {
      type: Array || String,
      default: null
    },
    /** 初始化类型
     * @values
     * t5:最近5分钟
     * t30:最近30分钟
     * t60:最近60分钟
     * today:今天
     * lastday:昨天
     * last7day:最近7天
     * last30day:最近30天
     * tmonth:本月
     * lastmonth:上个月
     * diy:自定义
     */
    type: {
      type: String,
      default: ''
    },
    /**  是否需要清空选项  */
    hasClear: {
      type: Boolean,
      default: false
    },
    // 是否可编辑
    editable: {
      type: Boolean,
      default: false
    },
    /**  是否需要placeholder  */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * 日期范围精准度
     * daterange 天
     * monthrange 月
     * datetimerange 小时
     */
    pickerType: {
      type: String,
      default: 'datetimerange'
    },
    /**  是否需要显示最近五分钟的选项  */
    isSearch: {
      type: Boolean,
      default: false
    },
    /**  是否需要cookie记住的联动选项  */
    isCookie: {
      type: Boolean,
      default: false
    },
    /** 是否只精确到小时 */
    timeToHour: {
      type: Boolean,
      default: false
    },
    /**  宽度  */
    width: {
      type: [Number, String],
      default: '360px'
    },
    customPicker: {
      type: Array
    }
  },
  data() {
    const { vm } = window;
    return {
      vm,
      timeType: 'today',
      time: [`${nowDate} 00:00:00`, `${nowDate} 23:59:59`]
    };
  },
  computed: {
    // compTime() {
    //   if (this.pickerType == 'week') {
    //     return '';
    //   } else {
    //     return this.time;
    //   }
    // },
    defaultTime() {
      if (this.timeToHour) {
        return ['00:00:00', '23:00:00'];
      }
      return ['00:00:00', '23:59:59'];
    },
    getLabelWidth() {
      if (isNumber(this.width)) {
        return `${this.width}px`;
      }
      return this.width;
    },
    pickerOptions() {
      const pickerOptions = TimeDate.pickerOptions();
      let noShowArray = ['t5', 'lastweek', 'tweek'];
      if (this.isSearch) {
        noShowArray = [];
      }
      if (this.pickerType == 'daterange') {
        noShowArray = ['t5', 't30', 't60', 'lastweek', 'tweek'];
      }
      if (this.pickerType == 'week') {
        noShowArray = ['t5', 't30', 't60', 'today', 'lastday', 'last30day', 'tmonth', 'lastmonth'];
      }
      if (this.pickerType == 'monthrange') {
        noShowArray = ['t5', 't30', 't60', 'lastweek', 'tweek', 'today', 'lastday', 'last7day'];
      }
      if (this.pickerType == 'datetimerange' && this.timeToHour) {
        noShowArray = ['t5', 't30', 't60', 'lastweek', 'tweek'];
      }
      if (this.customPicker) { // 如果存在自定义选项
        return pickerOptions.filter((a) => this.customPicker.includes(a.type));
      }
      return pickerOptions.filter((a) => !noShowArray.includes(a.type));
    }
  },
  watch: {
    type: {
      deep: true,
      handler() {
        this.initFormType();
      }
    }
  },
  created() {
    this.initFormType();
  },
  methods: {
    // 获取焦点
    focusInput() {
      if (this.timeToHour) {
        // 去掉分秒选择
        $('.el-time-spinner .el-time-spinner__wrapper:nth-child(3)').hide();
        $('.el-time-spinner .el-time-spinner__wrapper:nth-child(2)').hide();
        $('.el-time-spinner .el-time-spinner__wrapper').css('width', '100%');
      }
    },
    initFormType() {
      console.log(this.pickerType);
      if (this.hasClear && (!this.value || !this.value.length)) {
        this.timeType = '';
        this.$emit('input', null);
        this.$emit('formchange', this.timeType, null);
        return;
      }
      let type = this.type || 'today';
      if (this.pickerType == 'monthrange') {
        type = 'tmonth';
      }
      if (this.pickerType == 'week') {
        type = 'tweek';
      }
      // =============type回显
      const value = type == 'diy' ? this.value : TimeDate.getTimeWidthType(type);
      let timeType = type;
      let time = value ||
        this.value || [`${nowDate} 00:00:00`, `${nowDate} 23:59:59`];
      // =============type回显
      // =============cookie记住
      const currentTime = window.sessionStorage.getItem('currentTime');
      if (this.isCookie && currentTime && !this.type) {
        const localTime = JSON.parse(currentTime);
        // 如果在下拉选项中，不在就默认今天
        if (find(this.pickerOptions, (option) => option.type == localTime.type)) {
          timeType = localTime.type;
          const cookieValue = TimeDate.getTimeWidthType(localTime.type);
          time = cookieValue || localTime.value;
        }
      }
      // =============cookie记住
      this.timeType = timeType;
      this.time = time;
      this.$emit('input', time);
      this.$emit('formchange', this.timeType, value);
    },
    // 更新时间
    refreshTime() {
      debugger;
      let value = this.time;
      if (this.timeType != 'diy') {
        value = TimeDate.getTimeWidthType(this.timeType);
      } else if (this.time != null) {
        let formatstart = '';
        let formatend = '';
        if (this.timeToHour) {
          formatstart = '%Y-%M-%D %H:00:00';
          formatend = '%Y-%M-%D %H:00:00';
          // this.time = [`${nowDate} 00:00:00`, `${nowDate} 23:00:00`];
          // value = this.time;
        } else {
          formatstart = '%Y-%M-%D %H:%I:%S';
          formatend = '%Y-%M-%D %H:%I:%S';
        }
        if (this.pickerType == 'daterange') {
          formatstart = '%Y-%M-%D 00:00:00';
          formatend = '%Y-%M-%D 23:59:59';
        }
        if (this.pickerType == 'monthrange') {
          formatstart = '%Y-%M-01 00:00:00';
          formatend = '%Y-%M-31 23:59:59';
        }
        value = [
          dateFormat(this.time[0], formatstart),
          dateFormat(this.time[1], formatend)
        ];
        this.time = value;
      } else {
        this.time = TimeDate.getTimeWidthType('today');
        value = this.time;
      }
      // if (this.pickerType == 'week') {
      //   this.time = '';
      // }
      if (this.isCookie) {
        window.sessionStorage.setItem(
          'currentTime',
          JSON.stringify({ type: this.timeType, value })
        );
      }
      /**
       * v-model方法 内部流转，不抛出
       * @property {array} value 返回选中的数据
       */
      this.$emit('input', value);
      return value;
    },
    changeTime() {

      if (this.timeType == '') {
        this.$emit('input', null);
        this.$emit('formchange', this.timeType, null);
        return;
      }
      // console.log('value', value);
      const value = this.refreshTime();
      /**
       *  切换抛出方法
       * @property {string} timeType 切换的类型
       * @property {array} value 切换的值
       */
      this.$emit('formchange', this.timeType, value);
    }
  }
};
</script>
