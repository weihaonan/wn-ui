## Descriptions 描述列表

列表形式展示多个字段。

### 基础用法

:::demo

```html
<dbsec-descriptions 
  title="用户信息"
  :array='array'>
    <template slot='desc' slot-scope='{item}'>
      <dbsec-tag>{{item.value}}</dbsec-tag>
    </template>
</dbsec-descriptions>
<script>
   export default {
    data(){
      return {
        array:[
          {
            label:'用户名',
            value:'kooriookamikooriookamikooriookamikooriookamikooriookami'
          },
          {
            label:'手机号',
            value:'18100000000'
          },
          {
            label:'居住地',
            value:'苏州市'
          },
          {
            label:'备注',
            value:'学校',
            slot:'desc',
          },
          {
            label:'联系地址',
            value:'江苏省苏州市吴中区吴中大道 1188 号'
          }
        ]
      }
    },
   }
</script>
```
:::

### 不同尺寸

:::demo

```html
<template>
  <dbsec-radio 
    v-model="size" 
    :options="radioList">
  </dbsec-radio>
  <dbsec-descriptions 
    style='margin-top:20px'
    title="无边框列表" 
    :column="3" 
    :size="size"
    :array='array'
    :btnList='btnList'>
    <template slot='desc' slot-scope='{item}'>
      <dbsec-tag>{{item.value}}</dbsec-tag>
    </template>
  </dbsec-descriptions>
</template>

<script>
  export default {
    data () {
      return {
        size: '',
        radioList:[
          {
            label:'默认',
            value:'',
          },
          {
            label:'小型',
            value:'small'
          }
        ],
        btnList:[
          {
            label:'操作',
            callback:this.operation,
          }
        ],
        array:[
          {
            label:'用户名',
            value:'kooriookami'
          },
          {
            label:'手机号',
            value:'18100000000'
          },
          {
            label:'居住地',
            value:'苏州市'
          },
          {
            label:'备注',
            value:'学校',
            slot:'desc',
          },
          {
            label:'联系地址',
            value:'江苏省苏州市吴中区吴中大道 1188 号'
          }
        ]
      };
    },
    methods:{
      operation(){
        console.log('操作')
      }
    }
  }
</script>
```
:::

### Descriptions Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| column        | 一行 `Descriptions Item` 的数量  | number | — |    3  |
| btnList        |操作按钮  | array | — |   —  |
| size          | 列表的尺寸    | string  |    medium / small / mini  |  — |
| title         | 标题文本，显示在左上方    | string  |    —  |  — |
| extra         | 操作区文本，显示在右上方    | string  |    —  |  — |
| labelClassName | 自定义标签类名    | string |    —  |  — |
| contentClassName | 自定义内容类名    | string |    —  | — |
| labelStyle | 自定义标签样式 | object |    —  | — |
| contentStyle | 自定义内容样式    | object |    —  | — |

### Descriptions Slots

| Name | 说明 |
|------|--------|
| title | 自定义标题，显示在左上方  |
| extra | 自定义操作区，显示在右上方  |

<!-- ### Descriptions Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label          | 标签文本         | string  |          —             |    —     |
| span          | 列的数量         | number  |          —             |    1     |
| labelClassName | 自定义标签类名    | string |    —  |  — |
| contentClassName | 自定义内容类名    | string |    —  | — |
| labelStyle | 自定义标签样式 | object |    —  | — |
| contentStyle | 自定义内容样式    | object |    —  | — |

### Descriptions Item Slots

| Name | 说明 |
|------|--------|
| label | 自定义标签文本  | -->
