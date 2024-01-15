<template>
  <el-button
    :type="computedType"
    :size="computedSize"
    :disabled="disabled"
    :plain="plain"
    :icon="icon"
    :circle="circle"
    v-on:click="clickBtn"
    >
    <slot></slot>
  </el-button>
</template>
<script>
import ElButton from 'element-ui/packages/button';
export default {
  name: 'dbsec-button',
  components: {
    ElButton
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
    computedSize() {
      if (this.size == 'mini') {
        return 'mini';
      }
      return 'small';
    },
    computedType() {
      if (this.type == 'primary') {
        return 'primary';
      } else if (this.type == 'text') {
        return 'text';
      }
      return '';
    }
  },
  methods: {
    clickBtn(params) {
      this.$emit('click', params);
    }
  }
};
</script>
