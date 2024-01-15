<template>
  <div class="el-dcRadio">
    <el-radio-group 
      v-if="type=='tag'"
      class="el-dcRadio__tag"
      :size="computedSize"
      v-bind="$attrs"
      v-model="model">
      <el-radio-button 
        :name="name"
        v-for="radio in options"
        :key="radio.value"
        :disabled="radio.disabled"
        :label="radio.value">{{ radio.label }}</el-radio-button>
    </el-radio-group>
    <el-radio-group 
      v-else-if="type=='button'"
      :size="computedSize"
      v-bind="$attrs"
      v-model="model">
      <el-radio-button 
        :name="name"
        v-for="radio in options"
        :key="radio.value"
        :disabled="radio.disabled"
        :label="radio.value">{{ radio.label }}</el-radio-button>
    </el-radio-group>
    <el-radio-group 
      v-else
      v-model="model"
      v-bind="$attrs">
      <el-radio 
        :name="name"
        v-for="radio in options"
        :key="radio.value"
        :disabled="radio.disabled"
        :label="radio.value">
        {{ radio.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  import ElRadio from 'element-ui/packages/radio';
  import ElRadioGroup from 'element-ui/packages/radio-group';
  import ElRadioButton from 'element-ui/packages/radio-button';
  export default {
    name: 'dbsec-radio',

    components: {
      ElRadio,
      ElRadioGroup,
      ElRadioButton
    },

    props: {
      options: {
        type: Array
      },
      value: {},
      // 不同类型的单选框样式
      type: {
        type: String
      },
      name: {
        type: String
      },
      size: {
        type: String,
        default: 'small'
      }
    },
    computed: {
      computedSize() {
        return this.size;
      },
      model: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    data() {
      return {
  
      };
    },

    methods: {
      inputValue(val) {
        this.$emit('input', val);
      }
    }
  };
</script>
