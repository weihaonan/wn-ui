<template>
    <el-select
      ref="select"
      filterable 
      :popperClass="popperClass"
      :multipleLimit="multipleLimit"
      :clearable='clearable'
      :multiple="multiple"
      :collapse-tags="true"
      :disabled="disabled"
      :size="computedSize"
      :placeholder="placeholder"
      v-model="model"
      v-on="$listeners"
      v-bind='$attrs'>
      <el-option
        v-for="opt in computedOptions"
        :key="opt.value"
        :label="opt.label"
        :value="opt.value"
        :disabled="opt.disabled">
        <slot :param="opt"></slot>
      </el-option>
      <slot name='prefix' slot='prefix'></slot>
      <slot></slot>
    </el-select>
</template>

<script>
import ElSelect from 'element-ui/packages/select';
import ElOption from 'element-ui/packages/option';
export default {
  name: 'dbsec-select',
  components: {
    ElSelect,
    ElOption
  },
  props: {
    /** 绑定值 */
    value: {
    },
    type: { // checkbox类型
      type: String,
      default: 'origin'
    },
    /** 多选框的配置项 */
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    popperClass: String,
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String
    }
  },
  computed: {
    computedOptions() {
      return this.options.filter(item=> !item.hide);
    },
    computedSize() {
      if (this.size == 'mini') {
        return 'mini';
      }
      return 'small';
    },
    model: {
      get() {
        return this.value;
      },
      set(val) {
        // this.$emit('input', val); v-on='$listener'会触发input事件
      }
    }
  },
  methods: {
    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
    }
  }
};
</script>
