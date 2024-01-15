## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。

```html
<dbsec-progress :percentage="50"></dbsec-progress>
<dbsec-progress :percentage="100" :format="format"></dbsec-progress>

<script>
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>
```
:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```html
<dbsec-progress :text-inside="true" :stroke-width="26" :percentage="70"></dbsec-progress>
```
:::


### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap  | circle/dashboard 类型路径两端的形状 | string | butt/round/square | round |
| format  | 指定进度条文字内容 | function(percentage) | — | — |
| define-back-color  | 指定进度条底色（支持 hex 格式） | string | — | — |
| text-color  | 指定进度条字体颜色（支持 hex 格式） | string | — | — |
