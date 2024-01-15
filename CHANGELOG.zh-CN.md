## 更新日志

### 0.0.2

*2024-01-04*

#### 优化
- Form
  - validateForm方法改为validate方法，validateForm仍保留
  - formItems属性的array字段修改为options，其他有多个选项的也改为options，array仍保留
- Page-select
  - option属性的array字段修改为options，array仍保留
- Drop-down
  - array属性改为options，array仍保留
- Table
  - 增加了二次筛选、排序、锁定功能，通过传递expand属性开启

### 0.0.1

*2023-09-14*

#### 优化
- Form
  - 表单对象去掉了show属性，默认都显示
  - 参数修改：form修改为model，formData修改为formItems
- Table
  - 去掉stripe属性，默认为true
  - selectable事件名称改为checkSelectable
- page-select
  - inputs属性修改为v-model
- Drawer
  - submitItem属性修改为submitChange
- Upload
  - @change事件改成:on-change属性绑定，参数改为file，fileList，参照element_ui

