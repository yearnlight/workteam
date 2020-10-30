import VueRouter from "vue-router";
import Menu from "./components/menu.vue";

const routes = [
  {
    path: "/",
    redirect: "/work"
  },
  {
    path: "/login",
    component: () => import("@/views/user/login.vue")
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
        name: "tasklist"
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
        name: "knowledgeMapknowledgeMap_infomd_addmd"
      },
      {
        path: "/work/webssh",
        component: () => import("@/views/console/index.vue"),
        name: "webssh"
      },
      {
        path: "/work/regular",
        component: () => import("@/views/regular/index.vue"),
        name: "regular"
      },
      {
        path: "/work/store",//服务应用
        component: () => import("@/views/store/index.vue"),
        name: "store"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
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
