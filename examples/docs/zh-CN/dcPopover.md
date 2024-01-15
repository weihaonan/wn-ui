## Popover 弹出框

### 基础用法
Popover 的属性与 Tooltip 很类似，它们都是基于`Vue-popper`开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

:::demo `trigger`属性用于设置何时触发 Popover，支持两种触发方式：`hover`，`click`。对于触发 Popover 的元素，使用 `slot="reference"` 的具名插槽
```html
<template>
  <dbsec-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <dbsec-button slot="reference">hover 激活</dbsec-button>
  </dbsec-popover>

  <dbsec-popover
    placement="bottom"
    title="标题"
    width="200"
    trigger="click"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <dbsec-button slot="reference">click 激活</dbsec-button>
  </dbsec-popover>

</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::

### 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

:::demo 利用分发取代`content`属性
```html
<dbsec-popover
  v-model='visible'
  ref='popover'
  placement="right"
  width="400"
  trigger="click">
  <dbsec-table 
    :data="gridData"
    :columns="columns">
  </dbsec-table>
  <dbsec-button v-on:click='closePoper'>关闭</dbsec-button>
  <dbsec-button slot="reference">click 激活</dbsec-button>
</dbsec-popover>

<script>
  export default {
    data() {
      return {
        visible:false,
        columns:[
          {
            label:'日期',
            param:'date',
          },
          {
            label:'姓名',
            param:'name',
          },
          {
            label:'地址',
            param:'address',
            width:'300'
          },
        ],
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    methods:{
      closePoper(){
        this.visible = false
      }
    }
  };
</script>
```
:::

### 气泡确认框

点击元素，弹出气泡确认框

:::demo 通过传`popconfirm`属性，实现气泡确认框
```html
<dbsec-popover
  v-model='visible'
  placement="top"
  popconfirm
  @confirm='confirm'
  @cancel='cancel'>
  <p>这是一段内容确定删除吗？</p>
  <dbsec-button slot="reference" v-on:click='visible=!visible'>删除</dbsec-button>
</dbsec-popover>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods:{
      confirm(){
        console.log('confirm')
        this.visible = false
      },
      cancel(){
        console.log('cancel')
      }
    }
  }
</script>
```
:::



### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| popconfirm | 确认框类型, | Boolean  | -- |    false    |
| trigger | 触发方式 | String  | click/focus |    click    |
|  title              | 标题 | String | — | — |
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  width        |  宽度  | String, Number            | — | 最小宽度 150px |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  disabled       |  Popover 是否可用  | Boolean           | — |  false |
|  value / v-model        |  状态是否可见  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | fade-in-linear |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/docs/v2/) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/docs/v2/) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class | 为 popper 添加类名 | String | — | — |
| open-delay | 触发方式为 hover 时的显示延迟，单位为毫秒 | Number | — | — |
| close-delay | 触发方式为 hover 时的隐藏延迟，单位为毫秒 | number | — | 200 |
| tabindex   | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |

### Slot
| 参数 | 说明 |
|--- | ---|
| — | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| show | 显示时触发 | — |
| after-enter | 显示动画播放完毕后触发 | — |
| hide | 隐藏时触发 | — |
| after-leave | 隐藏动画播放完毕后触发 | — |
| confirm | 点击确认按钮时触发，只在popconfirm为true时有效 | — |
| cancel | 点击取消按钮时触发，只在popconfirm为true时有效 | — |
