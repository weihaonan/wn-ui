## Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法


:::demo 只需为 Cascader 的`options`属性指定选项数组即可渲染出一个级联选择器;通过`disabled`属性禁用启用选项，接收一个`boolean`值，`true`为禁用。
```html
<dbsec-cascader
  separator='+'
  v-model="value" 
  :options="options"
  @change="handleChange"></dbsec-cascader>

<script>
  export default {
    data() {
      return {
        value: [],
        options: [{
          value: 'guochan',
          label: '国产数据库',
          children: [{
            value: 'oceanbase',
            label: 'OceanBase',
          }, {
            value: 'tidb',
            label: 'TiDB',
          }, {
            value: 'dameng',
            label: '达梦',
            disabled:true
          }, {
            value: 'oscar',
            label: 'OSCAR',
          }, {
            value: 'teledb',
            label: 'TeleDB',
          }, {
            value: 'esgyndb',
            label: 'EsgynDB',
          }]
        }, {
          value: 'guoji',
          label: '国际数据库',
          children: [{
            value: 'oracle',
            label: 'Oracle',
          }, {
            value: 'mysql',
            label: 'MySQL',
          }, {
            value: 'sqlserver',
            label: 'SQL Server',
          }]
        }, {
          value: 'dashuju',
          label: '大数据库',
          children: [{
            value: 'mongodb',
            label: 'MongoDB',
          }, {
            value: 'redis',
            label: 'Redis',
          }, {
            value: 'hive',
            label: 'Hive',
          }]
        }]
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
```
:::

### 多选

可通过 `props.multiple = true` 来开启多选模式

:::demo 在开启多选模式后，折叠选项。可以使用`clearable`实现清空功能
```html
  <dbsec-cascader
    :options="options"
    :props="props"
    clearable></dbsec-cascader>

<script>
  export default {
    data() {
      return {
        props: { multiple: true },
        options: [{
          value: 'guochan',
          label: '国产数据库',
          children: [{
            value: 'oceanbase',
            label: 'OceanBase',
          }, {
            value: 'tidb',
            label: 'TiDB',
          }, {
            value: 'dameng',
            label: '达梦',
          }, {
            value: 'oscar',
            label: 'OSCAR',
          }, {
            value: 'teledb',
            label: 'TeleDB',
          }, {
            value: 'esgyndb',
            label: 'EsgynDB',
          }]
        }, {
          value: 'guoji',
          label: '国际数据库',
          children: [{
            value: 'oracle',
            label: 'Oracle',
          }, {
            value: 'mysql',
            label: 'MySQL',
          }, {
            value: 'sqlserver',
            label: 'SQL Server',
          }]
        }, {
          value: 'dashuju',
          label: '大数据库',
          children: [{
            value: 'mongodb',
            label: 'MongoDB',
          }, {
            value: 'redis',
            label: 'Redis',
          }, {
            value: 'hive',
            label: 'Hive',
          }]
        }]
      };
    }
  };
</script>
```
:::


### 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

:::demo 和级联选择器一样，通过`options`来指定选项，也可通过`props`来设置多选、动态加载等功能，具体详情见下方API表格。
```html
<dbsec-cascader type='panel' :options="options"></dbsec-cascader>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'guochan',
          label: '国产数据库',
          children: [{
            value: 'oceanbase',
            label: 'OceanBase',
          }, {
            value: 'tidb',
            label: 'TiDB',
          }, {
            value: 'dameng',
            label: '达梦',
          }, {
            value: 'oscar',
            label: 'OSCAR',
          }, {
            value: 'teledb',
            label: 'TeleDB',
          }, {
            value: 'esgyndb',
            label: 'EsgynDB',
          }]
        }, {
          value: 'guoji',
          label: '国际数据库',
          children: [{
            value: 'oracle',
            label: 'Oracle',
          }, {
            value: 'mysql',
            label: 'MySQL',
          }, {
            value: 'sqlserver',
            label: 'SQL Server',
          }]
        }, {
          value: 'dashuju',
          label: '大数据库',
          children: [{
            value: 'mongodb',
            label: 'MongoDB',
          }, {
            value: 'redis',
            label: 'Redis',
          }, {
            value: 'hive',
            label: 'Hive',
          }]
        }]
      };
    }
  };
</script>
```
:::

### Cascader Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 选中项绑定值 | - | — | — |
| clearable | 是否可以清空选项 | boolean | — | — |
| options | 可选项数据源，键名可通过 `Props` 属性配置 | array | — | — |
| props | 配置选项，具体见下表 | object | — | — |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| filter-method | 自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中 | function(node, keyword) | - | - |
| debounce | 搜索关键词输入的去抖延迟，毫秒 | number | — | 300 |
| before-filter | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选 | function(value) | — | — |
| popper-class | 自定义浮层类名   | string | —  | — |

### Cascader Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当选中节点变化时触发 | 选中节点的值 |
| expand-change | 当展开节点发生变化时触发 | 各父级选项值组成的数组 |
| blur | 当失去焦点时触发 | (event: Event) |
| focus | 当获得焦点时触发 | (event: Event) |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 在多选模式下，移除Tag时触发 | 移除的Tag对应的节点的值 |

### Cascader Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| getCheckedNodes | 获取选中的节点 | (leafOnly) 是否只是叶子节点，默认值为 `false` |



### Props
| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| -------- | ----------------- | ------ | ------ | ------ |
| expandTrigger | 次级菜单的展开方式 | string | click / hover | 'click' |
| multiple | 是否多选 | boolean | - | false |
| checkStrictly | 是否严格的遵守父子节点不互相关联 | boolean | - | false |
| emitPath | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean | - | true |
| lazy | 是否动态加载子节点，需与 lazyLoad 方法结合使用 | boolean | - | false |
| lazyLoad | 加载动态数据的方法，仅在 lazy 为 true 时有效 | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | - | - |
| value    | 指定选项的值为选项对象的某个属性值 | string | — | 'value' |
| label    | 指定选项标签为选项对象的某个属性值 | string | — | 'label' |
| children | 指定选项的子选项为选项对象的某个属性值 | string | — | 'children' |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | — | 'disabled' |
| leaf     | 指定选项的叶子节点的标志位为选项对象的某个属性值 | string | — | 'leaf' |
