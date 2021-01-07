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
              if (item) {
                let token = sessionStorage.getItem("token");
                if (!token) {
                  return false
                }
                let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
                return (
                  curUser.role == "super" ||
                  (item.owner && item.owner.includes(curUser.name))
                );
              }
              else {
                return true;
              }
            }
          },
          {
            label: "删除",
            function: "del",
            icon: "el-icon-delete",
            isDisplay(item) {
              if (item) {
                let token = sessionStorage.getItem("token");
                if (!token) {
                  return false
                }
                let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
                return (
                  curUser.role == "super" ||
                  (item.owner && item.owner.includes(curUser.name))
                );
              }
              else {
                return true;
              }
            }
          }
        ]
      }
    ]
  },
  event: {
    name: "事件列表",
    tableColumns: [
      {
        prop: "title",
        label: "标题",
      },
      {
        prop: "level",
        label: "等级",
        renderPage: "level"
      },
      {
        prop: "desc",
        label: "描述",
        showOverflowTooltip: true
      },
      {
        prop: "username",
        label: "触发者",
      },
      {
        prop: "createtime",
        label: "触发时间",
      },
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
              if (item) {
                let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
                return curUser.role == "super" || curUser.key == item.key;
              }
              else {
                return true;
              }
            }
          },
          {
            label: "编辑",
            function: "edit",
            icon: "el-icon-edit",
            isDisplay(item) {
              if (item) {
                let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
                return curUser.role == "super" || curUser.key == item.key;
              }
              else {
                return true;
              }
            }
          },
          {
            label: "修改密码",
            function: "updatePass",
            icon: "el-icon-key",
            isDisplay(item) {
              if (item) {
                return (
                  JSON.parse(sessionStorage.getItem("userInfo")).key == item.key
                );
              }
              else {
                return true;
              }
            }
          }
        ]
      }
    ]
  },
  demand: {
    "tableConfig": {
      "setting": true,
      "pagination": true,
      "isPublic": true,
      "pageSize": 10,
      "type": null
    },
    "tableColumns": [
      {
        "prop": "name",
        "label": "名称",
        "isInfo": true,
        "funName": "info",
        "operateFun": {
          "function": "info"
        },
        "show-overflow-tooltip": true
      },
      {
        "prop": "location",
        "label": "模块位置",
        "width": "",
        "show-overflow-tooltip": true
      },
      {
        "prop": "devPhase",
        "label": "开发阶段",
        "width": "",
        "show-overflow-tooltip": true
      },
      {
        "prop": "level",
        "label": "等级",
        "width": 80,
        "enums": {
          "high": {
            "label": "高",
            "type": "danger",
            "component": "level"
          },
          "middle": {
            "label": "中",
            "type": "warning",
            "component": "level"
          },
          "low": {
            "label": "低",
            "type": "primary",
            "component": "level"
          }
        }
      },
      {
        "prop": "master",
        "label": "负责人",
        "width": 80
      },
      {
        "prop": "webMaster",
        "label": "前 / 后端责任人",
        "width": 120,
        render(row) {
          return `<span class='high'>${row.webMaster || '-'}</span> / <span>${row.backMaster || '-'}</span>`
        }
      },
      {
        "prop": "status",
        "label": "状态",
        "width": 100,
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
      {
        "prop": "createtime",
        "label": "创建时间",
        "width": 140,
      },
      {
        "prop": "describe",
        "label": "描述",
        "show-overflow-tooltip": true
      },
      {
        "prop": "id",
        "label": "操作",
        "isOperate": true,
        "width": 200,
        "operateFun": [
          {
            "function": "del",
            "label": "删除",
            "icon": "el-icon-delete"
          },
          {
            "label": "编辑",
            "function": "edit",
            "icon": "el-icon-edit"
          },
          {
            "label": "处理",
            "function": "deal",
            "icon": "el-icon-check"
          }
        ]
      }
    ]
  }
};
