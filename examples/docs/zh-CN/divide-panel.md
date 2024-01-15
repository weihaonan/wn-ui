## Divide-panel 分割块

区隔内容的分割头，一般用于侧滑框

### 基本用法

对不同章节的区域进行分割。

:::demo
```html
<dbsec-divide-panel
  title='基本信息'>
    <div>类型：国产数据库</div>
    <br>
    <div>名称：mysql</div>
</dbsec-divide-panel>
<dbsec-divide-panel
  title='地址信息'>
    <div>ip：1.1.1.1</div>
    <br>
    <div>端口：22</div>
</dbsec-divide-panel>
<script>
  export default {
    data() {
      return {}
    },
  }
</script>
```
:::

### 带操作功能

:::demo
```html
<dbsec-divide-panel
  title='基本信息'>
  <template slot='extra'>
    <dbsec-button>chax</dbsec-button>
  </template>
    <div>类型：国产数据库</div>
    <br>
    <div>名称：mysql</div>
</dbsec-divide-panel>
<dbsec-divide-panel
  title='地址信息'>
    <div>ip：1.1.1.1</div>
    <br>
    <div>端口：22</div>
</dbsec-divide-panel>
<script>
  export default {
    data() {
      return {
        btnList:[
          {
            label:'新增',
            callback:this.clickBtn,
            type:'primary'
          },
          {
            label:'重置',
            callback:this.reset,
          }
        ]
      }
    },
    methods:{
      clickBtn(){
        console.log('add')
      },
      reset(){
        console.log('reset')
      }
    }
  }
</script>
```
:::


### Divide panel Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |------|
| title   | 标题 | string      |                  —                |  — |必填
| extraBtn   | 操作按钮 | Array      |                  —                |  — |
| >label   | 按钮名称 | string      |                  —                |  — |
| >callback   | 点击按钮回调 | function      |                  —                |  — |
| >type   | 按钮类型，primary表示主按钮，不传表示副按钮，primary按钮会统一排在右侧 | string      |                primary               |  — |




