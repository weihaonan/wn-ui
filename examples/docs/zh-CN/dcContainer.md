## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<dbsec-container>`：外层容器。当子元素中包含 `<dbsec-header>` 或 `<dbsec-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<dbsec-header>`：顶栏容器。

`<dbsec-aside>`：侧边栏容器。

`<dbsec-main>`：主要区域容器。

`<dbsec-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<dbsec-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<dbsec-container>`。
:::

### 常见页面布局

:::demo
```html
<dbsec-container>
  <dbsec-header>Header</dbsec-header>
  <dbsec-main>Main</dbsec-main>
</dbsec-container>

<dbsec-container>
  <dbsec-header>Header</dbsec-header>
  <dbsec-main>Main</dbsec-main>
  <dbsec-footer>Footer</dbsec-footer>
</dbsec-container>

<dbsec-container>
  <dbsec-aside width="200px">Aside</dbsec-aside>
  <dbsec-main>Main</dbsec-main>
</dbsec-container>

<dbsec-container>
  <dbsec-header>Header</dbsec-header>
  <dbsec-container>
    <dbsec-aside width="200px">Aside</dbsec-aside>
    <dbsec-main>Main</dbsec-main>
  </dbsec-container>
</dbsec-container>

<dbsec-container>
  <dbsec-header>Header</dbsec-header>
  <dbsec-container>
    <dbsec-aside width="200px">Aside</dbsec-aside>
    <dbsec-container>
      <dbsec-main>Main</dbsec-main>
      <dbsec-footer>Footer</dbsec-footer>
    </dbsec-container>
  </dbsec-container>
</dbsec-container>

<dbsec-container>
  <dbsec-aside width="200px">Aside</dbsec-aside>
  <dbsec-container>
    <dbsec-header>Header</dbsec-header>
    <dbsec-main>Main</dbsec-main>
  </dbsec-container>
</dbsec-container>

<dbsec-container>
  <dbsec-aside width="200px">Aside</dbsec-aside>
  <dbsec-container>
    <dbsec-header>Header</dbsec-header>
    <dbsec-main>Main</dbsec-main>
    <dbsec-footer>Footer</dbsec-footer>
  </dbsec-container>
</dbsec-container>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
```
:::


### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |