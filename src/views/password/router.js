[
    {
        path: "/work/password",// 密码管理主页面
        component: () => import("@/views/password/index.vue"),
        name: "password",
    },
    {
        path: "/work/password_detail",// 密码管理详情页面
        component: () => import("@/views/password/detail.vue"),
        name: "password_detail",
    }
]