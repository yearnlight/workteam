export default {
  statusList: [
    { label: "待分配", value: "waitAssign", color: "#409EFF", isInit: true },
    { label: "待办", value: "backlog", color: "#F56C6C", isAuto: true },
    { label: "搁置", value: "shelve", color: "#909399", isInit: true },
    { label: "需求分析中", value: "demanding", color: "#E6A23C" },
    { label: "设计中", value: "designing", color: "#9764e0" },
    { label: "编码中", value: "coding", color: "#e06ab7" },
    { label: "测试中", value: "testing", color: "#333333" },
    { label: "完结", value: "end", color: "#67C23A" }
  ],
  projectTypeList: [
    { label: "Web", value: "web", color: "#409EFF" },
    { label: "Java", value: "java", color: "#F56C6C" },
    { label: "Go", value: "go", color: "#E6A23C" },
    { label: "配置", value: "config", color: "#67C23A" },
    { label: "公共", value: "common", color: "#9764e0" },
    { label: "会议", value: "meet", color: "#9764e0" },
    { label: "设计", value: "design", color: "#e06ab7" },
  ],
  prioritys: [
    {
      label: "高",
      value: "high",
      color: "#F56C6C"
    },
    {
      label: "中",
      value: "middle",
      color: "#E6A23C"
    },
    {
      label: "低",
      value: "low",
      color: "#409EFF"
    }
  ]
};
