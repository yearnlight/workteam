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
    title: "小需求列表",
    icon: "el-icon-tickets",
    path: "/work/demand"
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
    title: "应用服务",
    icon: "el-icon-goods",
    path: "/work/store"
  },
  {
    title: "事件管理",
    icon: "el-icon-chat-line-square",
    path: "/work/event"
  },  
  {
    title: "业务管理",
    icon: "el-icon-collection",
    path: "/work/business"
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
        title: "自定义组件",
        icon: "el-icon-brush",
        path: "/work/customComponent"
      },
      {
        title: "云计算图标",
        icon: "el-icon-picture-outline-round",
        path: "/work/cloudIcon"
      },
      {
        title: "正则表达式",
        icon: "el-icon-tickets",
        path: "/work/regular"
      }
    ]
  }
];
