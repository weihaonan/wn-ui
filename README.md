## 基于 Element UI 封装的一套适用于快速搭建后台管理界面的 UI 组件库

## Install
```shell
npm install wn-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import wnui from 'wn-ui'

Vue.use(wnui)

// or
import {
  Select,
  Button
  // ...
} from 'wn-ui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
