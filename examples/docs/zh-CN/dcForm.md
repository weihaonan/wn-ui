## Form 表单

整合了 element-ui 的输入框、选择器、单选框、多选框、分页下拉框等控件

### 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo `form`表示表单的绑定值，跟`formdata`对象的 param 属性一一对应；通过`formdata`来渲染每一个表单域，通过 formType 属性来定义表单类型

```html
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
<script>
  export default {
    data() {
      return {
        form: {
          name: "22",
          databaseName:'',
          databaseId:[],
          scope: '1',
          delivery: false,
          order: [],
          ruleLevel: 1,
          desc: "",
          time: [],
          radisScale:11
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
          {
            formType: "select",
            label: "资产组",
            param: "dbGroup",
            multiple:true,
            options: [
              {
                label: "默认",
                value: "1",
              },
              {
                label: "组1",
                value: "2",
              },
              {
                label: "组2",
                value: "3",
              },
            ],
          },
          {   "label":"内径",
            "param":"radisScale",
            "show":true,
            "formType":"input-number"},
          {
            formType: "select",
            label: "作用域",
            param: "scope",
            options: [
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
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "other",
            param: "time",
            label: "IP",
          },
          {
            formType: "switch",
            label: "开启功能",
            param: "delivery",
          },
          {
            formType: "checkbox",
            label: "命令特征",
            param: "order",
            options: [
              {
                label: "SQL注释",
                value: 1,
              },
              {
                label: "OR关键词",
                value: 2,
              },
              {
                label: "UNION关键词",
                value: 3,
              },
              {
                label: "常量表达式",
                value: 4,
              },
            ],
          },
          {
            formType: "radio",
            label: "规则等级",
            param: "ruleLevel",
            options: [
              {
                label: "信任",
                value: 1,
              },
              {
                label: "异常",
                value: 2,
              },
            ],
          },
          {
            formType: "input",
            type: "textarea",
            label: "描述",
            param: "desc",
            'showWordLimit':true
          },
          {
            formType: "other",
            param: "submitBtn",
            show: true,
          },
        ],
      };
    },
    methods: {
      onSubmit() {
        console.log(this.form);
      },
      callback(value,page) {
        console.log(value)
        if(page==2){
          this.formdata[1].options=[
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
        } else if(page == 1){
          this.formdata[1].options = [{
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
    },
    mounted(){
    }
  };
</script>
```

:::

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo Form 组件提供了表单验证的功能，只需要在 `formdata` 属性中传入 rules 字段,`clearValidate`方法清空校验结果

```html
<dbsec-form :model="form" ref="dbsecform" :formItems="formdata">
  <template slot="time">
    <dbsec-timeDate
      ref="timeDate"
      v-model="form.time"
      isCookie
      isSearch
    ></dbsec-timeDate>
  </template>
  <template slot="submitBtn">
    <dbsec-button type="primary" v-on:click="submitForm('dbsecform')">提交</dbsec-button>
    <dbsec-button type="primary" v-on:click="clearValidate">清除</dbsec-button>
  </template>
</dbsec-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: "",
          scope: "",
          delivery: false,
          order: [],
          ruleLevel: 1,
          desc: "",
          time: [],
        },
        formdata: [
          {
            formType: "input",
            label: "规则名称",
            param: "name",
            rules: [
              { required: true, message: "请输入活动名称", trigger: "blur" },
              {
                min: 3,
                max: 5,
                message: "长度在 3 到 5 个字符",
                trigger: "blur",
              },
            ],
          },
          {
            formType: "select",
            label: "作用域",
            param: "scope",
            rules: [
              { required: true, message: "请选择作用域", trigger: "change" },
            ],
            options: [
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
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "switch",
            label: "开启功能",
            param: "delivery",
          },
          {
            formType: "checkbox",
            label: "命令特征",
            param: "order",
            rules: [
              {
                type: "array",
                required: true,
                message: "请选择命令特征",
                trigger: "change",
              },
            ],
            options: [
              {
                label: "SQL注释",
                value: 1,
                tip:'sss'
              },
              {
                label: "OR关键词",
                value: 2,
              },
              {
                label: "UNION关键词",
                value: 3,
              },
              {
                label: "常量表达式",
                value: 4,
              },
            ],
          },
          {
            formType: "radio",
            label: "规则等级",
            param: "ruleLevel",
            options: [
              {
                label: "信任",
                value: 1,
              },
              {
                label: "异常",
                value: 2,
              },
            ],
          },
          {
            formType: "input",
            type: "textarea",
            label: "描述",
            param: "desc",
            rules: [
              { required: true, message: "请输入描述", trigger: "blur" },
            ],
          },
          {
            formType: "other",
            param: "submitBtn",
            show: true,
          },
        ],
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
             console.log("submit!");
          }
        })
      },
      clearValidate(){
        this.$refs.dbsecform.clearValidate();
      }
    },
  };
</script>
```

:::

### Form Attributes

| 参数        | 说明                            | 类型    | 可选值                                                                           | 默认值 | 备注                           |
| ----------- | ------------------------------- | ------- | -------------------------------------------------------------------------------- | ------ | ------------------------------ |
| model        | 表单数据对象                          | object  | —                                                                                | —      |
| formItems    | 表单列表                        | Array   | —                                                                                | —      |
| > label      | 表单项 label                    | String  | —                                                                                | —      | 必填                           |
| > param      | 表单项的 key                    | String  | —                                                                                | —      | 必填                           |
| > formType   | 表单类型                        | String  | input/select/radio/input-number/checkbox/select-group/cascader/switch/pageselect | —      | 必填                           |
| > rules      | 校验规则                        | array   | —                                                                                | —      |
| > array      | 校验规则,暂停使用，用options替代                       | array   | —                                                                                | —      |
| > options      | 校验规则                        | array   | —                                                                                | —      |
| > ......      | 其余参数参照具体表单类型的参数 ，比如select、input等        | —   | —                                                                                | —      |
| inline      | 行内表单模式                    | boolean | —                                                                                | false  |
| label-width | 表单域标签的宽度，例如 '50px'。 | string  | —                                                                                | 160px  |

### Form Methods

| 方法名       | 说明                                                                                                                                                                 | 参数                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string)

### Form Events

| 事件名称   | 说明             | 回调参数 |
| ---------- | ---------------- | -------- |
| formchange | 表单项修改后触发 | form     |
