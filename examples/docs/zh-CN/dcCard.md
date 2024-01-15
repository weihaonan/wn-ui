## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法


包含标题，内容和操作。

:::demo Card 组件title表示标题，`extraBtn`表示操作按钮，`type`为primary代表重要按钮，默认放到右侧
```html
<dbsec-card
  title='参数配置'
  :extraBtn='btnList'>
  <div v-for="o in 4" :key="o">
    {{'列表内容 ' + o }}
  </div>
</dbsec-card>
<script>
  export default {
    data(){
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

### Card Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |------|
| title   | 标题 | string      |                  —                |  — |必填
| extraBtn   | 操作按钮 | Array      |                  —                |  — |
| >label   | 按钮名称 | string      |                  —                |  — |
| >callback   | 点击按钮回调 | function      |                  —                |  — |
| >type   | 按钮类型，primary表示主按钮，不传表示副按钮，primary按钮会统一排在右侧 | string      |                primary               |  — |
