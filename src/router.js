import VueRouter from "vue-router";
import Menu from "./components/menu.vue";
import Axios from "axios";

const routes = [
  {
    path: "/",
    redirect: "/work"
  },
  {
    path: "/login",
    component: () => import("@/views/user/login.vue"),
    meta: {
      white: true
    }
  },
  {
    path: "/md",
    component: () => import("@/components/md/index.vue")
  },
  {
    path: "/404",
    component: () => import("@/components/Null/index.vue")
  },
  {
    path: "/work",
    redirect: "/work/store",
    component: Menu,
    children: [
      // 任务面板
      {
        path: "/work/panel",
        component: () => import("@/views/panel/index.vue"),
        name: "panel"
      },
      {
        path: "/work/tasklist",
        component: () => import("@/views/list/index.vue"),
        name: "tasklist",
        meta: {
          white: true
        }
      },
      {
        path: "/work/tasklistAdd",
        component: () => import("@/views/list/add.vue"),
        name: "tasklistAdd"
      },
      {
        path: "/work/tasklistInfo",
        component: () => import("@/views/list/info.vue"),
        name: "tasklistInfo"
      },
      {
        path: "/work/userlist",
        component: () => import("@/views/user/list.vue"),
        name: "userlist"
      },
      {
        path: "/work/userlistAdd",
        component: () => import("@/views/user/add.vue"),
        name: "userlistAdd"
      },
      {
        path: "/work/knowledgeMap",
        component: () => import("@/views/knowledge/map.vue"),
        name: "knowledgeMap"
      },
      {
        path: "/work/knowledgeMap_addmd",
        component: () => import("@/components/md/index.vue"),
        name: "knowledgeMap_addmd"
      },
      {
        path: "/work/knowledgeMap_infomd",
        component: () => import("@/views/knowledge/info.vue"),
        name: "knowledgeMapknowledgeMap_infomd",
        meta: {
          white: true
        }
      },
      {
        path: "/work/webssh",
        component: () => import("@/views/console/index.vue"),
        name: "webssh"
      },
      {
        path: "/work/regular",
        component: () => import("@/views/regular/index.vue"),
        name: "regular",
        meta: {
          white: true
        }
      },
      {
        path: "/work/store",//服务应用
        component: () => import("@/views/store/index.vue"),
        name: "store"
      },
      {
        path: "/work/event",//事件管理
        component: () => import("@/views/event/index.vue"),
        name: "event"
      },
      {
        path: "/work/business",//业务管理
        component: () => import("@/views/business/index.vue"),
        name: "business"
      },
      {
        path: "/work/business_edit",//业务管理
        component: () => import("@/views/business/edit.vue"),
        name: "business_edit"
      },
      {
        path: "/work/business_create",//业务管理
        component: () => import("@/views/business/add.vue"),
        name: "business_create"
      },
      {
        path: "/work/customComponent",//自定义组件
        component: () => import("@/views/customComponent/index.vue"),
        name: "event",
        meta: {
          white: true
        }
      },
      {
        path: "/work/cloudIcon",// 云计算图标库
        component: () => import("@/views/cloudIcon/index.vue"),
        name: "cloudIcon",
        meta: {
          white: true
        }
      },
      {
        path: "/work/demand",// 小需求管理
        component: () => import("@/views/demand/index.vue"),
        name: "demand",
        meta: {
          white: true
        }
      },
      {
        path: "/work/demand_form",// 小需求管理
        component: () => import("@/views/demand/form.vue"),
        name: "demand_form",
      },
      {
        path: "/work/demand_info",// 小需求管理
        component: () => import("@/views/demand/info.vue"),
        name: "demand_info",
      },
      {
        path: "/work/passwordRule",// 密码规则主页面
        component: () => import("@/views/passwordRule/index.vue"),
        name: "passwordRule",
      },
      {
        path: "/work/passwordRule_detail",// 密码规则详情页面
        component: () => import("@/views/passwordRule/detail.vue"),
        name: "passwordRule_detail",
      },
      {
        path: "/work/menu",// 菜单管理页面
        component: () => import("@/views/menu/index.vue"),
        name: "menu",
      },
      {
        path: "/work/role",// 角色管理主页面
        component: () => import("@/views/role/index.vue"),
        name: "role",
      },
      {
        path: "/work/role_detail",// 角色管理详情页面
        component: () => import("@/views/role/detail.vue"),
        name: "role_detail",
      },
      {
        path: "/work/personalCenter",
        component: () => import("@/views/user/personalCenter.vue"),
        name: "personalCenter"
      },
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  let token = sessionStorage.getItem("token");
  let whitePaths = ['/login', '/404', '/md'];
  if (token && !whitePaths.includes(to.path)) {
    // 有token 但不是去 白名单页面 通过
    let menus = fetchMenus();
    if (!(menus && menus.length)) {
      await queryMenus()
      menus = fetchMenus();
    }
    if (isExistRoutePath(to.path, menus)) {
      // 有token，并且有菜单权限
      next();
    }
    else {
      next('/404')
    }
  } else if (token && whitePaths.includes(to.path)) {
    // 有token 但是去 login页面 不通过 重定向到首页
    next()
  } else if (!token && to.path !== '/login') {
    // 没有token 但不是去 login页面 不通过（未登录不给进入）
    next('/login')
  } else {
    // 剩下最后一种 没有token 但是去 login页面 通过
    next()
  }
});


// 获取左侧菜单并且放入sessionStorage
async function queryMenus() {
  let leftmenus = []
  let roleId = sessionStorage.getItem("roleId")
  return Axios.post("/role/role-menus", { roleId }).then(res => {
    if (res.status == 200) {
      leftmenus = res.data.records;
      window.sessionStorage.setItem("menus", JSON.stringify(leftmenus))
    }
  })
}

function fetchMenus() {
  let menusStr = window.sessionStorage.getItem("menus")
  let menus = [];
  try {
    menus = JSON.parse(menusStr)
  }
  catch {
    menus = [];
  }
  return menus;
}

function isExistRoutePath(path, menus) {
  for (let item of menus) {
    if (path.includes(item.path)) {
      return true;
    }
    else {
      if (item.children && item.children.length) {
        let finded = isExistRoutePath(path, item.children);
        if (finded) {
          return true;
        }
      }
    }
  }
}


//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
