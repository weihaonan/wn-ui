<template>
  <el-dialog
    :visible.sync = 'visible'
    :width="width"
    :top="top"
    :title="title"
    :close-on-click-modal="false"
    v-bind="$attrs"
    v-on='$listeners'
  >
    <template slot="title" v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <template v-if="visible">
      <slot></slot>
    </template>
    
    <template slot="footer" >
      <slot name="footer">
        <dbsec-button @click="closeDialog">取 消</dbsec-button>
        <dbsec-button type="primary" @click="confirmDialog">确 定</dbsec-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import ElDialog from 'element-ui/packages/dialog';

export default {
  name: 'dbsec-dialog',
  components: {
    ElDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    title: {
      type: String,
      default: ''
    }

  },
  computed: {
    // visibleShow(){
    //   return this.
    // }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false);
    },
    confirmDialog() {
      this.$emit('confirm');
    }
  }
};
</script>
