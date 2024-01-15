<template>
  <div> 
    <dbsec-search-container
  :formObj="form"
  :formList="formdata"
  :data="tableData"
  showPage
  :columns="columns"
  v-on:searchTable="searchTable">
  <template slot="time">
    123
  </template>
</dbsec-search-container>
<dbsec-timeDate
  pickerType="week"
  v-model="time">
</dbsec-timeDate>
  </div>


</template>
<script>
  export default {
    data() {
      return {
        time:[],
        form: {
           password: "",
          name:'',
          time:[],
        },
         formdata: [
          {
            formType: "other",
            param: "time",
            label: "时间",
          },
          {
            formType: "input",
            label: "规则名称",
            param: "password",
          },
         ],
         tableData: [
          {
            ruleName: 'Oracle_权限不足',
            scope: "会话",
            source:'自定义'
          },
          {
            ruleName: 'Oracle_用户不存在',
            scope: "语句",
            source:'内置规则'
          },
        ],
         columns:[
          {
            label: "规则名称",
            param: "ruleName",
            // align: 'center'
            width: "200",
          },
          {
            label: "作用域",
            param: "scope",
            hideOverflowTooltip: true,
          },
          { label: "来源", param: "source", hideOverflowTooltip: true },
        ],
      }
    },
    methods: {
      searchTable(form) {
        console.log(form);
      },
      changeTime(type,time){
        console.log(time)
      }
    }
  }
</script>