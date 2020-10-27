export default [
  {
    title: "任务面板",
    path: "/work/panel",
    icon: "el-icon-files"
  },
  {
    title: "任务列表",
    icon: "el-icon-menu",
    path: "/work/tasklist"
  },
  {
    title: "成员列表",
    icon: "el-icon-user",
    path: "/work/userlist"
  },
  {
    title: "知识地图",
    icon: "el-icon-reading",
    path: "/work/knowledgeMap"
  },
  {
    title: "工具管理",
    icon: "el-icon-magic-stick",
    children: [
      {
        title: "SSH",
        icon: "el-icon-s-platform",
        path: "/work/webssh"
      },
      {
        title: "表单自动生成",
        icon: "el-icon-edit-outline",
        path: "/work/formGenerator"
      },
      {
        title: "正则表达式",
        icon: "el-icon-tickets",
        path: "/work/regular"
      }
    ]
  }
];
