## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="dbsec-icon-edit"></i>
<dbsec-button type="primary" icon="dbsec-icon-search"> 搜 索</dbsec-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'dbsec-icon-' + name"></i>
      <span class="icon-name">{{'dbsec-icon-' + name}}</span>
    </span>
  </li>
</ul>
