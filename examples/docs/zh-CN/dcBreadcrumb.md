## Breadcrumb 面包屑
显示当前页面的路径，快速返回之前的任意页面。

### 基础用法

适用广泛的基础用法。

:::demo 在`dbsec-breadcrumb`中使用`dbsec-breadcrumb-item`标签表示从首页开始的每一级。Element 提供了一个`separator`属性，在`dbsec-breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`。

```html
<dbsec-breadcrumb separator="/">
  <dbsec-breadcrumb-item :to="{ path: '/' }">首页</dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item><a href="/">活动管理</a></dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item>活动列表</dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item>活动详情</dbsec-breadcrumb-item>
</dbsec-breadcrumb>
```
:::

### 图标分隔符

:::demo 通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效

```html
<dbsec-breadcrumb separator-class="el-icon-arrow-right">
  <dbsec-breadcrumb-item :to="{ path: '/' }">首页</dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item>活动管理</dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item>活动列表</dbsec-breadcrumb-item>
  <dbsec-breadcrumb-item>活动详情</dbsec-breadcrumb-item>
</dbsec-breadcrumb>
```
:::

### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | 斜杠'/' |
| separator-class | 图标分隔符 class | string | — | - |

### Breadcrumb Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to        | 路由跳转对象，同 `vue-router` 的 `to` | string/object | — | — |
| replace   | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean | — | false |
