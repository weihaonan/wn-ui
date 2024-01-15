## Small card 小卡片
用于列表展示

### 基础用法

:::demo 使用具名为`aside`的`slot`插入自定义侧边栏，
```html
<div style='width:450px;'>
  <el-row>
    <dbsec-small-card 
      :params='params'
      :btnList='btnList'
      title='名称：192.168.1.250'>
      <div slot='aside' style="width:100%;height:100%;">
        <div style="justify-content: center;display: flex;">
            <i class='dbsec-icon-sql' style='font-size:40px'></i>
        </div>
      </div>  
      <div>
        每秒语句量：11
      </div>
      <div>
        每秒会话量：12
      </div>
    </dbsec-small-card>
  </el-row>
  <br>
  <el-row>
    <dbsec-small-card 
      :params='params'
      :btnList='btnList'
      title='名称：192.168.1.250'>
      <div>
        每秒语句量：11
      </div>
      <div>
        每秒会话量：12
      </div>
    </dbsec-small-card>
  </el-row>
</div>

<script>
  export default {
    data(){ 
      return {
        params:{
          title:'参数'
        },
         btnList:[
          {
            label:'编辑',
            callback:this.edit,
          },
          {
            label:'删除',
            callback:this.delete,
          }
        ]
      }
    },
    methods:{
      edit(params){
        console.log('参数',params)
      },
      delete(){
        console.log('reset')
      }
    }
  }
</script>
```
:::

### 自定义标题

:::demo 使用具名为`title`的`slot`插入自定义标题
```html
<div style='width:450px;'>
  <dbsec-small-card 
    :btnList='btnList'>
      <div slot='title'>
        自定义title
      </div>
      <div>
      每秒语句量：11
    </div>
    <div>
      每秒会话量：12
    </div>
  </dbsec-small-card>
</div>

<script>
  export default {
    data(){ 
      return {
         btnList:[
          {
            label:'编辑',
            callback:this.edit,
          },
          {
            label:'删除',
            callback:this.delete,
          }
        ]
      }
    },
    methods:{
      edit(){
        console.log('add')
      },
      delete(){
        console.log('reset')
      }
    }
  }
</script>
```
:::

### 大卡片

:::demo 通过使用`type`属性指定卡片类型，除了默认类型，还提供了large类型
```html
<dbsec-small-card 
  title='客户端IP'
  class='box-card'
  type='large'
  :btnList='btnList'>
    <template slot='aside'>
      <i class='dbsec-icon-IPdizhi' style='font-size:80px'></i>
    </template> 
    <div>
      自定义
      <font size=4>3</font>
    </div>
    <div>
      清单导入
      <font size=4>3</font>
    </div>
    <div>
      分组
      <font size=4>3</font>
    </div>
</dbsec-small-card>
<script>
  export default {
    data(){ 
      return {
         btnList:[
          {
            label:'查看',
            callback:this.check,
          },
        ]
      }
    },
    methods:{
      check(){
        console.log('check')
      },
    }
  }
</script>
```
:::

### Small card Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |------|
| title   | 标题 | string      |                  —                |  — |必填
| params   | 参数,作为操作按钮的参数 | object      |                  —                |  — |
| btnList   | 操作按钮 | Array      |                  —                |  — |
| >label   | 按钮名称 | string      |                  —                |  — |
| >callback   | 点击按钮回调 | function      |                  —                |  — |

### Small card Slot
| name | 说明 |
|------|--------|
| title | 插入自定义标题的内容 |
| aside | 插入自定义侧边 |