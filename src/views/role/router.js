[
    {
        path: "/work/role",// 角色管理主页面
        component: () => import("@/views/role/index.vue"),
        name: "role",
    },
    {
        path: "/work/role_detail",// 角色管理详情页面
        component: () => import("@/views/role/detail.vue"),
        name: "role_detail",
    }
]