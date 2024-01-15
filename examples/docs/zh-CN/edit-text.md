## Edit-text 编辑文本

一般用于表格内的文本修改

### 基础用法

:::demo 绑定值为对象，
```html
  <dbsec-edit-text
    ref='edit-text'
    v-model='name'
    @saveCb='saveCb'></dbsec-edit-text>

<script>
export default {
  data() {
    return {
        name:'用户-123',
    }
  },
  methods:{
    saveCb(value){
      this.name=value;
      this.$refs['edit-text'].closeInput();
    }
  }
}
</script>
```
:::
### 表格内的文本

:::demo 
```html
<dbsec-table
  :columns="columns"
  :data="tableData"
>
  <template slot='user' slot-scope="{item}">
    <dbsec-edit-text
      ref='edit-text'
      v-model='item.user'
      @saveCb='saveCb($event,item)'></dbsec-edit-text>
  </template>
</dbsec-table>

<script>
export default {
  data() {
    return {
      editObj:{
        name:'',
      },
      columns:[
        {
          label: "运维用户",
          param: "user",
          slotName:'user',
        },
        {
          label: "客户端IP",
          param: "clientIp",
        }
      ],
      tableData:[
        {
          user:'用户-123',
          clientIp:'10.10.12.21'
        },
      ]
    }
  },
  methods:{
    saveCb($event,item){
      console.log($event,item)
      item.user = $event;
      this.$refs['edit-text'].close();
    }
  }
}
</script>
```
:::

### Edit-text Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| v-model          | 绑定值   | string  |          —             |    —     |

### Edit-text Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| saveCb | 点击保存后触发 | value |

### Edit-text Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| close | 关闭编辑模式 | --