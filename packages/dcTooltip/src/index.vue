<template>
  <el-tooltip
    :popperClass="className"
    :hide-after="hideAfter"
    :placement="placement"
    effect="light"
    :content="title"
    :visible-arrow="visibleArrow"
    :disabled="!title&&showOverflowTooltip"
    :enterable="enterable"
    :open-delay="400">
      <template slot="content" v-if="$slots.content">
        <slot name="content"></slot>
      </template>
      <slot>
        <div :id="id" class="overflow-tooltip"  :style="{maxWidth:maxWidth}" v-if="showOverflowTooltip">
          {{ content||'N/A' }}
        </div>
      </slot>
   </el-tooltip>
</template>

<script>
import ElTooltip from 'dbsec-ui/packages/tooltip';

export default {
  name: 'dbsec-tooltip',
  props: {
    content: {
      type: [String, Number, Boolean, Array]
    },
    maxWidth: {
      type: String
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    popperClass: {
      type: String
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    enterable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    className() {
      if (this.showOverflowTooltip) {
        return 'el-tooltip__poper el-tooltip--overflow ' + (this.popperClass || '');
      }
      return 'el-tooltip__poper ' + (this.popperClass || '');
    },
    // 延迟
    openDelay() {
      if (this.showOverflowTooltip) {
        return 400;
      }
      return 0;
    },
    visibleArrow() {
      if (this.showOverflowTooltip) {
        return false;
      }
      return true;
    }
  },
  components: {
    ElTooltip
  },
  data() {
    return {
      title: '',
      id: Math.random().toString(36).slice(2)
    };
  },
  watch: {
    content() {
      this.getTitle();
    }
  },
  methods: {
    getTitle() {
      setTimeout(() => {
        if (!this.showOverflowTooltip) {
          this.title = this.content;
          return;
        }
        console.log(this.id);
        const el = document.getElementById(this.id);
        if (el) {
          const elComputed = document.defaultView.getComputedStyle(el, '');
          const padding = parseInt(elComputed.paddingLeft.replace('px', ''), 10) +
        parseInt(elComputed.paddingRight.replace('px', ''), 10);

          const range = document.createRange();
          range.setStart(el, 0);
          range.setEnd(el, el.childNodes.length);
          const rangeWidth = range.getBoundingClientRect().width;

          if (
            rangeWidth + padding > el.offsetWidth ||
     el.scrollWidth > el.offsetWidth
          ) {
            this.title = Array.isArray(this.content) ? this.content.join(',') : this.content;
          }
        }

      }, 400);
    }
  },
  mounted() {
    this.getTitle();
  }
};
</script>
