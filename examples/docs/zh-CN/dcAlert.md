## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供两种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <dbsec-alert
    title="消息提示的文案"
    type="info">
  </dbsec-alert>
  <dbsec-alert
    title="错误提示的文案"
    type="error">
  </dbsec-alert>
</template>
```
:::

### 带有 icon

表示某种状态时提升可读性。

:::demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
<template>
  <dbsec-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </dbsec-alert>
  <dbsec-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </dbsec-alert>
</template>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <dbsec-alert
    title="消息提示的文案"
    type="info"
    center
    show-icon>
  </dbsec-alert>
  <dbsec-alert
    title="错误提示的文案"
    type="error"
    center
    show-icon>
  </dbsec-alert>
</template>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html
<template>
  <dbsec-alert
    title="带辅助性文字介绍"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </dbsec-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
<template>
  <dbsec-alert
    title="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </dbsec-alert>
  <dbsec-alert
    title="错误提示的文案"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </dbsec-alert>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
