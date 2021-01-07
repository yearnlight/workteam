import VueRouter from "vue-router";
import Menu from "./components/menu.vue";

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
    path: "/work",
    redirect: "/work/panel",
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
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.white) {
    next();
  } else {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  }
});

export default router;
