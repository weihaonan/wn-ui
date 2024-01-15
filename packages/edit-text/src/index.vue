<template>
  <div style="display:flex;align-items: center;" class="el-edit-text">
    <div style="overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;">
      <span v-if="!isEdit">{{ value }} </span>
      <dbsec-input
        v-else
        size="mini"
        v-model="inputValue"
        @blur="inputBlur"
      ></dbsec-input>
      &nbsp;
    </div>
    <div>
      <dbsec-button
        type="text"
        size="mini"
        icon="el-icon-edit"
        v-if="!isEdit"
        v-on:click.stop="editInput(item)"
      ></dbsec-button>
      <dbsec-button
        v-if="isEdit"
        size="mini"
        type="text"
        icon="el-icon-check"
        v-on:click.stop="saveInput(item)"
      ></dbsec-button>
      <dbsec-button
        v-if="isEdit"
        size="mini"
        type="text"
        icon="el-icon-close"
        v-on:click.stop="close(item)"
      ></dbsec-button>
    </div>

  </div>
</template>

<script>
// import {validateInput} from 'element-ui/src/utils/dc-util';

export default {
  name: 'dbsec-edit-text',
  data() {
    return {
      inputValue: '',
      isEdit: false // 是否编辑状态
    };
  },
  props: {
    value: {
      type: String
    }
  },
  watch: {},
  // 方法集合
  methods: {
    // 编辑文本
    editInput() {
      this.isEdit = true;
    },
    inputBlur() {
      this.inputValue = this.inputValue.trim();
    },
    // 保存文本
    saveInput() {
      // if (validateInput(this.inputValue)) {
      this.$emit('saveCb', this.inputValue);
      // } else {
      //   this.$message({
      //     type: 'error',
      //     message: '名称不能包含特殊字符：& < > “ ” ‘ ’ \' / \\ "  '
      //   });
      // }
    },
    // 取消编辑
    close() {
      this.isEdit = false;
    }
  },
  created() {
    this.inputValue = this.value;
  },
  mounted() {

  }
};
</script>
