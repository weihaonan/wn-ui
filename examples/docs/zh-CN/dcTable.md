## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格

基础的表格展示用法。

:::demo `columns`参数代表列信息列表，`data`参数表示表数据.
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      computed:{
        columns(){
          return [
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "name",
            },
            { 
              label: "客户端IP", 
              param:'clientIp',
            },
          ]
        },
      },
      data() {
        return {
          formItems:[],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }],
        }
      },
    }
  </script>
```
:::

### 带分页表格

分页表格展示用法。

:::demo `pageParams`属性有值就表示打开分页功能,默认每页显示个数有10、20、50、100四个选项，默认选择20
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      :pageParams='pageParams'
      v-on:changeSize='changeSize'
      v-on:handleSizeChange='handleSizeChange'
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          pageParams:{
            pageNum: 1,
            pageSizes: [10, 20, 50, 100],
            pageSize: 20,
            total:4,
          },
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "name",
            },
            { label: "客户端IP", param:'clientIp' },
          ],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }]
        }
      },
      methods:{
        changeSize(page){
          console.log(page)
        },
        handleSizeChange(size){
          console.log(size)
        }
      }
    }
  </script>
```
:::

### 简约表格


:::demo `smallTable`参数代表打开表格简约模式，没有边框，分页是极简模式
```html
  <template>
    <dbsec-table
      selection
      smallTable
      :columns="columns"
      :data="tableData"
      :pageParams='pageParams'
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          pageParams:{
            pageNum: 1,
            total:4,
          },
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "name",
            },
            { label: "客户端IP", param:'clientIp' },
          ],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }]
        }
      },
    }
  </script>
```
:::
### 切换显示列

表格列的显示隐藏

:::demo `operColspan`参数代表打开显示隐藏列功能,通过`hide`属性控制默认是否隐藏,`fixShow`表示锁定状态
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      operColspan
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
              fixShow:true,
            },
            {
              label: "SQL语句",
              param: "sql",
            },
            { 
              label: "客户端IP", 
              param:'clientIp' ,
              hide:true
            },
          ],
          tableData: [{
            date: '2016-05-02',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }]
        }
      }
    }
  </script>
```
:::
### 自定义列模板

自定义列的显示内容，可组合其他组件使用。

:::demo 向`columns`参数添加`slotName`属性开启自定义功能，通过Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      >
      <template slot='date' slot-scope="{item}">
        <i class="el-icon-time"></i>
        <span>{{item.date}}</span>
      </template>

      <template slot='name' slot-scope="{ item }">
        <dbsec-button>{{item.sql}}</dbsec-button>
      </template>

      <template slot='clientIp' slot-scope="{ item }">
        <dbsec-edit-text
          ref='edit-text'
          v-model='item.clientIp'
          @saveCb='saveCb($event,item)'></dbsec-edit-text>
      </template>
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
              slotName:'date',
            },
            {
              label: "SQL语句",
              param: "sql",
              slotName:'name',
            },
            { label: "客户端IP", param:'clientIp',slotName:'clientIp' },
          ],
          tableData: [{
            date: '2016-05-02',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }]
        }
      },
      methods:{
        saveCb($event,item){
          item.clientIp = $event;
          this.$refs['edit-text'].close();
        }
      }
    }
  </script>
```
:::
### 拖动列

表格列可以拖动换位置

:::demo `isDragColumn`参数代表打开拖动列功能
```html
  <template>
    <dbsec-table
      isDragColumn
      :columns="columns"
      :data="tableData"
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "sql",
            },
            { label: "客户端IP", param:'clientIp' },
          ],
          tableData: [{
            date: '2016-05-02',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            sql: 'Select * from table1',
            clientIp: '10.10.10.1'
          }]
        }
      }
    }
  </script>
```
:::
### 固定列

横向内容过多时，可选择固定列。

:::demo 固定列需要使用`fixed`属性，它接受 `Boolean` 值或者left right，表示左边固定还是右边固定。
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      data() {
        return {
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
              fixed:true
            },
            {
              label: "SQL语句",
              param: "name",
            },
            { label: "客户端IP", param:'clientIp',width:'300px' },
            { label: "省市", param:'province',width:'300px' },
            { label: "市区", param:'city',width:'300px' },
            { label: "邮箱", param:'zip',width:'300px' },
          ],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, 
          {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          },
          ]
        }
      }
    }
  </script>
```
:::

### 二次筛选表格

在表头增加二次筛选功能。

:::demo 通过像`columns`属性添加`expand`字段代表开启二次筛选功能；添加`seniorFormItems`字段，表示筛选框参数，格式按照`dbsec-form`的格式传
```html
  <template>
    <dbsec-table
      :columns="columns"
      :data="tableData"
      @upSort='upSort'
      @filterTable='filterTable'
      >
    </dbsec-table>
  </template>

  <script>
    export default {
      computed:{
        columns(){
          return [
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "name",
              expand:['sort'],
            },
            { 
              label: "客户端IP", 
              param:'clientIp',
              expand:['sort', 'lock', {
                type: 'filter',
                param: 'clientIp',
              }],
              seniorFormItems: [
                {
                  label: "数据库",
                  param: "databaseName",
                  formType:'pageselect',
                  fixLabel: true,
                  noCache: true, // 不要缓存
                  callback: this.getArray,
                  array:this.formItems
                }
              ]
            },
          ]
        },
      },
      data() {
        return {
          formItems:[],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }],
        }
      },
      methods:{
        upSort(){
          console.log(arguments)
        },
        getArray(){
          this.formItems = [
            {
              label:'1',
              value:1,
              total:2
            },
            {
              label:'2',
              value:2,
              total:2
            }
          ]
        },
        filterTable(obj){
          console.log(obj)
        }
      }
    }
  </script>
```
:::

### 多选

选择多行数据时使用 Checkbox。

:::demo 使用`selection`属性开启多选功能,`checkSelectable`事件仅对 type=selection 的列有效，判断单行是否可以勾选
```html
  <template>
    <dbsec-table
      ref='multipleTable'
      selection
      :columns="columns"
      :data="tableData"
      @selection-change="handleSelectionChange"
      @checkSelectable='selectableCb'
      >
    </dbsec-table>
     <div style="margin-top: 20px">
      <dbsec-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</dbsec-button>
      <dbsec-button @click="toggleSelection()">取消选择</dbsec-button>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          columns:[
            {
              label: "捕获时间",
              param: "date",
              // align: 'center'
              width: "120",
            },
            {
              label: "SQL语句",
              param: "name",
            },
            { label: "客户端IP", param:'clientIp',width:'300px' },
          ],
          tableData: [{
            date: '2016-05-02',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-04',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, {
            date: '2016-05-01',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          }, 
          {
            date: '2016-05-03',
            name: 'Select * from table1',
            clientIp: '10.10.10.1'
          },
          ]
        }
      },
      methods:{
        selectableCb(row,callback){
          if(row.index==1){
            callback(false)
          }
        },
        handleSelectionChange(rows){
          console.log(rows)
        },
        toggleSelection(rows){
           if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        }
      }
    }
  </script>
```
:::
### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- | ------|
| data | 显示的数据 | array | — | — | 必填
| columns | 表格列列表 | array | — | — | 必填
| >label | 列名称  | string | — | — | 必填
| >param | 列的key  | string | — | — | 必填
| >slotName | 插槽名称，当列需要自定义时使用  | string | — | — | 
| >hide | 隐藏列  | boolean | — | false | 
| >fixShow | 锁定显示列，hide不为false时使用 | boolean | — | false | 
| >customHeader | 开启自定义表头功能  | boolean | — | false | 
| >fixed | 固定列  | boolean | — | false | 
| >expand | 开启二次筛选功能,sort表示排序功能，lock表示锁定功能  | Array | ['sort','lock',{}]| - | 
| >seniorFormItems | 二次筛选的筛选框表单项，只有expand字段中包含{}有效  | Array | -| 格式参照dbsec-form的参数格式 | 
| size | Table的尺寸  | string | — | medium /small/mini | 
| pageParams | 分页配置,有值表示带分页| object |—— | —— | 
| > pageNum | 当前页| number |—— | 1 | 
| > pageSizes | 每页显示个数选择器的选项设置| array |—— | [10,20,50,100] | 
| > total | 总条目数| number |—— | -- | 
| > pageSize | 每页显示条目个数| number |—— | 20 | 
| operColspan | 开启表头显示隐藏功能 | boolean |—— | false | 
| selection | 开启多选功能 | boolean |—— | false | 
| crossCheck | 开启跨页多选功能 | boolean |—— | false | 
| rowKey | 行数据的key，跨页全选时必填 | string | — | — | 
| smallTable | 表格一种类型，开启后表示没有跨页全选，分页最多三个标签，无background，layout只有prev,pager,next,total  | boolean | — | false | 
| emptyJson | 表格为空时的文字图片  | object | — | —— | 
| > image-size | 图片大小  | string | — | —— | 
| > image | 图片客户端IP  | string | — | —— | 
| > text | 文本  | string | — | —— | 
| height | 表格高度  | string/number | — | —— | 
| isDragColumn | 开启拖动列功能  | boolean | — | false | 


### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| handleSizeChange | 切换每页显示条数时触发 | 每页显示条目个数 |
| changeSize | 换页时触发 | 当前页 |
| row-click | 当某一行被点击时会触发该事件 | row |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| checkSelectable| 判断行是否可以被勾选,第一个参数表示行数据;第二个参数是回调函数，如不可勾选，传false | row,callback |
| sumTotal| 多选框切换选中后回调，只在selection为true时有效 | selectedNum,checkAll,nocheckList |
| upSort| 点击升序时触发，只在开启排序功能有效 | column,sortValue |
| downSort| 点击降序时触发，只在开启排序功能有效 | column,sortValue |
| filterTable| 点击二次筛选查询按钮时触发，只在开启筛选功能有效 | column |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态 | row |
| clearSelection | 用于多选表格，清空用户的选择 |  |

### Table Slot
| name | 说明 |
|------|--------|
| empty | 数据为空时的自定义展示|