## Checkbox 多选框
一组备选项中进行多选

### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

:::demo 在`dbsec-checkbox`元素中定义`v-model`绑定变量,单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。

```html
<template>
  <dbsec-checkbox 
    v-model="checked">备选项</dbsec-checkbox>
  <dbsec-checkbox 
      v-model="checked1"
      disabled>不可选项</dbsec-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked:true,
        checked1:true,
      };
    }
  };
</script>
```
:::

### 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `dbsec-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```html
<template>
  <dbsec-checkbox-group
    v-model="checked">
    <dbsec-checkbox label="1">复选框 A</dbsec-checkbox>
    <dbsec-checkbox label="复选框 B"></dbsec-checkbox>
    <dbsec-checkbox label="复选框 C"></dbsec-checkbox>
    <dbsec-checkbox label="禁用" disabled></dbsec-checkbox>
    <dbsec-checkbox label="选中且禁用" disabled></dbsec-checkbox>
  </dbsec-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checked: [],
      };
    }
  };
</script>
```
:::

### 带边框样式

页面留白过多时使用

:::demo 设置`border`属性可以渲染为带有边框的多选框

```html
<template>
  <dbsec-checkbox-group
    v-model="checked">
    <dbsec-checkbox label="客户端IP" border></dbsec-checkbox>
    <dbsec-checkbox label="数据库用户" border></dbsec-checkbox>
    <dbsec-checkbox label="客户端工具" border></dbsec-checkbox>
  </dbsec-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checked: [],
      };
    }
  };
</script>
```
:::

### 标签选框样式
页面区域比较小时使用
:::demo 通过设置`tag`属性实现标签样式选框。

```html
<template>
   <dbsec-checkbox-group
    v-model="checked">
    <dbsec-checkbox 
      v-for='source in sourceOptions'
      :label="source.value" 
      tag>
      {{source.label}}  
    </dbsec-checkbox>
  </dbsec-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checked: [],
        sourceOptions:[
          { label: '客户端IP', value: 1, checked: false },
          { label: '数据库用户', value: 2, checked: false },
          { label: '客户端工具', value: 3, checked: false },
        ]
      };
    }
  };
</script>
```
:::

### indeterminate 状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::demo

```html
<template>
  <dbsec-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</dbsec-checkbox>
  <div style="margin: 15px 0;"></div>
  <dbsec-checkbox-group
    v-model="checked"
    @change="handleCheckedCitiesChange">
    <dbsec-checkbox :label="source.value" v-for='source in sourceList'>{{source.label}}</dbsec-checkbox>
  </dbsec-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkAll: false,
        checked: [1, 2],
        isIndeterminate: true,
        sourceList:[
           { label: '客户端IP', value: 1 },
          { label: '数据库用户', value: 2 },
          { label: '客户端工具', value: 3 },
        ]
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checked = val ? this.sourceList.map(item=>item.value) : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.sourceList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.sourceList.length;
      }
    }
  };
</script>
```
:::
### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| options | 选项列表 | array | — | — |
| > label | 选项名称 | string | — | — |
| > value | 选项值，作为选中的值 | string/number | — | — |
| > checked | 是否选中，只在type为mini时有用 | boolean| — | — |
| type | 多选框类型 | string | mini/group/origin | origin |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

