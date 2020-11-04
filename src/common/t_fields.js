export default {
  list: {
    name: "任务列表",
    tableColumns: [
      {
        prop: "name",
        label: "任务",
        renderPage: "nameTag",
      },
      {
        prop: "owner",
        label: "所有者",
        width: "70"
      },
      {
        prop: "status",
        label: "状态",
        renderPage: "status",
        width: "100"
      },
      { prop: "startTime", label: "开始时间" },
      { prop: "endTime", label: "到期时间", renderPage: "endTime" },
      {
        prop: "estimatedTime",
        label: "预期时间",
        width: "80",
        renderPage: "estimatedTime"
      },
      {
        prop: "overtime",
        label: "剩余/超时时间",
        renderPage: "overtime",
        width: "120"
      },
      {
        prop: "priority",
        label: "优先级",
        renderPage: "priority",
        width: "70"
      },
      { prop: "creator", label: "创建者", width: "70" },
      {
        prop: "finished",
        label: "%已完成",
        renderPage: "progress",
        width: "110"
      },
      {
        prop: "operate",
        label: "操作",
        width: "130",
        operateFun: [
          {
            label: "编辑",
            function: "edit",
            icon: "el-icon-edit",
            isDisplay(item) {
              let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
              return (
                curUser.role == "super" ||
                (item.owner && item.owner.includes(curUser.name))
              );
            }
          },
          {
            label: "删除",
            function: "del",
            icon: "el-icon-delete",
            isDisplay(item) {
              let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
              return (
                curUser.role == "super" ||
                (item.owner && item.owner.includes(curUser.name))
              );
            }
          }
        ]
      }
    ]
  },
  user: {
    name: "用户列表",
    tableColumns: [
      {
        prop: "name",
        label: "昵称",
        width: 140
      },
      {
        prop: "key",
        label: "账号",
      },
      {
        prop: "role",
        label: "角色",
        renderPage: "role",
      },
      {
        prop: "department",
        label: "部门",
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
        prop: "logintimes",
        label: "登录次数(次)"
      },
      {
        prop: "lastLoginTime",
        label: "上次登录时间"
      },
      {
        prop: "remark",
        label: "备注"
      },
      {
        prop: "operate",
        label: "操作",
        width: "210",
        operateFun: [
          {
            label: "删除",
            function: "del",
            icon: "el-icon-delete",
            isDisplay(item) {
              let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
              return curUser.role == "super" || curUser.key == item.key;
            }
          },
          {
            label: "编辑",
            function: "edit",
            icon: "el-icon-edit",
            isDisplay(item) {
              let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
              return curUser.role == "super" || curUser.key == item.key;
            }
          },
          {
            label: "修改密码",
            function: "updatePass",
            icon: "el-icon-key",
            isDisplay(item) {
              return (
                JSON.parse(sessionStorage.getItem("userInfo")).key == item.key
              );
            }
          }
        ]
      }
    ]
  }
};
