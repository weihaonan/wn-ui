## Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

### 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

```html
<div class="box">
  <div class="top">
    <dbsec-tooltip class="item"  content="Top Left 提示文字" placement="top-start">
      <dbsec-button>上左</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Top Center 提示文字" placement="top">
      <dbsec-button>上边</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Top Right 提示文字" placement="top-end">
      <dbsec-button>上右</dbsec-button>
    </dbsec-tooltip>
  </div>
  <div class="left">
    <dbsec-tooltip class="item"  content="Left Top 提示文字" placement="left-start">
      <dbsec-button>左上</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Left Center 提示文字" placement="left">
      <dbsec-button>左边</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Left Bottom 提示文字" placement="left-end">
      <dbsec-button>左下</dbsec-button>
    </dbsec-tooltip>
  </div>

  <div class="right">
    <dbsec-tooltip class="item"  content="Right Top 提示文字" placement="right-start">
      <dbsec-button>右上</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Right Center 提示文字" placement="right">
      <dbsec-button>右边</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Right Bottom 提示文字" placement="right-end">
      <dbsec-button>右下</dbsec-button>
    </dbsec-tooltip>
  </div>
  <div class="bottom">
    <dbsec-tooltip class="item"  content="Bottom Left 提示文字" placement="bottom-start">
      <dbsec-button>下左</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Bottom Center 提示文字" placement="bottom">
      <dbsec-button>下边</dbsec-button>
    </dbsec-tooltip>
    <dbsec-tooltip class="item"  content="Bottom Right 提示文字" placement="bottom-end">
      <dbsec-button>下右</dbsec-button>
    </dbsec-tooltip>
  </div>
</div>

<style>
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
  }
</style>
```
:::

### 更多 Content

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot 分发`content`，替代`tooltip`中的`content`属性。
```html
<dbsec-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <dbsec-button>Top center</dbsec-button>
</dbsec-tooltip>
```
:::

### 文本超长

文本超长时才触发tooltip，并且带滚动条，不超出不触发;

:::demo 使用`showOverflowTooltip`属性实现，接受一个boolean类型的值
```html
<el-row>
<dbsec-tooltip 
  placement="top"
  :showOverflowTooltip='true'
  :content='content'>
</dbsec-tooltip>
</el-row>
<br>
<el-row>
  <dbsec-tooltip 
  placement="top"
  :showOverflowTooltip='true'
  :content='content1'>
</dbsec-tooltip>
</el-row>
<script>
  export default {
    data() {
      return {
        content1:'这是一段测试文字',
        content: '这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字'
      };
    },
  };
</script>
```
:::

:::tip
tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

tooltip 内不支持 disabled form 元素，参考[MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)，请在 disabled form 元素外层添加一层包裹元素。
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  content        |  显示的内容，也可以通过 `slot#content` 传入 DOM  | String            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  value / v-model |  状态是否可见  | Boolean           | — |  false |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  popper-options        | [popper.js](https://popper.js.org/docs/v2/) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/docs/v2/) 文档 | { boundariesElement: 'body', gpuAcceleration: false } |
| manual | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效 | Boolean | — | false |
| popper-class | 为 Tooltip 的 popper 添加类名 | String | — | — |
| enterable | 鼠标是否可进入到 tooltip 中 | Boolean | — | true |
| hide-after | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏 | number | — | 0 |
| tabindex   | Tooltip 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
