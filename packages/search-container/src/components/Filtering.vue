<template>
  <div class="filtering">
    <dbsec-form
      class="formNoLabel filtering-content-show"
      :class="{ nomoreOptions: !moreOptions.length }"
      ref="form"
      inline
      :inputWidth="inputWidth"
      style=""
      :model="formObj"
      :formItems="showOptions"
      labelwidth="0"
      @formchange="formchange"
      size="small"
    >
      <template
        :slot="form.beforeItem"
        v-for="form in moreOptions"
        slot-scope="{ item }"
      >
        <slot :name="form.beforeItem" :item="item"></slot>
      </template>
      <template
        :slot="form.param"
        v-for="form in showOptions"
      >
        <slot :name="form.param"></slot>
      </template>
      <template
        :slot="form.append"
        v-for="form in showOptions"
        slot-scope="{ item }"
      >
        <slot :name="form.append" :item="item"></slot>
      </template>
      <template
        :slot="form.prepend"
        v-for="form in showOptions"
        slot-scope="{ item }"
      >
        <slot :name="form.prepend" :item="item"></slot>
      </template>
      <template
        :slot="form.prefix"
        v-for="form in showOptions"
        slot-scope="{ item }"
      >
        <slot :name="form.prefix" :item="item"></slot>
      </template>
    </dbsec-form>
    <div class="droppopover" v-if="moreOptions.length">
      <dbsec-popover
        popper-class="el-filter--nopadding"
        placement="bottom-start"
        :value="visible"
        trigger="click"
        @show="visible = true"
        @after-leave="closeSeachfilter"
        ref="moreForm"
      >
        <div class="dropdowndiv">
          <dbsec-form
            class="formDrop"
            v-if="visible"
            ref="form"
            style=""
            :model="formObj"
            :formItems="moreOptions"
            :labelwidth="getLabelWidth"
            @formchange="formchange"
            dbsec
            inputWidth="290px"
            size="small"
            v-on="$listeners"
            v-bind="$attrs"
          >
            <template
              :slot="form.param"
              v-for="form in moreOptions"
              slot-scope="{ item }"
            >
              <slot :name="form.param" :item="item"></slot>
            </template>
            <template
              :slot="form.append"
              v-for="form in moreOptions"
              slot-scope="{ item }"
            >
              <slot :name="form.append" :item="item"></slot>
            </template>
            <template
              :slot="form.prepend"
              v-for="form in moreOptions"
              slot-scope="{ item }"
            >
              <slot :name="form.prepend" :item="item"></slot>
            </template>
          </dbsec-form>
          <div class="footer">
            <dbsec-button size="mini" @click="closeSeachfilter">
              {{ t('dc.form.cancel') }}
            </dbsec-button>
            <dbsec-button type="primary" size="mini" @click="submitSeachfilter">
              {{ t('dc.form.search') }}
            </dbsec-button>
          </div>
        </div>
        <dbsec-button slot="reference" size="mini" style="height: 32px">
          {{ t('dc.form.moreConditions')
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </dbsec-button>
      </dbsec-popover>
    </div>
    <!-- <div class="droppopover">
      <dbsec-button size="mini" @click="refresh" style="height: 32px">
        {{ nt("publicCommon_action_label_refresh") }}
      </dbsec-button>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable*/
import { debounce, isNumber, isArray, isObject } from 'lodash'
import DcForm from 'dbsec-ui/packages/dcForm';
import Locale from 'dbsec-ui/src/mixins/locale';
import ElPopover from 'element-ui/packages/popover';
import DcButton from 'dbsec-ui/packages/dcButton';

export default {
  mixins:[Locale],
  components: {
    DcForm,
    ElPopover,
    DcButton,
  },
  props: {
    formObj: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    filterShowSeach: {
      type: [Number, String],
      default: 2
    },
    labelWidth: {
      type: [Number, String],
      default: 80
    },
    inputWidth: {
      type: [Number, String],
      default: '200px'
    }
  },
  data() {
    return {
      visible: false,
      loaded: true,
      seachloaded: true,
      allOptions: [],
      newForm: {},
      debounceChange: debounce((item) => {
        this.$emit('formchange', this.newForm, item)
      }, 300)
    }
  },
  watch: {
    options(val) {
      this.setAllOptions(val)
    },
    formObj: {
      handler(newNamw) {
        this.initRealTime(newNamw)
      },
      deep: true
    }
  },
  computed: {
    getLabelWidth() {
      if (isNumber(this.labelWidth)) {
        return `${this.labelWidth}px`
      }
      return this.labelWidth
    },
    filterOptions() {
      return this.allOptions
    },
    showOptions() {
      const showOptions = this.allOptions.filter((a) => a.showContent)
      return showOptions.map((item) => ({
        ...item,
        prefixName: item.prefixName || item.label
      }))
    },
    moreOptions() {
      const moreOptions = this.allOptions.filter((a) => !a.showContent)
      return moreOptions.map((item) => ({
        ...item
        // prefixName: item.prefixName || item.label,
      }))
    }
  },
  mounted() {
    this.setAllOptions(this.options)
    this.newForm = JSON.parse(JSON.stringify(this.formObj))
  },
  methods: {
    setAllOptions(val) {
      const filterShowSeach = Number(this.filterShowSeach)
      this.allOptions = val.map((a, aindex) => ({
        ...a,
        showContent:
          this.options.length <= filterShowSeach + 1 ||
          aindex < filterShowSeach,
        show: true
      }))
    },
    handleClose() {
      this.$nextTick(() => {
        if (this.$refs.moreForm) {
          this.$refs.moreForm.doClose()
        }
      })
    },
    initRealTime(newNamw) {
      Object.keys(newNamw).forEach((param) => {
        const obj = this.showOptions.find(
          (a) => a.param == param || a.paramKey == param
        )
        const objArray = this.showOptions.find(
          (a) => a.resultArray && a.resultArray.includes(param)
        )
        const newObj = obj || objArray
        if (!this.judgeDifferent(newNamw, param)) {
          this.formchange(newNamw, newObj)
        }
      })
    },
    judgeDifferent(newNamw, param) {
      let newparam = newNamw[param]
      let oldparam = this.newForm[param]
      if (isArray(newparam)) {
        return newparam.join() == (oldparam || []).join()
      } else if (isObject(newparam)) {
        return JSON.stringify(newparam) == JSON.stringify(oldparam)
      }
      return newparam == oldparam
    },
    resetFormObj() {
      let newForm = JSON.parse(JSON.stringify(this.newForm))
      Object.keys(newForm).forEach((key) => {
        this.formObj[key] = newForm[key]
      })
    },
    closeSeachfilter() {
      this.visible = false
      this.resetFormObj()
    },
    submitSeachfilter(noValid) {
      this.visible = false
      this.newForm = JSON.parse(JSON.stringify(this.formObj))
      this.$emit('change')
    },
    initNewForm() {
      const newJson = {}
      let formObj = JSON.parse(JSON.stringify(this.formObj))
      let newForm = JSON.parse(JSON.stringify(this.newForm))
      Object.keys(formObj).forEach((param) => {
        const obj = this.showOptions.find(
          (a) => a.param == param || a.paramKey == param
        )
        const objArray = this.showOptions.find(
          (a) => a.resultArray && a.resultArray.includes(param)
        )
        const newObj = obj || objArray
        if (newObj) {
          newJson[param] = formObj[param]
        }
      })
      this.newForm = {
        ...newForm,
        ...newJson
      }
    },
    refresh() {
      this.closeSeachfilter()
      this.$emit('change')
    },
    formchange(form, item) {
      if (item && item.showContent) {
        this.initNewForm()
        this.$emit('change')
      }
      this.debounceChange(item)
    }
  },
  beforeDestroy() {
    this.handleClose()
  }
}
</script>

