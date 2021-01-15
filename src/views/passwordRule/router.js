[
    {
        path: "/work/passwordRule",// 密码规则主页面
        component: () => import("@/views/passwordRule/index.vue"),
        name: "passwordRule",
    },
    {
        path: "/work/passwordRule_detail",// 密码规则详情页面
        component: () => import("@/views/passwordRule/detail.vue"),
        name: "passwordRule_detail",
    }
]