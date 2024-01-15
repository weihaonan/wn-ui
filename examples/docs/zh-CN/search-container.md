## Search-container

整合查询、跨页全选、表格展示的布局组件,常用于配置类检索页

### 基本用法

:::demo 在 Search-container 组件中，formObj、formList是查询表单参数，data代表表格数据、columns代表表格列,当查询项修改后自动触发searchTable方法
```html
<dbsec-search-container
  :formObj="form"
  :formList="formdata"
  :data="tableData"
  :columns="columns"
  :pageParams='pageParams'
  v-on:searchTable="searchTable">
  <template slot="time">
    <dbsec-timeDate  
      ref="timeDate"
      v-on:formchange="changeTime"
      v-model="form.time"
      style="width: 360px"
      isSearch
    ></dbsec-timeDate>
  </template>
</dbsec-search-container>
<script>
  export default {
    data() {
      return {
        pageParams:{
          pageNum: 1,
          total: 0,
          pageSize: 20,
        },
        form: {
           password: "",
          name:'',
          time:[],
        },
         formdata: [
          {
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "input",
            label: "规则名称",
            param: "password",
          },
         ],
         tableData: [
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
        ],
         columns:[
          {
            label: "规则名称",
            param: "ruleName",
            // align: 'center'
            width: "200",
          },
          {
            label: "作用域",
            param: "scope",
            hideOverflowTooltip: true,
          },
          { label: "来源", param: "source", hideOverflowTooltip: true },
        ],
      }
    },
    methods: {
      searchTable(form) {
       console.log(form,arguments)
      },
      changeTime(type,time){
        console.log(time)
      }
    }
  }
</script>
```
:::

### 带操作功能

:::demo `selection`代表开启多选功能；`v-model`代表选中项；`btnLotList`表示对选中项的操作按钮列表,只有选中后显示；`btnList`表示没有选中项时的操作列表
```html
<div style="height:300px">
  <dbsec-search-container
    selection
    v-model="selected"
    :formObj="form"
    :formList="formdata"
    :data="tableData"
    :columns="columns"
    :btnList="btnList"
    :btnLotList='btnLotList'>
    <template slot="time">
      <dbsec-timeDate  
        ref="timeDate"
        v-on:formchange="changeTime"
        v-model="form.time"
        style="width: 360px"
        isSearch
      ></dbsec-timeDate>
    </template>
  </dbsec-search-container>
  </div>
<script>
  export default {
    data() {
      return {
        selected:[], // 选中行
        form: {
           password: "",
          name:'',
          time:[],
        },
         formdata: [
          {
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "input",
            label: "规则名称",
            param: "password",
          },
         ],
         tableData: [
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
        ],
         columns:[
          {
            label: "规则名称",
            param: "ruleName",
            // align: 'center'
            width: "200",
          },
          {
            label: "作用域",
            param: "scope",
            hideOverflowTooltip: true,
          },
          { label: "来源", param: "source", hideOverflowTooltip: true },
        ],
        btnLotList:[
        {
          label: '删除',
          callback: this.deleteItem,
          show: true,
          type: 'primary',
        }],
        btnList:[
        {
          label: '新增',
          callback: this.addItem,
          show: true,
          type: 'primary',
        }],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      deleteItem(){
        console.log(item)
      },
      addItem(){
        console.log('add')
      }
    }
  }
</script>
```
:::

### 多个查询项

:::demo 当查询项超过3个时，默认只显示两个，其余部分放到更多条件内，更多条件内的查询项进行修改后需要点击查询按钮才会进行查询
```html
<dbsec-search-container
  selection
  v-model="selected"
  :formObj="form"
  :formList="formdata"
  :data="tableData"
  :columns="columns"
  :btnList="btnList"
  :btnLotList='btnLotList'
  @searchTable='searchTable'>
  <template slot="time">
    <dbsec-timeDate  
      ref="timeDate"
      v-on:formchange="changeTime"
      v-model="form.time"
      style="width: 360px"
      isSearch
    ></dbsec-timeDate>
  </template>
</dbsec-search-container>
<script>
  export default {
    data() {
      return {
        selected:[], // 选中行
        form: {
          password: "",
          name:'',
          time:[],
          scope:'',
          source:''
        },
         formdata: [
          {
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "input",
            label: "规则名称",
            param: "password",
          },
          {
            formType: "input",
            label: "作用域",
            param: "scope",
          },
          {
            formType: "input",
            label: "来源",
            param: "source",
          },
         ],
         tableData: [
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
          
        ],
         columns:[
          {
            label: "规则名称",
            param: "ruleName",
            // align: 'center'
            width: "200",
          },
          {
            label: "作用域",
            param: "scope",
            hideOverflowTooltip: true,
          },
          { label: "来源", param: "source", hideOverflowTooltip: true },
        ],
        btnLotList:[
        {
          label: '删除',
          callback: this.deleteItem,
          show: true,
          type: 'primary',
        }],
        btnList:[
        {
          label: '新增',
          callback: this.addItem,
          show: true,
          type: 'primary',
        }],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      deleteItem(){
        console.log(item)
      },
      addItem(){
        console.log('add')
      },
      searchTable(form){
        console.log(form,arguments)
      },
    }
  }
</script>
```
:::
### 自定义列表

:::demo 在 Search-container 组件中，如不使用表格展示，需要具名为`customView`的`slot`.
```html
<dbsec-search-container
  :formObj="form"
  :formList="formdata"
  :data="tableData"
  :columns="columns">
  <template slot="customView">
     <dbsec-small-card 
      style='width:400px'
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
  </template>
</dbsec-search-container>
<script>
  export default {
    data() {
      return {
        form: {
          password: "",
          name:'',
          time:[],
        },
         formdata: [
          {
            formType: "input",
            label: "规则名称",
            param: "password",
          },
         ],
         tableData: [
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
        ],
        columns:[
          {
            label: "规则名称",
            param: "ruleName",
            // align: 'center'
            width: "200",
          },
          {
            label: "作用域",
            param: "scope",
            hideOverflowTooltip: true,
          },
          { label: "来源", param: "source", hideOverflowTooltip: true },
        ],
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
    methods: {
      searchTable(form) {
        console.log(form);
      },
      changeTime(type,time){
        console.log(time)
      }
    }
  }
</script>
```
:::

### Search-container Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |------|
| formObj   | 查询绑定值 | object      |                  —                |  — |必填
| formList    | 查询表单列表 | Array | — | — |必填
| data    | 查询结果 | array | — | —— |必填
| columns | 表格列列表 | array | — | — |必填
| selection | 开启表格多选功能 | boolean | — | false |
| btnList | 操作按钮列表 | array | — | — |
| btnLotList | 选中项的操作按钮列表，只有多选时有效 | array | — | — |


### Search-container Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| searchTable | 查询项修改后触发 | form |
| changeSize | 切页后触发 | page |
| handleSizeChange | 修改每页条目数后触发 | number |

### Search-container Slots
|   name  | 说明     |
|---------|---------|
|    customView | 使用自定义的列表展示 |



