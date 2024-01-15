## Input 输入框

通过鼠标或键盘输入字符

:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

### 基础用法

:::demo 默认带clearable功能
```html
<dbsec-input 
  v-model="value" 
  @input='changeInput'
  placeholder="请输入内容"></dbsec-input>
<script>
export default {
  data() {
    return {
      value:1
    }
  },
  methods:{
    changeInput(val){
      console.log('触发修改',val)
    }
  }
}
</script>
```
:::


### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<dbsec-input
  placeholder="请输入内容"
  v-model="input"
  :disabled="true">
</dbsec-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```
:::
### 计数器
仅允许输入标准的数字值，可定义范围
:::demo 将`type`属性设置为`number`即可使用，使用`minNumber`属性表示允许的最小值，`maxNumber`属性表示允许的最大值。
```html
<dbsec-input
  class='input-number'
  type='number'
  v-model="num"
  :minNumber='1'
  :maxNumber='10'>
</dbsec-input>

<script>
export default {
  data() {
    return {
      num: 1
    }
  }
}
</script>
```
:::

### 密码框

:::demo 使用`show-password`属性即可得到一个可切换显示隐藏的密码框

```html
<dbsec-input placeholder="请输入密码" v-model="input" show-password></dbsec-input>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```
:::

### 带 icon 的输入框

带有图标标记输入类型

:::demo 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。
```html
<div class="demo-input-suffix">
  属性方式：
  <dbsec-input
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    v-model="input2">
  </dbsec-input>
</div>
<div class="demo-input-suffix">
  slot 方式：
  <dbsec-input
    placeholder="请输入内容"
    v-model="input4">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </dbsec-input>
</div>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::

### 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制
```html
<dbsec-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</dbsec-input>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
```
:::

### 复合型输入框

可前置或后置元素，一般为标签或按钮

:::demo 文本域高度可通过 `rows` 属性控制
```html
<div style="margin-top: 15px;">
  <dbsec-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <dbsec-button slot="append" icon="dbsec-icon-qiehuan">IP</dbsec-button>
  </dbsec-input>
</div>

<script>
export default {
  data() {
    return {
       input3: '',
      select: ''
    }
  }
}
</script>
```
:::

### 尺寸

:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 mini、medium 尺寸。
```html
<div class="demo-input-size">
  <dbsec-input
    size='medium'
    placeholder="请输入内容"
    v-model="input1">
  </dbsec-input>
  <dbsec-input
    placeholder="请输入内容"
    v-model="input1">
  </dbsec-input>
  <dbsec-input
    size="mini"
    placeholder="请输入内容"
    v-model="input4">
  </dbsec-input>
</div>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::


### 输入长度限制

:::demo  `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。默认textarea长度1024，其他255；当类型是texarea时，默认显示字数限制，可以通过设置`show-word-limit`属性来关闭。
```html
<dbsec-input
  type="text"
  placeholder="请输入内容"
  v-model="text"
  maxlength="10"
>
</dbsec-input>
<div style="margin: 20px 0;"></div>
<dbsec-input
  type="textarea"
  placeholder="请输入内容"
  v-model="textarea"
  maxlength="30"
>
</dbsec-input>

<script>
export default {
  data() {
    return {
      text: '',
      textarea: ''
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea,number 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| minNumber | 设置计数器允许的最小值,只在type为number时生效           | number | — | -Infinity |
| maxNumber | 设置计数器允许的最大值,只在type为number时生效         | number | — | Infinity |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度,      | number          |  —  | 255；只有当type=textarea时，默认为1024 |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  —  | true |
| placeholder   | 输入框占位文本    | string          | — | — |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          |  medium/mini  | - |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| auto-complete | 下个主版本弃用 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |

### Input Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| input | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| value         | 必填值，输入绑定值   | string  | — | — |
| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |
| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popper-class | Autocomplete 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |
| label | 输入框关联的label文字 | string | — | — |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |

### Autocomplete Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### Autocomplete Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义输入建议，参数为 { item } |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Autocomplete Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
