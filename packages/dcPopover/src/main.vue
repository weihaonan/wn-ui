<template>
  <el-popover 
    ref="popover"
    v-model="showPopper" :title="title" v-bind="$attrs" v-on="$listeners">
    <div v-if="popconfirm" style="display: flex; align-items: center">
      <i
        class="el-popconfirm__icon el-icon-question"
        :style="{ color: iconColor }"
      ></i>
      <slot></slot>
    </div>
    <div style="text-align: right; margin: 0" v-if="popconfirm">
      <dbsec-button size="mini" type="text" @click="cancel">取消</dbsec-button>
      <dbsec-button type="primary" size="mini" @click="confirm"
        >确定</dbsec-button>
    </div>

    <slot v-if="!popconfirm"></slot>

    <slot name="reference" slot="reference"></slot>
  </el-popover>
</template>

<script>
import ElPopover from 'element-ui/packages/popover';

export default {
  name: 'dbsec-popover',
  components: {
    ElPopover
  },
  data() {
    return {
      // value: false,
      showPopper: false,
      iconColor: '#f90'
    };
  },
  props: {
    popconfirm: {
      type: Boolean,
      default: false
    },
    title: {},
    value: {}
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    }
  },
  // 方法集合
  methods: {
    confirm() {
      this.$emit('input', false);
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('input', false);
      this.$emit('cancel');
    },
    doClose() {
      this.$refs.popover.doClose();
    }
  },
  created() {},
  mounted() {}
};
</script>

<style>
</style>