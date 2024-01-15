<template>
  <el-descriptions
    :title="title"
    v-bind='$attrs'
    :border='false'
    direction='horizontal'
    :size='progressSize'>
    <template slot='title'>
      <slot name='title'></slot>
    </template>
    <template slot='extra' v-if='btnList && btnList.length>0'>
      <dbsec-button
        type='primary'
        v-for='btn in btnList'
        :key='btn.label'
        v-on:click='btn.callback'>
      {{btn.label}}</dbsec-button>
    </template>
    <el-descriptions-item 
      v-for='item in array'
      :key='item'
      :contentStyle="{ flex: 1, display: 'inline-block', width: '1px' }"
      >
      <template slot="label">
        <div style="white-space: nowrap">{{ item.label }}</div>
      </template>
      <slot :name='item.slot' :item='item'>
        <!-- <span>{{item.value}}</span> -->
        <dbsec-tooltip 
          placement="top"
          :showOverflowTooltip='true'
          :content='item.value'>
        </dbsec-tooltip>
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import ElDescriptions from 'element-ui/packages/descriptions';
import ElDescriptionsItem from 'element-ui/packages/descriptions-item';

export default {
  name: 'dbsec-descriptions',
  components: {
    ElDescriptions,
    ElDescriptionsItem
  },
  props: {
    title: {
      type: String
    },
    size: {
      type: String
    },
    array: {
      type: Array
    },
    btnList: {
      type: Array
    }
  },
  computed: {
    progressSize() {
      if (this.size == 'small') {
        return 'small';
      }
      return '';
    }
  },
  data() {
    return {

    };
  },
  watch: {},
  // 方法集合
  methods: {

  },
  created() {

  },
  mounted() {

  }
};
</script>

<style>
  
</style>