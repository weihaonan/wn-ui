## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。

```html
<dbsec-tag>标签一</dbsec-tag>
<dbsec-tag type="info">标签二</dbsec-tag>
```
:::

### 可移除标签

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。

```html
<dbsec-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  :type="tag.type">
  {{tag.name}}
</dbsec-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'info' },
        ]
      };
    }
  }
</script>
```
:::

### 不同尺寸

Tag 组件提供两种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 尺寸：默认是`small`、额外值`mini`，通过设置`size`属性来配置它们。

```html
<dbsec-tag closable>默认标签</dbsec-tag>
<dbsec-tag size="mini" closable>超小标签</dbsec-tag>
```
:::

### 不同主题

Tag 组件提供了两个不同的主题：`dark` 和 `plain`

:::demo 通过设置`effect`属性来改变主题，默认为 `dark`
```html
<div class="tag-group">
  <span class="tag-group__title">Dark</span>
  <dbsec-tag
    v-for="item in items"
    :key="item.label"
    :type="item.type">
    {{ item.label }}
  </dbsec-tag>
</div>
<div class="tag-group">
  <span class="tag-group__title">Plain</span>
  <dbsec-tag
    v-for="item in items"
    :key="item.label"
    :type="item.type"
    effect="plain">
    {{ item.label }}
  </dbsec-tag>
</div>

<script>
  export default {
    data() {
      return {
        items: [
          { type: '', label: '标签一' },
          { type: 'info', label: '标签二' },
        ]
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 类型 | string | success/info/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| size | 尺寸 | string | small / mini | small |
| effect | 主题 | string | dark /  plain | dark |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |
