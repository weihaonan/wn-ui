## Collapse 折叠面板

通过折叠面板收纳内容区域

### 基础用法

可同时展开多个面板，面板之间不影响

:::demo
```html
<dbsec-collapse v-model="activeNames" @change="handleChange">
  <dbsec-collapse-item title="基本信息" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="地址信息" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="高级设置" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </dbsec-collapse-item>
</dbsec-collapse>
<script>
  export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>
```
:::

### 手风琴效果

每次只能展开一个面板

:::demo 通过 `accordion` 属性来设置是否以手风琴模式显示。
```html
<dbsec-collapse v-model="activeName" accordion>
  <dbsec-collapse-item title="基本信息" name="1">
    <dbsec-form :model="form" ref="elform" :formItems="formdata">
      <template slot="time">
        <dbsec-timeDate
          ref="timeDate"
          v-model="form.time"
          style="width: 380px"
          isCookie
          isSearch
        >
        </dbsec-timeDate>
      </template>
      <template slot="submitBtn">
          <dbsec-button type="primary" v-on:click="onSubmit">提交</dbsec-button>
        </template>
    </dbsec-form>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="地址信息" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="高级设置" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </dbsec-collapse-item>
</dbsec-collapse>
<script>
  export default {
    data() {
      return {
        activeName: '1',
        form:{
          name: "",
          databaseName:'',
          databaseId:[],
          scope: "",
          delivery: false,
        },
         formdata: [
          {
            formType: "input",
            label: "规则名称",
            param: "name",
            show:true
          },
          {
            label: "数据库",
            formType: "pageselect",
            param: "databaseName",
            paramKey:'databaseId',
            callback:this.callback,
            array:[{
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
          {
            formType: "select",
            label: "作用域",
            param: "scope",
            array: [
              {
                label: "语句",
                value: "1",
              },
              {
                label: "会话",
                value: "2",
              },
            ],
          },
          {
            formType: "switch",
            label: "开启功能",
            param: "delivery",
          },
         ]
      };
    }
  }
</script>
```
:::

### 关闭折叠功能 

默认全部展开，不能折叠。常用于区隔内容的分割头，一般用于侧滑框

:::demo 使用`noCollapse`属性关闭折叠功能，接收一个`boolean`值，为`true`表示关闭折叠功能
```html
<dbsec-collapse noCollapse>
  <dbsec-collapse-item 
    :extraBtn='baseBtn'>
    <template slot="title">
      基本信息<i class="header-icon el-icon-info"></i>
    </template>
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="地址信息">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </dbsec-collapse-item>
  <dbsec-collapse-item title="高级设置">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </dbsec-collapse-item>
</dbsec-collapse>
<script>
  export default {
    data(){
      return {
        baseBtn:[
          {
            label:'保存',
            type:'primary',
            callback:this.save,
          }
        ]
      }
    },
    methods:{
      save(item){
        console.log(item)
      }
    }
  }
</script>
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | string / array | — | — |
| accordion | 是否手风琴模式 | boolean | — | false |
| noCollapse | 是否关闭折叠功能,为false时，extraBtn失效 | boolean | — | false |
| extraBtn   | 操作按钮，只有noCollapse为true时，生效 | Array      |                  —                |  — |
| >label   | 按钮名称 | string      |                  —                |  — |
| >callback   | 点击按钮回调 | function      |                  —                |  — |
| >type   | 按钮类型，primary表示主按钮，不传表示副按钮，primary按钮会统一排在右侧 | string      |                primary               |  — |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`) | (activeNames: array / string) |

### Collapse Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name      | 唯一标志符      | string/number | —     | —    |
| title     | 面板标题        | string        | —     | —    |
| extra     | 面板标题        | string        | —     | —    |
| disabled  | 是否禁用        | boolean       | —     | —    |
