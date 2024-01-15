## Empty 空状态

空状态时的占位提示。

### 基础用法

:::demo

```html
<dbsec-empty description="描述文字"></dbsec-empty>
```
:::

### 自定义图片

通过设置 `image` 属性传入图片 URL。

:::demo

```html
<dbsec-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></dbsec-empty>
```
:::

### 图片尺寸

通过设置 `image-size` 属性来控制图片大小。

:::demo

```html
<dbsec-empty :image-size="200"></dbsec-empty>
```
:::

### 底部内容

使用默认插槽可在底部插入内容。

:::demo
```html
<dbsec-empty>
  <dbsec-button type="primary">按钮</dbsec-button>
</dbsec-empty>
```
:::

### Empty Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| image          | 图片地址         | string  |          —             |    —     |
| image-size    | 图片大小（宽度）  | number | — |    —  |
| description  | 文本描述    | string  |    —  |  — |

### Empty Slots

| Name | 说明 |
|------|--------|
| default | 自定义底部内容  |
| image | 自定义图片     |
| description | 自定义描述文字     |
