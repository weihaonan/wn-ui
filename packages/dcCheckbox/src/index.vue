<template>
    <!-- <div 
      v-if="tag">
        <span v-for="(item, itemindex) in newOptions" :key="itemindex">
          <el-tag
            :key="item.value"
            @click.stop.prevent="tagChange(item)"
            style="margin-right: 10px; cursor: pointer"
            size="small"
            :type="item.checked ? 'primary' : 'info'"
            :effect="item.checked ? 'dark' : 'plain'"
            >{{ item.label }}</el-tag
          >
        </span>
    </div> -->
    <label  class="el-dcCheckbox">
      <template v-if="isGroup">
        <el-checkbox 
          v-if="tag"
          class="is-tag el-tag el-tag--info"
          v-bind="$attrs"
          v-on="$listeners"
          :border="false"
          size=""
          >
          <slot></slot>
        </el-checkbox>
        <el-checkbox 
          v-else
          v-bind="$attrs"
          v-on="$listeners"
          :border="border"
          size=""
          >
          <slot></slot>
        </el-checkbox>
      </template>
      <template v-else>
        <el-checkbox 
          v-model="value"
          v-on:input="changeInput"
          v-bind="$attrs"
          v-on="$listeners"
          >
          <slot></slot>
        </el-checkbox>
      </template>
    </label>
    
</template>

<script>
import ElCheckbox from 'element-ui/packages/checkbox';
// import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
// import ElCheckboxButton from 'element-ui/packages/checkbox-button';
// import ElTag from 'element-ui/packages/tag';
export default {
  name: 'dbsec-checkbox',
  components: {
    ElCheckbox
    // ElCheckboxGroup,
    // ElCheckboxButton
    // ElTag
  },
  data() {
    return {
      newOptions: []
    };
  },
  props: {
    /** 绑定值 */
    value: {},
    type: { // checkbox类型
      type: String,
      default: 'origin'
    },
    /** 多选框的配置项 */
    options: {
      type: Array
    },
    border: {
      type: Boolean
    },
    tag: {
      type: Boolean
    }
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName != 'dbsec-checkbox-group') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    }
  },
  created() {
    if (this.options) {
      this.newOptions = this.options.map((arr)=>{
        return {
          ...arr,
          checked: false
        };
      });
    } else {
      this.newOptions = [{}];
    }

  },
  methods: {
    changeInput(val) {
      this.$emit('input', val);
    },
    formChange(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
    changeCheckStatus(item, checked) {
      console.log(item);
      if (this.value.indexOf(item.label) == -1) {
        this.value.push(item.label);
      } else {
        this.value = this.value.filter(val=>{
          return val != item.label;
        });
      }
    },
    tagChange(obj) {
      console.log(obj);
      obj.checked = !obj.checked;
      if (obj.checked) {
        this.value.push(obj.label);
      } else {
        this.value = this.value.filter(val=>{
          return val != obj.label;
        });
      }
      this.emitParent();
    }
  }
};
</script>
