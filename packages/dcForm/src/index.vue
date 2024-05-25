<template>
  <div class="el-dcForm">
    <el-form
      :model="newForm"
      ref="validateForm"
      class="el-form-new"
      v-bind="formBind($attrs)"
      v-on="$listeners"
    >
      <!-- 为了解决默认读取页面账户密码的问题(START) -->
      <dbsec-input class="zc_display" type="text" />
      <dbsec-input class="zc_display" type="password" readonly />
      <!-- 为了解决默认读取页面账户密码的问题(END) -->
      <template v-for="(item, index) in computeFormItems">
        <!-- el-form-item前 -->
        <slot
          :name="item.beforeItem"
          v-if="item.beforeItem"
          :item="item"
        ></slot>
        <!-- el-form-item前 -->
        <el-form-item :key="item.param" v-bind="formItemBind(item)">
          <template slot="label" v-if="item.fixLabel">
            <!-- @slot 自定义label -->
            <slot name="label" :item="item" :index="index"> </slot>
          </template>
          <slot :name="item.startbtn" v-if="item.startbtn" :item="item"></slot>
          <!-- 前缀：文字提示 -->
          <span style="padding: 0 10px 0 0" v-if="item.before">
            {{ item.before }}
          </span>
          <template v-if="item.readonly">
            <template v-if="isFunction(item.readonly)">
              {{ item.readonly(newForm[item.param]) }}
            </template>
            <template v-else>
              {{ newForm[item.param] }}
            </template>
          </template>
          <template v-else>
            <!-- 输入框 -->
            <template v-if="item.formType == 'input'">
              <dbsec-input
                v-model="newForm[item.param]"
                :style="[inputCommonStyle, item.style]"
                :class="
                  item.prefixName && !isEmpty(newForm[item.param])
                    ? prefixClass(item.prefixName)
                    : ''
                "
                auto-complete="new-password"
                v-focus="item.focus"
                v-bind="formParamBind(item)"
                @input="formChange(newForm, item)"
                @blur="blurInput($event,newForm, item)"
              >
                <!-- {{item.prepend}} -->
                <template
                  slot="prefix"
                  v-if="item.prefixName && !isEmpty(newForm[item.param])"
                >
                  {{ item.prefixName }}
                </template>
                <template slot="prepend" v-if="item.prepend">
                  <slot :name="item.prepend" v-if="item.prepend"></slot>
                </template>
                <template slot="append" v-if="item.append">
                  <slot :name="item.append" v-if="item.append"></slot>
                </template>
              </dbsec-input>
              <span
                class="textGray"
                style="padding-left: 5px"
                v-if="item.endtip"
              >
                * {{ item.endtip }}
              </span>
            </template>
            <!-- 选择框 -->
            <template v-if="item.formType == 'select'">
              <dbsec-select
                :ref="item.param + 'select'"
                :options='getNewArray(item)'
                v-model="newForm[item.param]"
                :class="
                  item.prefixName && !isEmpty(newForm[item.param])
                    ? prefixClass(item.prefixName)
                    : ''
                "
                v-bind="formParamBind(item)"
                :filter-method="(value) => filterMethod(value, item)"
                @change="formChange(newForm, item)"
                @visible-change="visibleChange($event,item)"
                @input.native="formInput(item)"
                @focus="item.firstOpen = true"
              >
                <!-- <el-option
                  v-for="a in getNewArray(item)"
                  :key="a.value"
                  :label="a.label"
                  :value="a.value"
                ></el-option> -->
                <template
                  slot="prefix"
                  v-if="item.prefixName && !isEmpty(newForm[item.param])"
                >
                  {{ item.prefixName }}
                </template>
                <div v-if="item.isShowPagination" style="height: 35px">
                  <Pagination
                    class="selectPagination"
                    layout="total,prev, pager, next"
                    :background="false"
                    v-model="item.page"
                  ></Pagination>
                </div>
              </dbsec-select>
              <span
                class="textGray"
                style="padding-left: 5px"
                v-if="item.endtip"
              >
                * {{ item.endtip }}
              </span>
            </template>
            <!-- 单选，按钮型 -->
            <template v-if="item.formType == 'radio'">
              <el-radio-group
                v-model="newForm[item.param]"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              >
                <template v-if="item.isGroup">
                  <el-radio-button
                    v-for="a in (item.array || item.options)"
                    :key="a.key"
                    :label="a.value"
                    v-bind="a"
                  >
                    {{ a.label }}
                    <el-tooltip
                      class="item"
                      effect="dark"
                      placement="top-start"
                      v-if="a.tip"
                    >
                      <div
                        slot="content"
                        style="max-width: 240px; line-height: 20px"
                      >
                        {{ a.tip }}
                      </div>
                      <i
                        class="iconfont icon-help"
                        style="position: relative; left: 3px"
                      ></i>
                    </el-tooltip>
                  </el-radio-button>
                  <span
                    class="textGray"
                    style="padding-left: 5px"
                    v-if="item.endtip"
                  >
                    * {{ item.endtip }}
                  </span>
                </template>
                <template v-else>
                  <el-radio
                    v-for="a in (item.array||item.options)"
                    :key="a.key"
                    :label="a.value"
                    v-bind="a"
                    >{{ a.label }}
                    <el-tooltip
                      class="item"
                      effect="dark"
                      placement="top-start"
                      v-if="a.tip"
                    >
                      <div
                        slot="content"
                        style="max-width: 240px; line-height: 20px"
                      >
                        {{ a.tip }}
                      </div>
                      <i
                        class="iconfont icon-help"
                        style="position: relative; left: 3px"
                      ></i>
                    </el-tooltip>
                  </el-radio>
                </template>
                <span
                  class="textGray"
                  style="padding-left: 5px"
                  v-if="item.endtip"
                >
                  * {{ item.endtip }}
                </span>
              </el-radio-group>
            </template>
            <!-- 多选，按钮型 -->
            <template v-if="item.formType == 'checkbox'">
                <dbsec-checkbox-group
                  v-model="newForm[item.param]"
                  v-bind="formParamBind(item)"
                  @change="formChange(newForm, item)">
                  <dbsec-checkbox 
                      v-for="a in (item.array||item.options)"
                      :key="a.value"
                      :label="a.value"
                      v-bind="a"
                  >{{ a.label }}
                    <dbsec-tooltip
                      class="item"
                      effect="dark"
                      placement="top-start"
                      v-if="a.tip"
                    >
                      <div
                        slot="content"
                        style="max-width: 240px; line-height: 20px"
                      >
                        {{ a.tip }}
                      </div>
                      <i
                        class="iconfont icon-help"
                        style="position: relative; left: 3px"
                      ></i>
                    </dbsec-tooltip>
                  </dbsec-checkbox>
              </dbsec-checkbox-group>
            </template>
            <!-- 日期 -->
            <template v-if="item.formType == 'date-picker'">
              <el-date-picker
                v-model="model[item.param]"
                align="left"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              ></el-date-picker>
            </template>
            <!-- 时间选择 -->
            <template v-if="item.formType == 'time-picker'">
              <el-time-picker
                v-model="model[item.param]"
                align="left"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              ></el-time-picker>
            </template>
            <!-- 分组选择器 -->
            <!-- <template v-if="item.formType == 'select-group'">
              <el-select
                v-model="form[item.param]"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              >
                <el-option-group
                  v-for="(group, groupindex) in item.array"
                  :key="groupindex"
                  :label="group.label"
                  v-bind="group"
                >
                  <el-option
                    v-for="a in group.options"
                    :key="a.value"
                    v-bind="a"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </template> -->
            <!-- 多级选择器 -->
            <template v-if="item.formType == 'cascader'">
              <el-cascader
                v-model="model[item.param]"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              ></el-cascader>
            </template>
            <!-- 分页下拉框 -->
            <template v-if="item.formType == 'pageselect'">
              <dbsec-page-select
                :style="[inputCommonStyle, item.style]"
                ref="pageselect"
                :refKey="item.param"
                :option="item"
                v-model="model"
                dbsec
                :inputPageWidth="inputCommonStyle"
                @change="formChange(newForm, item)"
              >
              </dbsec-page-select>
            </template>
            <!-- Switch开关 -->
            <template v-if="item.formType == 'switch'">
              <dbsec-switch
                v-model="newForm[item.param]"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
              ></dbsec-switch>
            </template>
            <!-- 计数器 -->
            <template v-if="item.formType == 'input-number'">
              <dbsec-input
                type="number"
                :maxNumber="item.maxNumber"
                :minNumber="item.minNumber"
                v-model="newForm[item.param]"
                v-bind="formParamBind(item)"
                @change="formChange(newForm, item)"
                style="text-align: left"
              ></dbsec-input>
            </template>
            <!-- 选择+文本 -->
            <template v-if="item.formType == 4">
              <el-select
                v-model="newForm[item.leftparam]"
                :size="size"
                :disabled="item.leftdisabled"
                style="width: 125px; margin-right: 10px"
                @change="formChange(newForm, item)"
              >
                <el-option
                  v-for="a in item.leftarray"
                  :key="a.value"
                  :label="a.label"
                  :value="a.value"
                ></el-option>
              </el-select>
              <dbsec-input
                :placeholder="
                  item.rightplaceholder
                    ? item.rightplaceholder
                    : t('dc.form.pleaseInput') + item.label
                "
                v-model="newForm[item.rightparam]"
                :size="size"
                @input="formChange(newForm, item)"
                @blur="blurInput($event,newForm, item)"
                :maxlength="item.maxlength ? item.maxlength : 255"
                style="width: 445px"
                class="input-with-select"
              ></dbsec-input>
              <span
                class="textGray"
                style="padding-left: 5px"
                v-if="item.endtip"
              >
                * {{ item.endtip }}
              </span>
            </template>
            <!-- 选择+范围输入框 -->
            <template v-if="item.formType == 6">
              <el-select
                :size="size"
                v-model="newForm[item.param][item.leftparam]"
                :disabled="item.disabled"
                :placeholder="t('el.select.placeholder')"
                style="width: 125px; margin-right: 10px"
                @change="formChange(newForm, item)"
                ><el-option
                  v-for="a in item.leftarray"
                  :key="a.value"
                  :label="a.label"
                  :value="a.value"
                ></el-option
              ></el-select>
              <dbsec-input
                :placeholder="
                  item.rightplaceholder ||
                  t('dc.form.pleaseInput') + item.label
                "
                v-model="newForm[item.param][item.rightparam1]"
                @blur="blurInput"
                :size="size"
                @input="formChange(newForm, item)"
                style="width: 445px"
                class="input-with-select"
                :maxlength="item.maxlength ? item.maxlength : 255"
                :class="item.rightparam2show ? 'width2input' : ''"
              ></dbsec-input>
              <template v-if="item.rightparam2show">
                <span style="padding: 0px 10px">-</span>
                <dbsec-input
                  :placeholder="
                    item.rightplaceholder ||
                    t('dc.form.pleaseInput') + item.label
                  "
                  :size="size"
                  v-model="newForm[item.param][item.rightparam2]"
                  @blur="blurInput"
                  @input="formChange(newForm, item)"
                  style="width: 210px"
                  :maxlength="item.maxlength ? item.maxlength : 255"
                  class="input-with-select"
                ></dbsec-input>
              </template>
              <span
                class="textGray"
                style="padding-left: 5px"
                v-if="item.endtip"
              >
                * {{ item.endtip }}
              </span>
            </template>
            <!-- 自定义 -->
            <template v-if="item.formType == 'other'">
              <slot :name="item.param" :form="newForm" :item="item"></slot>
            </template>
          </template>
          <!-- 尾缀：按钮等组件 -->
          <!-- formItems 元素    -->
          <slot :name="item.endbtn" v-if="item.endbtn" :item="item"></slot>
          <!-- 备注：文字提示 -->
          <div v-if="item.remark" class="remarkDiv">
            <i class="el-icon-info" style="margin-right: 5px"></i>
            {{ item.remark }}
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
/*eslint-disable*/
import Vue from 'vue';
import { filter, isArray, isFunction, isUndefined, isEmpty } from 'lodash';
// import pageSelect from './components/pageSelect.vue';
import Pagination from 'wn-ui/packages/dcPagination';
// import Cookies from 'js-cookie';
import ElInput from 'wn-ui/packages/input';
import ElSelect from 'wn-ui/packages/select';
import ElOption from 'wn-ui/packages/option';
import ElRadio from 'wn-ui/packages/radio';
import ElRadioGroup from 'wn-ui/packages/radio-group';
import ElRadioButton from 'wn-ui/packages/radio-button';
import ElSwitch from 'wn-ui/packages/switch';
import ElCheckbox from 'wn-ui/packages/checkbox';
import ElCheckboxGroup from 'wn-ui/packages/checkbox-group';
import ElForm from 'wn-ui/packages/form';
import ElFormItem from 'wn-ui/packages/form-item';
import Locale from 'wn-ui/src/mixins/locale';
/**
 * dedault slot
 * startbtn字段：前缀：按钮等组件
 * endbtn字段：尾缀：按钮等组件
 * prepend字段：dbsec-input 内部  slot="prepend"
 * append字段：dbsec-input 内部 slot="append"
 * param字段：formType == 'other' 时候  自定义表单元素
 */
export default {
  name:'dbsec-form',
  mixins:[Locale],
  props: {
    /** 传递的json  */
    model: {
      type: Object,
      default() {
        return {};
      },
    },
    // -1 自定义 1 输入框 2 单选筛选框 3 按钮式单选
    // 4 选择 + 输入 5 输入多行文本 6 范围开始结束 10日期选择
    /**
     * 配置项：支持el-form-item的所有属性，属性名相同
     * 支持表单元素的所有属性，配置名相同
     * 目前支持的配置项有：
     * formType:
     * 输入框 'input' :dbsec-input //
     * 选择框 'select' :el-select //
     * 单选，按钮型 'radio' :el-radio-group //
     * 多选，按钮型 'checkbox' :el-checkbox-group //
     * 日期 'date-picker' :el-date-picker //
     * 时间选择 'time-picker' :el-time-picker //
     * 多级选择器 'cascader' :el-cascader //
     * 自定义分页下拉框 'pageselect' :pageselect // 
     * 自定义内容 'other' :pageselect // 
     *  
     *@values  // 其余属性 {
          formType:   元素类型, 
          prefixName:仅input与select 有，输入框左侧显示的label文字，若没有，显示label
          ....el-form-item的所有属性,
          ....表单元素的所有属性, 
          }
     */
    formItems: {
      type: Array,
      default() {
        return [];
      },
    },
    /** 元素的宽度  */
    inputWidth: {
      type: String,
      default: '',
    },
    /** 是否使用公司统一样式  */
    dbsec: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      newForm: {a:1},
      computeFormItems: [],
    };
  },
  watch: {
    formItems: {
      deep: true,
      handler() {
        this.initFormItems();
      },
    },
    model: {
      deep: true,
      handler() {
        this.newForm = this.model;
      },
    },
  },
  computed: {
    inputCommonStyle() {
      if (this.dbsec) {
        if (this.inputWidth) {
          return {
            width: this.inputWidth,
          };
        }
        return {
          width: '100%',
        };
      }
      return {
        width: '580px',
      };
    },
  },
  created() {
    this.newForm = this.model;
  },
  mounted() {
    Vue.directive('focus', {
      inserted(el, param) {
        if (param.value) {
          el.querySelector('input').focus();
        }
      },
    });
    this.initFormItems();
  },
  components: {
    Pagination,
    ElCheckbox,
    ElCheckboxGroup,
    ElInput,
    ElSelect,
    ElForm,
    ElFormItem,
    ElOption,
    ElRadioGroup,
    ElRadio,
    ElSwitch,
    ElRadioButton,
    // pageSelect,
  },
  methods: {
    isUndefined,
    isFunction,
    isEmpty,
    // form 属性
    formBind(item) {
      return {
        ...item,
        'label-width': item['label-width'] || item.labelwidth || '160px',
      };
    },
    //formItem属性
    formItemBind(item) {
      return {
        prop: item.prop || item.param,
        label: item.label,
        rules: item.rules,
        required: item.required,
        class: item.showclassName || item.class,
        'label-width': item['label-width'] || item.labelWidth,
        error: item.error,
        'show-message': item['show-message'] || item.showMessage,
        'inline-message': item['inline-message'] || item.inlineMessage,
      };
    },
    /**
     * form表单绑定属性
     */
    formParamBind(item) {
      let otherJson = {};
      let placeholder = '';
      let startplaceholder = '';
      let endplaceholder = '';
      let style = item.style;
      let type, maxlength;
      let format;
      if (item.formType == 'input') {
        placeholder = this.t('dc.form.pleaseInput') + item.label;
        if (item.type != 'textarea') {
          maxlength = 255;
        } else {
          style = { ...style, 'margin-bottom': '5px', 'margin-top': '5px' };
        }
      }
      if (['select', 'select-group', 'cascader'].includes(item.formType)) {
        placeholder = this.t('el.select.placeholder') + item.label;
      }
      if (item.formType == 'date-picker') {
        format = 'yyyy-MM-dd';
        if (item.type == 'datetime') {
          placeholder =
            this.t('el.select.placeholder') +
            this.t('dc.form.date') +
            this.t('dc.form.time');
          format = 'yyyy-MM-dd HH:mm';
        }
        if (item.type == 'date') {
          placeholder =
          this.t('el.select.placeholder') +
          this.t('dc.form.date');
        }
        if (item.type == 'datetimerange') {
          format = 'yyyy-MM-dd HH:mm:ss';
        }
        if (item.type.indexOf('range') != '-1') {
          startplaceholder = item['start-placeholder'] || '开始日期';
          endplaceholder = item['end-placeholder'] || '结束日期';
        }
      }
      if (item.formType == 'time-picker') {
        placeholder =
        this.t('el.select.placeholder') +
          this.t('dc.form.time');
        format = 'HH:mm:ss';
      }
      if (item.formType == 'radio' || item.formType == 'checkbox') {
        style = { ...style, width: 'auto' };
      }

      return {
        ...item,
        size: this.size=='mini' ? 'mini' : 'small',
        style: [this.inputCommonStyle, style],
        'show-password': item['show-password'] || item.showpassword,
        clearable: isUndefined(item.clearable) ? true : item.clearable,
        maxlength: item.maxlength || maxlength,
        placeholder: item.placeholder || placeholder,
        type: item.type || type,
        rows: item.rows || 5,
        'show-word-limit': item['show-word-limit'] || item.showWordLimit,
        'multiple-limit': item['multiple-limit'] || item.multiplelimit,
        'collapse-tags': item['collapse-tags'] || item.collapsetags,
        'allow-create': item['allow-create'] || item.create,
        format: item.format || format,
        'value-format': item['value-format'] || item.format || format,
        'picker-options': item['picker-options'] || item.pickerOptions,
        'popper-class': item['popper-class'] || item.popperClass,
        'active-text': item['active-text'] || item.activeText,
        'inactive-text': item['inactive-text'] || item.inactiveText,
        'active-value': item['active-value'] || item.activeValue,
        'inactive-value': item['inactive-value'] || item.inactiveValue,
        'start-placeholder': startplaceholder || undefined,
        'end-placeholder': endplaceholder || undefined,
      };
    },
    blurInput(event,form,item) {
      let { type } = event.target.attributes;
      if (!type.value.includes('password')) {
        event.target.value = event.target.value.trim();
        form[item.param] = event.target.value.trim();
      }
      this.$emit('blurInput', form, item);
    },
    // select 数量多的时候分页
    filterMethod(value, item) {
      item.filterValue = value;
      item.page.offset = 1;
    },
    visibleChange(type,item){
        item.filterValue = ''
    },
    getNewArray(item) {
       const options = item.array || item.options;
        if (!item.firstOpen && isArray(this.newForm[item.param])) {
          return options.filter((a) =>
            this.newForm[item.param].includes(a.value)
          );
        }
        const newData = options.filter(
          (a) => String(a.label).indexOf(item.filterValue) !== -1
        );
        item.page.total = newData.length;
        return newData
        // return commonVue.getPagination({
        //   p: item.page.offset,
        //   ps: item.page.pageSize,
        //   data: newData,
        // });
    },
    // select 数量多的时候分页
    initFormItems() {
      // this.computeFormItems = filter(this.formItems, 'show').map((a) => {
      this.computeFormItems = filter(this.formItems, (form)=>{
        return !form.hide
      }).map((a) => { // TODO
        let newA = a;
        const options = a.array||a.options;
        if (a.formType == 'select') {
          newA = {
            ...newA,
            isShowPagination: a.showPage && optionslength>20,
            filterable: true,
            filterValue: '',
            firstOpen: false,
            page: {
              offset: 1,
              pageSize: 20,
              total: options.length,
            },
          };
        }
        return newA;
      });
    },
    validateForm() {
      // 整体校验
      return new Promise((reslove, reject) => {
        this.$refs.validateForm.validate((valid) => {
          if (valid) {
            reslove();
          } else {
            reject();
          }
        });
      });
    },
    validateFormParam(param, callback) {
      // 单个字段校验
      this.$refs.validateForm.validateField(param, callback);
    },
    validate(callback){
      this.$refs.validateForm.validate((valid) => {
        if(valid){
          callback(valid);
        } else {
          callback(false);
        }
      })
    },
    resetValidateForm() {
      // 清空表单和校验
      this.$refs.validateForm.resetFields();
    },
    resetFields() {
      // 清空表单和校验
      this.$refs.validateForm.resetFields();
    },
    clearValidateForm() {
      // 清楚校验
      this.$refs.validateForm.clearValidate();
    },
    clearValidate(params) {
      // 清楚校验
      this.$refs.validateForm.clearValidate(params);
    },
    formInput(form) {
      // 可属可选控件
      if (form.inputNumber) {
        // eslint-disable-next-line no-unused-vars
        const str = this.$refs[`${form.param}select`][0].$data.query;
        this.$refs[`${form.param}select`][0].$data.query = str.replace(
          /\D/g,
          ''
        );
      }
    },
    formChange(form, item) {
      console.log(form)
      // 判断是否为数字
      if (item.isNumber) {
        item.isNumber.forEach((newa) => {
          if (item[newa] && form[item[newa]]) {
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(form[item[newa]])) {
              // eslint-disable-next-line no-param-reassign
              form[item[newa]] = '';
            } else {
              // eslint-disable-next-line no-param-reassign
              form[item[newa]] = Number(form[item[newa]]) || '';
            }
          } else if (
            item[newa] &&
            form[item.param] &&
            form[item.param][item[newa]]
          ) {
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(form[item.param][item[newa]])) {
              // eslint-disable-next-line no-param-reassign
              form[item.param][item[newa]] = '';
            } else {
              // eslint-disable-next-line no-param-reassign
              form[item.param][item[newa]] =
                Number(form[item.param][item[newa]]) || '';
            }
          }
        });
      }
      // 判断是否为数字
      /**
       * 抛出元素变化时候的数据以及对应的配置项
       * @property {Object} form 当前得到的json内容
       * @property {Object} item 当前变化元素的配置项
       */
      this.$emit('formchange', form, item);
    },
    prefixClass(prefixName) {
      const prefixLength = prefixName.length;
      const currentLang = false; //TODO
      if (!currentLang) {
        switch (prefixLength) {
          case 2:
            return 'prefixLength2';
          case 3:
            return 'prefixLength3';
          case 4:
            return 'prefixLength4';
          case 5:
            return 'prefixLength5';
          default:
            return 'prefixLength';
        }
      } else {
        switch (prefixLength) {
          case 4:
            return 'prefixUSLength4';
          case 5:
            return 'prefixUSLength5';
          case 6:
            return 'prefixUSLength6';
          case 7:
            return 'prefixUSLength7';
          case 8:
            return 'prefixUSLength8';
          case 9:
            return 'prefixUSLength9';
          case 10:
            return 'prefixUSLength10';
          case 11:
            return 'prefixUSLength11';
          default:
            return 'prefixLength2';
        }
      }
    },
  },
};
</script>
<style lang="scss">

</style>
<style lang="less" scoped>

</style>
