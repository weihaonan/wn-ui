## Page-Select 表单

带分页的下拉选框，可以进行检索、分页查询

### 基本用法

:::demo 
```html
<dbsec-page-select
  :option="formItem"
  v-model="form"
  @selection-change="formChange(newForm, item)"
  @changeSelect="rowClick">
</dbsec-page-select>
<script>
  export default {
    data() {
      return {
        form: {
          databaseName:'',
          databaseId:[],
        },
         formItem: {
            label: "数据库",
            param: "databaseName",
            paramKey:'databaseId',
            callback:this.callback,
            options:[{
              label:'sql1',
              value:'1',
              total:15
            },{
              label:'sql2',
              value:'2',
              total:15
            },{
              label:'sql3',
              value:'3',
              total:15
            },{
              label:'sql4',
              value:'4',
              total:15
            },{
              label:'sql5',
              value:'5',
              total:15
            }]
          },
      }
    },
    watch:{
      form(val){
        console.log(val)
      }
    },
    methods: {
      callback(value,page) {
        console.log(value)
        if(page==2){
          this.formItem.options=[
            {
              label:'sql6',
              value:'6',
              total:15
            },
            {
              label:'sql7',
              value:'7',
              total:15
            }
          ]
        } else if(page==1){
          this.formItem.options=[{
              label:'sql1',
              value:'1',
              total:15
            },{
              label:'sql2',
              value:'2',
              total:15
            },{
              label:'sql3',
              value:'3',
              total:15
            },{
              label:'sql4',
              value:'4',
              total:15
            },{
              label:'sql5',
              value:'5',
              total:15
            }]
        }
      },
      formChange(){
        console.log(1)
      }
    }
  }
</script>
```
:::


### Page-Select Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |------|
| v-model   | 绑定值 | object      |                  —                |  — |
| option    | 表单对象 | object | — | — |
|      > label    | 表单label | String | — | — |必填
|      > param    | 表单项的参数 | String | — | — |必填
|      > paramKey    | 表单项的key,当下拉选项array中的label和value不一致时需要传| array | — | — |
|      > single    | 单选| boolean | — | false |
|      > callback    | 查询下拉选项的回调| function | — | — |
|      > array    | 下拉选项列表,使用options替代| Array | — | — |
|      > options    | 下拉选项列表| Array | — | — |
|      > > label    | 选项中文名| string | — | — |必填
|      > > value    | 选项值| string | — | — |必填
|      > > total    | 下拉选项总条目| number | — | — |必填


###  Page-Select Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| formchange | 表单项修改后触发 | form |



