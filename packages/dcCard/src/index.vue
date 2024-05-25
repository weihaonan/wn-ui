<template>
   <!-- :class="{ 'el-dcCard--full': full, 'el-dcCard--border': border,['is-' + shadow + '-shadow']:shadow,'is-always-shadow':!shadow }" -->
  <div
    class="el-dcCard"
    :class="{ 'el-dcCard--full': full, 'el-dcCard--border': border}"
  >
    <div v-if="title || $slots.title || $slots.extra" class="el-dcCard-header">
      <slot name="title">
        <strong class="el-dcCard__title" v-html="title"></strong>
      </slot>
      <div class="el-dcCard__extra">
        <slot name="extra">
          <dbsec-button 
            v-for="btn in btnList"
            :key="btn"
            size="mini" 
            :type="btn.type"
            v-on:click="clickBtn(btn)">{{ btn.label }}</dbsec-button>
        </slot>
      </div>
    </div>
    <div :class="title ? 'el-dcCard-content' : 'el-dcCard-content-all'">
      <slot>
        <el-empty description="暂无数据"></el-empty>
      </slot>
    </div>
  </div>
</template>

<script>
import ElEmpty from 'wn-ui/packages/empty';
import {sortBy} from 'lodash';
export default {
  name: 'dbsec-card',
  components: {
    ElEmpty
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    },
    full: {
      type: Boolean,
      default: false
    },
    extraBtn: {
      type: Array,
      default() {
        return [];
      }
    },
    shadow: {
      type: String
    }
  },
  computed: {
    // 按照primary排序
    btnList() {
      return sortBy(this.extraBtn, (btn)=>{
        return btn.type;
      }).reverse();
    }
  },
  methods: {
    clickBtn(item) {
      if (item.callback) {
        item.callback();
      } else {
        console.error('callback为空');
      }

    }
  }
};
</script>
