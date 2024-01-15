<template>
  <el-input-number 
    v-if="type=='number'"
    :min="minNumber" 
    :max="maxNumber"
    :size="computedSize"
    :disabled="disabled"
    v-model="model"
    v-on="$listeners"
    >
  </el-input-number>
  <el-input
    v-else
    :disabled="disabled"
    v-model="model"
    :size="computedSize"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
    :show-word-limit="showWordLimit"
    :maxlength="maxlength"
    clearable>
        <template slot="prefix">
          <slot name="prefix"></slot>
        </template>
      <template slot="prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append">
        <slot name="append"></slot>
      </template>
    </el-input>
</template>

<script>
import Locale from 'element-ui/src/mixins/locale';
import ElInput from 'element-ui/packages/input';
import ElInputNumber from 'element-ui/packages/input-number';

export default {
  name: 'dbsec-input',
  mixins: [Locale],
  components: {
    ElInput,
    ElInputNumber
  },
  data() {
    return {

    };
  },
  computed: {
    computedSize() {
      if (this.size == 'mini') {
        return 'mini';
      } else if (this.size == 'medium') {
        return '';
      } else {
        return 'small';
      }
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
  props: {
    minNumber: {
      type: Number
    },
    maxNumber: {
      type: Number
    },
    disabled: {
      type: Boolean
    },
    value: {

    },
    clearable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    type: {
      type: String
    },
    'show-word-limit': {
      type: Boolean,
      default() {
        if (this.type == 'textarea') {
          return true;
        } else {
          return false;
        }
      }
    },
    maxlength: {
      type: Number,
      default() {
        if (this.type == 'textarea') {
          return 1024;
        } else {
          return 255;
        }
      }
    }
  },
  // 方法集合
  methods: {

  },
  created() {
  },
  mounted() {
  }
};
</script>