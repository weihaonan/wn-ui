## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`circle`属性来定义 Button 的样式。

```html
<el-row>
  <dbsec-button>默认按钮</dbsec-button>
  <dbsec-button type="primary">主要按钮</dbsec-button>
</el-row>


<el-row>
  <dbsec-button icon="el-icon-plus" circle></dbsec-button>
  <dbsec-button type="primary" icon="el-icon-delete" circle></dbsec-button>
</el-row>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<el-row>
  <dbsec-button disabled>默认按钮</dbsec-button>
  <dbsec-button type="primary" disabled>主要按钮</dbsec-button>
</el-row>

```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<dbsec-button type="text">文字按钮</dbsec-button>
<dbsec-button type="text" disabled>文字按钮</dbsec-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<dbsec-button type="primary" icon="dbsec-icon-edit"></dbsec-button>
<dbsec-button type="primary" icon="el-icon-share"></dbsec-button>
<dbsec-button type="primary" icon="el-icon-delete"></dbsec-button>
<dbsec-button type="primary" icon="el-icon-search">搜索</dbsec-button>
<dbsec-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></dbsec-button>
```
:::


### 不同尺寸

dbsecButton 组件提供了默认以及超小两种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 超小尺寸：`mini`，通过设置`size`属性来配置它们。

```html
<el-row>
  <dbsec-button>默认按钮</dbsec-button>
  <dbsec-button size="mini">超小按钮</dbsec-button>
</el-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |    small / mini            |    —     |
| type     | 类型   | string    |   primary/text/  |     —    |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
