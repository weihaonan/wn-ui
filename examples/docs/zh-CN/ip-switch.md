## ip-switch 切换框

实现单值与区间的切换

### 基础用法

:::demo 默认显示IP和IP段切换；如需自定义，使用`labelList`属性进行覆盖;
```html
  <el-row>
    <dbsec-ip-switch
      v-model='formData'></dbsec-ip-switch>
  </el-row>
  <el-row>
    <dbsec-ip-switch
       v-model='formData'
      :switchLabel='labelList'
      intervalShow
      ></dbsec-ip-switch>
  </el-row>
<script>
export default {
  data() {
    return {
      formData:{
        start:'',
        end:'',
      },
      labelList: ['端口','端口区间']
    }
  },
}
</script>
```
:::

### 事件

:::demo 
```html
    <dbsec-ip-switch
      v-model='formData'
      @changeInput='changeInput'></dbsec-ip-switch>
<script>
export default {
  data() {
    return {
      formData:{
        start:'',
        end:'',
      },
    }
  },
  methods:{
    changeInput(val){
      console.log(val)
    }
  }
}
</script>
```
:::

### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| v-model/value   | 绑定值                 | object  |    {start:" ",end:" "}   |{start:" ",end:" "}  
| switchLabel      | 切换文本,只有两项    | array | —                                    | true    |

### Events

| 事件名称           | 说明                           | 回调参数 |
| -------------- | ------------------------------ | --------- | 
| changeInput  | 绑定值修改后触发                 | value  |  |