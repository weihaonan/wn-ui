<template>
  <div class="el-ip-switch">
    <dbsec-input
      class="start-ip"
      v-model="value.start"
      :style="{flex:1}"
      :placeholder="t('dc.form.pleaseInput')+placeholder"
      v-on:input="changeIp"
    >
    <dbsec-button slot="append"
        v-if="!showEndIP"
        v-on:click="toggleShowEndIP">
        <i class="dbsec-icon-qiehuan" style="font-size:14px"></i>
        {{ switchLabel[1] }}
      </dbsec-button>
    </dbsec-input>
    <span v-show="showEndIP">&nbsp;-&nbsp;</span>
    <dbsec-input
      class="end-ip"
      v-show="showEndIP"
      v-model="value.end"
      size="small"
      clearable
      :style="{flex:1.3}"
      :placeholder="t('dc.form.pleaseInput')+placeholder"
      v-on:input="changeIp"
    >
      <dbsec-button slot="append"
          v-if="showEndIP"
          v-on:click="toggleShowEndIP">
          <i class="dbsec-icon-qiehuan" style="font-size:14px"></i> 
        {{ switchLabel[0] }}
      </dbsec-button>
    </dbsec-input>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import Locale from 'element-ui/src/mixins/locale';

export default {
  name: 'dbsec-ip-switch',
  mixins: [Locale],
  props: {
    value: {
      type: Object,
      default() {
        return {
          start: '',
          end: ''
        };
      }
    },
    intervalShow: {
      type: Boolean,
      default: false
    },
    switchLabel: {
      type: Array,
      default: ['IP', 'IP段']
    }
  },
  data() {
    return {
      // value: {
      //   start: '',
      //   end: '',
      // },
      // showEndIP: false,
      changeIp: debounce(() => {
        this.changeInput(true);
      }, 800)
    };
  },
  computed: {
    showEndIP() {
      return this.intervalShow;
    },
    placeholder() {
      if (this.intervalShow) {
        return this.switchLabel[1];
      } else {
        return this.switchLabel[0];
      }
    }
  },
  watch: {},
  // 方法集合
  methods: {
    /**
     * 查询 显示客户端结束ip项
     */
    toggleShowEndIP() {
      this.intervalShow = !this.intervalShow;
      this.value.end = '';
      this.$emit('changeToggle', this.showEndIP);
    },
    changeInput() {
      this.$emit('changeInput', this.value);
    }
  },
  created() {
  },
  mounted() {

  }
};
</script>

