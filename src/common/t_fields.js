export default {
  list: {
    name: "任务列表",
    tableColumns: [
      {
        prop: "name",
        label: "任务",
        operateFun: { function: "info" },
        "show-overflow-tooltip": true
      },
      {
        prop: "owner",
        label: "所有者"
      },
      {
        prop: "status",
        label: "状态",
        renderPage: "status"
      },
      {
        prop: "label",
        label: "标签"
      },
      { prop: "startTime", label: "开始时间" },
      { prop: "endTime", label: "到期时间" },
      { prop: "estimatedTime", label: "预期时间" },
      { prop: "priority", label: "优先级", renderPage: "priority" },
      { prop: "creator", label: "创建者" },
      { prop: "finished", label: "%已完成", renderPage: "progress" },
      {
        prop: "operate",
        label: "操作",
        width: "220",
        operateFun: [
          {
            label: "编辑",
            function: "edit",
            icon: "el-icon-edit"
          },
          {
            label: "删除",
            function: "del",
            icon: "el-icon-delete"
          }
        ]
      }
    ]
  },
  user: {
    name: "任务列表",
    tableColumns: [
      {
        prop: "name",
        label: "姓名"
      },
      {
        prop: "key",
        label: "Code"
      },
      {
        prop: "department",
        label: "部门"
      },
      {
        prop: "group",
        label: "组"
      },
      {
        prop: "team",
        label: "团队"
      },
      {
        prop: "remark",
        label: "备注"
      },
      {
        prop: "operate",
        label: "操作",
        width: "220",
        operateFun: [
          {
            label: "删除",
            function: "del",
            icon: "el-icon-delete"
          }
        ]
      }
    ]
  }
};
