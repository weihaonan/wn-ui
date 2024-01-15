<template>
  <el-pagination
    :style="commonStyle"
    :background='background'
    v-on="$listeners"
    :small='small'
    :current-page="page.pageNum"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="page.pageSize"
    :layout="layout"
    :total="totalNum"
    :pager-count="pagerCount"
    @current-change="onCurrentChange"
    @size-change="onSizeChange"
  >
  </el-pagination>
</template>

<script>
import { defaults } from 'lodash';
import ElPagination from 'element-ui/packages/pagination';

export default {
  name: 'dbsec-pagination',
  props: {
    simple: {
      type: Boolean
    },
    small: {
      type: Boolean
    },
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    commonStyle: {
      type: Object,
      default() {
        return { textAlign: 'right'};
      }
    },
    // layout: {
    //   type: String,
    //   default: ' prev, pager, next,sizes,total, jumper'
    // },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  components: {
    ElPagination
  },
  data() {
    return {
      defaultOptions: {
        total: 0,
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  computed: {
    layout() {
      if (this.simple) {
        return 'prev, pager, next';
      }
      return 'total, sizes, prev, pager, next, jumper';
    },
    background() {
      if (this.simple) {
        return false;
      }
      return true;
    },
    page: {
      get() {
        return defaults(this.value, this.defaultOptions);
      },
      set(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    totalNum() {
      if (this.total) {
        return this.total;
      }
      return this.page.total;
    }
  },
  methods: {
    onCurrentChange(pageNum) {
      this.page = { ...this.page, pageNum };
    },
    onSizeChange(pageSize) {
      this.page = { ...this.page, pageSize, pageNum: 1 };
    }
  }
};
</script>
<!-- 
<style lang="less" scoped>
.page-pagination {
  text-align: right;
}
</style> -->
