## Timeline 时间线

可视化地呈现时间流信息。

### 基础用法

Timeline 可拆分成多个按照时间戳正序或倒序排列的 activity，时间戳是其区分于其他控件的重要特征，使⽤时注意与 Steps 步骤条等区分。

:::demo
```html
<div class="block">
  <div class="radio">
      <dbsec-radio 
        v-model="reverse" 
        :options="radioList"
        @input='change'
        ></dbsec-radio>
  </div>

  <dbsec-timeline 
    :reverse="reverse"
    :array='timeList'>
  </dbsec-timeline>
</div>

<script>
  export default {
    data() {
      return {
        radioList:[
          {
            label:'倒序',
            value:true
          },
          {
            label:'正序',
            value:false
          }
        ],
        reverse: true,
        timeList: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
      };
    }
  };
</script>
```
:::

### ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

:::demo
```html
<div class="block">
  <dbsec-timeline
    :array='timeList'>
  </dbsec-timeline>
</div>

<script>
  export default {
    data() {
      return {
        timeList: [{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }]
      };
    }
  };
</script>
```
:::

### ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

:::demo 使用
```html
<div class="block">
  <dbsec-timeline
    :array='timelineList'>
    <template slot='time1'>
      <dbsec-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </dbsec-card>
    </template>
    <template slot='dot1'>
      <i class='el-icon-message-solid'></i>
    </template>
    <template slot='time2'>
      <dbsec-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </dbsec-card>
    </template>
    <template slot='time3'>
      <dbsec-card>
        <h4>更新 Github 模板</h4>
       <p>王小虎 提交于 2018/4/3 20:46</p>
      </dbsec-card>
    </template>
    <template slot='time4'>
      <dbsec-card>
        <h4>更新 Github 模板</h4>
       <p>王小虎 提交于 2018/4/2 20:46</p>
      </dbsec-card>
    </template>
  </dbsec-timeline>
</div>
<script>
  export default {
    data(){
      return {
        timelineList:[{
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          placement:'top',
          slot:'time1',
          slotDot:'dot1'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          placement:'top',
          slot:'time2',
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          placement:'top',
          slot:'time3',
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46',
          placement:'top',
          slot:'time4',
        }]
      }
    }
  }
</script>
```
:::

### Timeline Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| reverse | 指定节点排序方向，默认为正序 | boolean | — | false |
| array | 时间线列表 | array | — | - |
| > slot | 时间线自定义内容插槽具名 | string | — | - |
| > slotDot | 时间线自定义节点插槽具名 | string | — | - |
| > timestamp     | 时间戳 | string  | - | — |
| > hide-timestamp  | 是否隐藏时间戳 | boolean | — | false |
| > placement | 时间戳位置 | string | top / bottom | bottom |
| > type | 节点类型 | string | primary / success / warning / danger / info | - |
| > color | 节点颜色 | string | hsl / hsv / hex / rgb | - |
| > size | 节点尺寸 | string | normal / large | normal |
| > icon | 节点图标 | string | — | - |


