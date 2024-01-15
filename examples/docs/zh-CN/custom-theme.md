
### 在项目中改变 SCSS 变量
dbsec-ui 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 dbsec-ui 的样式变量。新建一个样式文件，例如 `element-variables.scss`，写入以下内容：
```html
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~dbsec-ui/lib/theme-chalk/fonts';

@import "~dbsec-ui/packages/theme-chalk/src/index";
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：
```JS
import Vue from 'vue'
import Element from 'dbsec-ui'
import './element-variables.scss'

Vue.use(Element)
```

:::tip
需要注意的是，覆盖字体路径变量是必需的，将其赋值为 dbsec-ui 中 icon 图标所在的相对路径即可。
:::
