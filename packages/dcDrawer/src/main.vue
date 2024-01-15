<template>
  <el-drawer
    :title='title'
    :visible.sync='visible'
    :size='computedSize'
    :before-close="defaultBeforeClose"
    :wrapper-closable='false'
    :wrapperClosable='false'
    v-bind='$attrs'
    v-on='$listeners'>

    <slot name='title' slot='title'></slot>
    <div class='el-drawer-main' v-if="visible">
      <slot></slot>
    </div>
    <div class="el-drawer__footer" v-if="showFooter">
      <slot name='footer'>
        <dbsec-button
          v-for='btn in footBtns'
          :key='btn.label'
          size="small"
          :type='btn.type'
          class="drawer-footer-btn"
          @click.stop.prevent="btn.callback"
          >{{btn.label}}</dbsec-button
        >
      </slot>
    </div>
  </el-drawer>
</template>

<script>
import ElDrawer from 'element-ui/packages/drawer';
import { compuState, mapStates } from './store/helper';

export default {
  name: 'dbsec-drawer',
  components: {
    ElDrawer
  },
  props: {
    beforeClose: {

    },
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean
    },
    isSubmit: {
      type: Boolean
    },
    isAsk: {
      type: Boolean
    },
    size: {},
    footBtns: {
      type: Array,
      default() {
        return [
          {
            label: '取消',
            callback: () =>{
              this.cancel();
            }
          },
          {
            label: '保存',
            type: 'primary',
            callback: () =>{
              this.callback();
            }
          }
        ];
      }
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    customSize: {
      type: String
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        this.store.commit('setDrawerLavel', {
          type: this.level,
          size: this.size
        });
      }
    },
    drawerLavel(val) {
      console.log(val);
    }
  },
  computed: {
    ...mapStates({
      drawerLavelSize: 'drawerLavelSize',
      drawerLavel: 'drawerLavel'
    }),
    computedSize() {
      const drawerLavel =
        this.drawerLavel[`drawerLavel${this.level}`];
      return this.customSize || drawerLavel;
      // return this.drawerLavel[this.level];
    }
  },
  data() {
    this.store = compuState()(this, {
      level: this.level
    });
    return {

    };
  },
  // 方法集合
  methods: {
    // 取消
    cancel() {
      this.$emit('update:visible', false);
    },
    callback() {
      this.$emit('save');
    },
    defaultBeforeClose(done) {
      if (this.isSubmit) {
        this.$confirm('保存变更?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
          type: 'warning'
        }).then(() => {
          this.$emit('save'); // 保存变更
        }).catch((action) => {
          this.close();
          if (action === 'cancel') {
            this.$message({
              type: 'info',
              message: '放弃保存变更'
            });
          }

        });
      } else if (this.isAsk) {
        this.$confirm('确定关闭?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.close();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });
        });
      } else {
        // this.close();
        if (this.beforeClose) {
          this.beforeClose(done);
        } else {
          this.close();
        }

      }
    },
    close() {
      if (this.level != 1) {
        this.store.commit('setDrawerLavel', {
          type: this.level - 1
        });
      }
      this.$emit('update:visible', false);
    }
  },
  created() {

  },
  mounted() {
    console.log(this);
  }
};
</script>

<style>
  
</style>