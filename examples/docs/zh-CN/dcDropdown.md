## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单;如需点击触发下拉，将`trigger`属性设置为click即可

```html
<dbsec-dropdown
  :options='dropArray'>
  <span class="el-dropdown-link">
    用户操作<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
</dbsec-dropdown>
<script>
  export default {
    data(){
      return {
        dropArray:[
          {
            label:'用户资料',
            value:'info'
          },
          {
            label:'修改密码',
            value:'psw'
          },
          {
            label:'密码策略',
            value:'tool'
          },
          {
            label:'退出',
            value:'exit'
          }
        ]
      }
    },
  }
</script>
<style>
  .dbsec-dropdown-link {
    cursor: pointer;
    color: #f08300;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::

### 触发对象

可使用按钮触发下拉菜单。

:::demo 设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。

```html
<dbsec-dropdown
  :options='dropArray'>
   <dbsec-button type="primary">
    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </dbsec-button>
</dbsec-dropdown>
<dbsec-dropdown
  type='primary'
  split-button
  :options='dropArray'>
    <div>更多菜单</div>
</dbsec-dropdown>

<style>
  .dbsec-dropdown {
    vertical-align: top;
  }
  .dbsec-dropdown + .dbsec-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    data(){
      return {
         dropArray:[
          {
            label:'用户资料',
            value:'info'
          },
          {
            label:'修改密码',
            value:'psw'
          },
          {
            label:'密码策略',
            value:'tool'
          },
          {
            label:'退出',
            value:'exit'
          }
        ]
      }
    },
    methods: {
      handleClick() {
        alert('button click');
      }
    }
  }
</script>

```
:::

### 触发方式

可以配置 click 激活或者 hover 激活。

:::demo 在`trigger`属性设置为`click`即可。
```html
  <div class='block'>
    <span class="demonstration">hover 激活</span>
    <dbsec-dropdown
      :options='dropArray'>
      <dbsec-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </dbsec-button>
    </dbsec-dropdown>
  </div>
  <div class='block'>
    <span class="demonstration">click 激活</span>
    <dbsec-dropdown
      trigger="click"
      :options='dropArray'>
      <dbsec-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </dbsec-button>
    </dbsec-dropdown>
  </div>
<script>
  export default {
    data(){
      return {
        dropArray:[
          {
            label:'用户资料',
            value:'info'
          },
          {
            label:'修改密码',
            value:'psw'
          },
          {
            label:'密码策略',
            value:'tool'
          },
          {
            label:'退出',
            value:'exit'
          }
        ]
      }
    }
  }
</script>
<style>
  .dbsec-dropdown-link {
    cursor: pointer;
    color: #f08300;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
```
:::

### 菜单隐藏方式

可以`hide-on-click`属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。
```html
<dbsec-dropdown
  :hide-on-click="false"
  trigger="click"
  :options='dropArray'>
  <dbsec-button type="primary">
    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </dbsec-button>
</dbsec-dropdown>
<script>
  export default {
    data(){
      return {
        dropArray:[
          {
            label:'用户资料',
            value:'info'
          },
          {
            label:'修改密码',
            value:'psw',
            disabled:true
          },
          {
            label:'密码策略',
            value:'tool'
          },
          {
            label:'退出',
            value:'exit'
          }
        ]
      }
    }
  }
</script>
<style>
  .dbsec-dropdown-link {
    cursor: pointer;
    color: #f08300;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::

### 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo
```html
<dbsec-dropdown
  @command="handleCommand"
  @click='handleClick'
  split-button
  type='primary'
  trigger="click"
  :options='dropArray'>
    更多菜单
</dbsec-dropdown>
<script>
  export default {
    data(){
      return {
        dropArray:[
          {
            label:'用户资料',
            value:'info'
          },
          {
            label:'修改密码',
            value:'psw',
            disabled:true
          },
          {
            label:'密码策略',
            value:'tool'
          },
          {
            label:'退出',
            value:'exit'
          }
        ]
      }
    },
     methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      handleClick(event){
        console.log(event)
      }
    }
  }
</script>
<style>
  .dbsec-dropdown-link {
    cursor: pointer;
    color: #f08300;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::


### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| array          | 下拉选项列表,使用options替代  | array  |          --             |    —     |
| options          | 下拉选项列表  | array  |          --             |    —     |
| > label          | 选项名  | string  |          --             |    —     |
| > value          | 选项值  | string  |          --             |    —     |
| > disabled          | 是否可选  | boolean  |          --             |    false    |
| > divided       | 显示分割线     | boolean          | — | false |
| > icon          | 图标类名 | string   |  —  |  —  | -->
| type          | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)   | string  |          primary             |    —     |
| split-button  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| placement    | 菜单弹出位置     | string | top/top-start/top-end/bottom/bottom-start/bottom-end  | bottom-end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |
| hide-on-click | 是否在点击菜单项后隐藏菜单     | boolean          | — | true |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 250 |
| hide-timeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 150 |
| tabindex      | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
| disabled      | 是否禁用        | boolean         | —                      | false |

### Dropdown Slots

| Name | 说明 |
|------|--------|
| — | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件  |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | `split-button` 为 true 时，点击左侧按钮的回调 | — |
| command  | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
