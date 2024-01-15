<template>
  <div class="el-divide-panel">
    <div class="el-divide-panel-header" v-if="title || $slots.title || $slots.extra">
      <div class="title">
        <slot name="title">
          <strong class="el-divide-panel__title" v-html="title"></strong>
        </slot>
      </div>
     
      <div class="el-divide-panel__extra">
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
    <div class="el-divide-panel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {sortBy} from 'lodash';
export default {
  name: 'dbsec-divide-panel',
  props: {
    title: {
      type: String,
      default: '这里是标题'
    },
    extraBtn: {
      type: Array,
      default() {
        return [];
      }
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
