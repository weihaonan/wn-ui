<template>
  <el-breadcrumb-item
    v-bind='$attrs'
    v-on='$listeners'>
    <slot></slot>  
  </el-breadcrumb-item>
</template>
<script>
import ElBreadcrumbItem from 'element-ui/packages/breadcrumb-item';

export default {
  name: 'dbsec-breadcrumb-item',
  components: {
    ElBreadcrumbItem
  },
  props: {
  },

  provide() {
    return {
    };
  },

  mounted() {

  }
};
</script>
