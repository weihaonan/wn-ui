## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`options`的 value 属性值；通过`disabled`属性禁用启用选项，接收一个`boolean`值，`true`为禁用。
```html
<template>
  <dbsec-select 
    v-model="value" 
    placeholder="请选择"
    :options='options'
    v-on:change='change'>
  </dbsec-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '默认攻击'
        }, {
          value: '2',
          label: '访问控制',
          disabled:true
        }, {
          value: '3',
          label: '危险操作',
          hide:true
        }, {
          value: '4',
          label: '数据泄露'
        }, {
          value: '5',
          label: '信任行为'
        }],
        value: ''
      }
    },
    methods:{
      change(){
        console.log('选项修改，'+ this.value)
      }
    }
  }
</script>
```
:::

### 禁用状态

选择器不可用状态

:::demo 为`dbsec-select`设置`disabled`属性，则整个选择器不可用
```html
<template>
  <dbsec-select 
    disabled
    v-model="value" 
    placeholder="请选择"
    :options='options'>
  </dbsec-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '默认攻击'
        }, {
          value: '2',
          label: '访问控制',
          disabled:true
        }, {
          value: '3',
          label: '危险操作'
        }, {
          value: '4',
          label: '数据泄露'
        }, {
          value: '5',
          label: '信任行为'
        }],
        value: ''
      }
    }
  }
</script>
```
:::


### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`dbsec-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现。
```html
<template>
  <dbsec-select 
    v-model="value1" 
    multiple 
    placeholder="请选择"
    :options='options'>

  </dbsec-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '默认攻击'
        }, {
          value: '2',
          label: '访问控制',
        }, {
          value: '3',
          label: '危险操作'
        }, {
          value: '4',
          label: '数据泄露'
        }, {
          value: '5',
          label: '信任行为'
        }],
        value1: [],
        value2: []
      }
    }
  }
</script>
```
:::

<!-- ### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入`el-option`的 slot 中即可。
```html
<template>
  <dbsec-select 
    v-model="value" 
    placeholder="请选择"
    :options='cities'>
      <div slot-scope="{param}">
        <span style="float: left">{{ param.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ param.value }}</span>
      </div>
  </dbsec-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          value: 'moren',
          label: '默认攻击'
        }, {
          value: 'fangwen',
          label: '访问控制',
        }, {
          value: 'weixian',
          label: '危险操作'
        }, {
          value: 'shuju',
          label: '数据泄露'
        }, {
          value: 'xinren',
          label: '信任行为'
        }],
        value: ''
      }
    }
  }
</script>
```
::: -->


:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| clearable | 是否可以清空选项 | boolean | — | — |
| options | 下拉选项列表 | array | — | — |
| > label | 名称 | string | — | — |
| > value | 值 | string | — | — |
| > disabled | 是否可选中 | boolean | — | — |
| > hide | 是否隐藏 | boolean | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filter-method | 自定义搜索方法,如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现。filter-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值 | function | — | — |
| popper-class | Select 下拉框的类名 | string | — | — |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix  | Select 组件头部内容 |
| empty | 无选项时的列表 |


### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点，并隐藏下拉框 | - |
