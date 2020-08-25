export default {
  list: {
    name: "任务列表",
    tableColumns: [
      {
        prop: "taskName",
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
      { prop: "duration", label: "持续时间" },
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
  }
};
