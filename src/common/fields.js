export default {
  demand: {
    searchForm: {
      labels: [
        {
          name: "前端负责人",
          placeholder: "搜索前端负责人",
          field: "webMaster",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "需求名称", key: "name", value: "" },
          { name: "模块位置", key: "location", value: "" },
          { name: "开发阶段", key: "devPhase", value: "" },
          {
            name: "等级", key: "level", value: "",
            "enums": {
              "high": {
                "label": "高",
                "type": "success",
                "component": "level"
              },
              "middle": {
                "label": "中",
                "type": "warning",
                "component": "level"
              },
              "low": {
                "label": "低",
                "type": "info",
                "component": "level"
              },
            }
          },
          { name: "负责人", key: "master", value: "" },
          { name: "前端责任人", key: "webMaster", value: "" },
          { name: "后端负责人", key: "backMaster", value: "" },
          {
            name: "状态", key: "status", value: "",
            "enums": {
              "finish": {
                "label": "完成",
                "type": "success",
                "component": "dot"
              },
              "doing": {
                "label": "处理中",
                "type": "warning",
                "component": "dot"
              },
              "shelve": {
                "label": "搁置",
                "type": "info",
                "component": "dot"
              },
              "todo": {
                "label": "待处理",
                "type": "primary",
                "component": "dot"
              }
            }
          },
          { name: "创建时间", key: "createtime", value: "" },
          { name: "描述", key: "describe", value: "" }
        ]
      }
    ]
  }
}
