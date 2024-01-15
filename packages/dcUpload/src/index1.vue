<template>
  <div>
    {{ file }}------------{{ fileList }}
  <!-- :accept="accept" 与拖拽提示不可并存 -->
  <el-upload
    ref="upload"
    class="el-dcUpload"
    drag
    :auto-uploap="false"
    :on-success="onSuccess"
    :on-error="onError"
    :action="actionUrl"
    :show-file-list="showFileList"
    :on-exceed="onExceed"
    :on-change="onchange"
    :auto-upload="false"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :data='data'
    @mouseenter.native="hovering = true"
    @mouseleave.native="hovering = false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="file != '' && !multiple">
      <i class="el-icon-document uploadicon"></i>
      <div class="el-upload__text">
        <em>{{ file.name }}</em>
      </div>
    </template>
    <template v-else>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        {{ t("dc.upload.pleaseDragFile") }}，{{ t("dc.upload.or") }}
        <em>{{ t("dc.upload.clickUpload") }}</em>
      </div>
    </template>
    <i class="clear-btn el-icon-circle-close "
      v-show="showClearBtn"
      v-on:click.stop="removeSingleFile"></i>
    <div slot="tip">
      <slot name="tip"></slot>
    </div>
  </el-upload>
</div>
</template>

<script>
import Locale from '../../../src/mixins/locale';
import ElUpload from 'element-ui/packages/upload';
export default {
  name: 'dbsec-upload',
  mixins: [Locale],
  components: {ElUpload},
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      // default: 'gz',
      default: ''
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
    limitFile: {
      type: Number,
      default: 1
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    download: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    beforeUpload: {
      type: Function,
      default(file) {
        return this.beforeUploadDefault(file);
      }
    }
  },
  data() {
    return {
      file: '',
      fileList: [],
      hovering: false
    };
  },
  computed: {
    actionUrl() {
      return this.action;
    },
    showClearBtn() {
      return this.file && this.hovering && !this.multiple;
    }
  },
  methods: {
    submit() {
      debugger;
      if (this.fileList[0]) {
        this.fileList[0].status = 'ready';
      }
      this.$refs.upload.submit();
    },
    // 单个文件时 删除选择文件
    removeSingleFile() {
      this.close();
      this.setOneFile('');
    },
    open() {
      this.$refs.dialog.open();
    },
    close() {
      setTimeout(() => {
        this.$refs.upload.clearFiles();
        this.file = '';
        this.fileList = [];
      }, 200);
    },
    // 上传文件前校验
    beforeUploadDefault(file) {
      console.log('file----', file);
      const suffixArray = file.name.split('.');
      const suffix = suffixArray[suffixArray.length - 1];
      if (this.accept && !this.accept.includes(suffix)) {
        this.$message.error(`${this.t('dc.upload.onlyUpload')}${this.accept}${this.t('dc.upload.file')}`);
        return false;
      }
      return true;
    },
    onchange(file, fileList) {
      debugger;
      console.log(file, fileList);
      if (this.beforeUpload(file)) {
        this.file = file;
        this.fileList = fileList;
        this.$emit('change', file, fileList);
        // this.setOneFile(file);
        // this.setMoreFile(fileList);
      }
    },
    handleRemove(file, fileList) {
      this.$emit('handleRemove', file);
      this.setMoreFile(fileList);
    },
    setOneFile(file) {
      // 单文件
      this.file = file;
      this.$emit('change', [file]);
    },
    setMoreFile(fileList) {
      this.fileList = fileList;
      this.$emit('change', fileList);
    },
    onExceed() {
      this.$msg.error(`${this.t('dc.upload.maxUpload')}${this.limitFile}${this.t('dc.upload.file')}`);
    },
    onSuccess(res) {
      debugger;
      if (res.success) {
        this.$msg.success(
          this.t('dc.upload.uploadAction') + this.t('dc.upload.success')
        );
        this.$emit('success');
        this.close();
      } else {
        this.$emit('uploadFail', res.message);
        this.$msg.error(res.message);
      }
    },
    onError() {
      this.$msg.error(
        this.t('dc.upload.uploadAction') + this.t('dc.upload.fail')
      );
    }
  }
};
</script>
