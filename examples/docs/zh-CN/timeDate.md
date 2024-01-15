## TimeDate 时间选择器

用于展示不同类型的时间选择。

### 基础选择器

基础的时间选择器展示用法。

:::demo 根据`type`值回显选中时间类型，`v-model`代表具体时间。可以使用`width`属性来定义宽度。
```html
  <template>
    <el-row>
      <el-row>
          <dbsec-timeDate
            type='t30'
            v-model="time">
          </dbsec-timeDate>
      </el-row>
      <el-row>
          <dbsec-timeDate
            type='diy'
            v-model="time1">
          </dbsec-timeDate>
      </el-row>
    </el-row>
  </template>

  <script>
    export default {
      data() {
        return {
          time:[],
          time1:['2023-09-05 00:00:00','2023-09-05 23:59:59']
        }
      }
    }
  </script>
```
:::

### 不同类型选择器

展示不同的可选时间项

:::demo 通过修改`pickerType`参数值，修改不同日期选择；`pickerType`默认值为datetimerange
```html
 <template>
    <div class="block">
      <span class="demonstration">默认</span>
      <br>
      <dbsec-timeDate
      @formchange='formc'
        v-model="time">
      </dbsec-timeDate>
    </div>

    <div class="block">
      <span class="demonstration">天</span>
       <br>
      <dbsec-timeDate
        pickerType="daterange"
        v-model="time">
      </dbsec-timeDate>
    </div>

     <div class="block">
      <span class="demonstration">周</span>
      <br>
      <dbsec-timeDate
       pickerType="week"
        v-model="time">
      </dbsec-timeDate>
    </div>

     <div class="block">
      <span class="demonstration">月</span>
       <br>
      <dbsec-timeDate
        pickerType="monthrange"
        v-model="time">
      </dbsec-timeDate>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          time:['2023-09-05 00:00:00','2023-09-05 23:59:59'],
        }
      },
      methods:{
        formc(){
          debugger
        }
      }
    }
  </script>
```
:::

### 自定义选项

展示不同的可选时间项

:::demo 通过`customPicker`参数配置不同日期选择；可选项包括`t5`, `t30`, `t60`, `lastWeek`, `curWeek`, `today`, `lastday`, `last7day`, `last30day`,`tmonth`,`lastmonth`,`diy`
```html
 <template>
    <dbsec-timeDate
      v-model="time"
      :customPicker='customPicker'
      @formchange='formc'
      >
    </dbsec-timeDate>
  </template>

  <script>
    export default {
      data() {
        return {
          time:['2023-09-05 00:00:00','2023-09-05 23:59:59'],
          customPicker:['t5', 't30', 't60', 'lastWeek', 'curWeek', 'today']
        }
      },
      methods:{
        formc(){
         
        }
      }
    }
  </script>
```
:::

### 自定义时间最小粒度为小时

:::demo 使用`timeToHour`来修改自定义时间的最小粒度为小时，接受一个`boolean`值
```html
<template>
    <dbsec-timeDate
      timeToHour
      type='diy'
      v-model="time">
    </dbsec-timeDate>
</template>

<script>
  export default {
    data() {
      return {
        time:['2023-09-05 00:00:00','2023-09-05 23:00:00'],
      }
    }
  }
</script>
```
:::


### TimeDate Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 备注 |
|---------- |-------------- |---------- |--------------------------------  |-------- |-------|
| type | 时间类型 | string | t30、t60、today、lastday、last7day、last30day、tmonth、lastmonth、diy| — |
| value / v-model	 | 绑定时间值  | string/array | — |  | 必填
| width | 选择框宽度 | string | — | 350px |
| hasClear | 是否可清空选项 | boolean | — | false |
| editable | 文本框是否可输入 | boolean | — | false |
| pickerType | 日期选择器类型 | string | datetime / datetimerange/ monthrange | datetimerange |
| customPicker | 自定义下拉选项 | array | 't5', 't30', 't60', 'lastweek', 'tweek', 'today', 'lastday', 'last7day', 'last30day','tmonth','lastmonth' |
| isCookie | 是否需要缓存时间,为true时会从缓存中获取当前时间 | boolean | — | false |

### TimeDate Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| formChange | 时间变化后触发 | timeType:时间类型,value: 时间值 |
