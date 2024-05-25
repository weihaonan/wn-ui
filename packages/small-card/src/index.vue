<template>
  <div 
    class="el-small-card is-hover-shadow" 
    :class="type=='large'?'el-small-card--'+type:''" >
    <div class="el-small-card-main">
      <div v-if="$slots.aside" 
        class="el-small-card__img"
        :class="type=='large'?'el-small-card__img--'+type:''">
        <slot name="aside"></slot>
      </div>
      <div class="el-small-card__main">
         <div v-if="title || $slots.title" class="title">
          <slot name="title">
            <span v-html="title" class="title-text"></span>
          </slot>
        </div>
        <div class="el-small-card-content">
          <slot></slot>
        </div>
      </div>
      <div class="el-small-card__other" v-if="type=='large'">
        <dbsec-button 
          v-on:click="btnList[0].callback(params)"
          size='mini' 
          type="text">{{ btnList[0].label }}</dbsec-button>
      </div>
    </div>
    <div class="el-small-card__btn" v-if="type!='large'">
      <dbsec-button
        style="flex:1"
        v-for="btn in btnList"
        :key="btn"
        type="text"  
        size="mini"
        v-on:click="btn.callback(params)">
        {{ btn.label }}
      </dbsec-button>
    </div>
  </div>
</template>
<script>
import Locale from 'element-ui/src/mixins/locale';
import ElRow from 'wn-ui/packages/row';
import ElCol from 'wn-ui/packages/col';

export default {
  name: 'dbsec-small-card',
  mixins: [Locale],
  props: {
    title: {
      type: String,
      default: ''
    },
    params: {
      type: Object
    },
    imgSrc: {
      type: String,
      default: ''
    },
    btnList: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String
    }
  },
  methods: {},
  components: {
    ElRow,
    ElCol
  }
};
</script>
