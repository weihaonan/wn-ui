<template>
  <el-timeline
    v-bind='$attrs'
    v-on='$listeners'>
    <el-timeline-item
      v-for='item in array'
      :key='item'
      :icon="item.icon"
      :type="item.type"
      :color="item.color"
      :size="item.size"
      :placement='item.placement'
      :hide-timestamp='item.hideTimeStamp'
      :timestamp='item.timestamp'>
      <slot :name='item.slot'> {{item.content}}</slot>
      <slot :name='item.slotDot' slot='dot'></slot>
    </el-timeline-item>  
  </el-timeline>
</template>

<script>
import ElTimeline from 'element-ui/packages/timeline';
import ElTimelineItem from 'element-ui/packages/timeline-item';
export default {
  name: 'dbsec-timeline',
  components: {
    ElTimeline,
    ElTimelineItem
  },
  props: {
    array: {
      type: Array
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