## Pagination 分页

当数据量过多时，使用分页分解数据。

### 基础用法

:::demo 
```html
<div class="block">
  <span class="demonstration">页数较少时的效果</span>
  <dbsec-pagination
    v-model = 'pageObj'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </dbsec-pagination>
</div>
<div class="block">
  <span class="demonstration">大于 7 页时的效果</span>
  <dbsec-pagination
    v-model = 'pageObj1'>
  </dbsec-pagination>
</div>
<script>
  export default {
    data(){
      return {
        pageObj:{
          pageNum:1,
          total:50
        },
        pageObj1:{
          pageNum:1,
          total:1000
        },
      }
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`,this.pageObj);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`,this.pageObj);
      }
    },
  }
</script>
```
:::

### 简约分页

:::demo 只需要一个`simple`属性，它接受一个Boolean，默认为false，设为true即可启用。
```html
<dbsec-pagination
  simple
  v-model='pageObj'>
</dbsec-pagination>
<script>
  export default {
    data(){
      return {
        pageObj:{
          pageNum:1,
          total:1000
        },
      }
    },
  }
</script>
```
:::
### 小型分页

在空间有限的情况下，可以使用简单的小型分页。

:::demo 只需要一个`small`属性，它接受一个Boolean，默认为false，设为true即可启用。
```html
  <dbsec-pagination
    small
    simple
    v-model='pageObj'>
  </dbsec-pagination>
<script>
  export default {
    data(){
      return {
        pageObj:{
          pageNum:1,
          total:1000
        },
      }
    },
  }
</script>
```
:::


### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| v-model/value | 分页对象 | Object | — | false |
| > pageNum | 当前页 | number | — | 1 |
| > pageSize | 每页显示条目个数  | number | — | 20 |
| > total | 总条目  | number | — | - |
| small | 是否使用小型分页样式 | boolean | — | false |
| total | 总条目数 | number | — | — |
| popper-class | 每页显示个数选择器的下拉框类名 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |
| prev-click | 用户点击上一页按钮改变当前页后触发 | 当前页 |
| next-click | 用户点击下一页按钮改变当前页后触发 | 当前页 |

