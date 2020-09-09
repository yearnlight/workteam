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
  }
  else {
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
