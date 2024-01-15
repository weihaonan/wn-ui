<template>
  <div>
  <!-- :accept="accept" 与拖拽提示不可并存 -->
  <el-upload
    ref="upload"
    class="el-dcUpload"
    drag
    :before-upload="beforeUpload"
    :show-file-list="showFileList"
    :limit="limit"
    :multiple="multiple"
    list-type="text"
    :accept="accept"
    :action="action"
    :auto-upload="autoUpload"
    :on-change="computedChange"
    :on-remove="onRemove"
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
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    beforeUpload: {
      type: Function,
      default(file) {
        return this.beforeUploadDefault(file);
      }
    },
    onExceed: {
      type: Function,
      default() {
        return this.onExceedDefault();
      }
    },
    onChange: {
      type: Function,
      default() {

      }
    },
    onRemove: {
      type: Function
    },
    limit: {
      type: Number
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
    showFileList() {
      return this.multiple;
    },
    showClearBtn() {
      return this.file && this.hovering && !this.multiple;
    }
  },
  methods: {
    // 处理后的onchange函数
    computedChange(file, fileList) {
      if (this.beforeUploadDefault(file)) {
        this.file = file;
        this.fileList = fileList;
        this.onChange(file, fileList);
      }

    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
    abort() {
      this.$refs.upload.abort();
    },
    submit() {
      // if (this.fileList[0]) {
      //   this.fileList[0].status = 'ready';
      // }
      this.$refs.upload.submit();
    },
    // 当只接收一个文件时，删除此文件
    removeSingleFile() {
      this.clearFiles();
      if (this.onRemove) {
        this.onRemove(this.file, []);
      }
      this.file = '';
      this.fileList = [];
    },
    // 上传文件前校验
    beforeUploadDefault(file) {
      debugger;
      console.log('file----', file);
      const suffixArray = file.name.split('.');
      const suffix = suffixArray[suffixArray.length - 1];
      if (this.accept && !this.accept.includes(suffix)) {
        this.$message.error(`${this.t('dc.upload.onlyUpload')}${this.accept}${this.t('dc.upload.file')}`);
        return false;
      }
      return true;
    },
    onExceedDefault() {
      this.$message.error(`${this.t('dc.upload.maxUpload')}${this.limit}${this.t('dc.upload.file')}`);
    },
    onSuccess(res) {
      debugger;
      if (res.success) {
        this.$message.success(
          this.t('dc.upload.uploadAction') + this.t('dc.upload.success')
        );
        this.$emit('success');
        this.close();
      } else {
        this.$emit('uploadFail', res.message);
        this.$message.error(res.message);
      }
    },
    onError() {
      this.$message.error(
        this.t('dc.upload.uploadAction') + this.t('dc.upload.fail')
      );
    }
  }
};
</script>
