import Vue from "vue";
import App from "./App.vue";
import Axios from "axios";
import Util from "@/utils/index";
import Enums from "@/common/enums";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import router from "./router.js";
import * as filters from "./filters";
import ECharts from "vue-echarts";
import BaiduMap from "vue-baidu-map";
import { Message } from "element-ui";
import mavonEditor from 'mavon-editor';
import VueClipboards from 'vue-clipboard2'
import NoData from '@/components/noData';
import Dot from "@/components/Dot/index"
import Level from "@/components/Level/index"
import Tag from "@/components/Tag/index"
import './icons' // icon
import './resource/icon/iconfont.css' // icon
Vue.component("v-chart", ECharts);
Vue.component("no-data", NoData);
Vue.component("dot", Dot);
Vue.component("level", Level);
Vue.component("tag", Tag);
Vue.config.productionTip = false;

Vue.component('ymx', {
  template: '<div></div>',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

Axios.interceptors.response.use(res => {
  if (res.status === 200) {
    if (res.data.status == 401) {
      Message.error(res.data.msg);
      setTimeout(() => {
        window.sessionStorage.clear();
        window.app.$router.push("/login");
      }, 1500);
    } else {
      return Promise.resolve(res.data);
    }
  } else {
    return Promise.reject(res);
  }
});
Axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem("token");
  const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
  if (token) {
    config.headers["Token"] = token;
    config.headers["userId"] = userInfo.id;
  }
  return config;
});

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$axios = Axios;
Vue.prototype.$util = Util;
Vue.prototype.$enum = Enums;

Vue.use(BaiduMap, {
  ak: "Ze9OqgmMenxVVxSFhkECy06rbF72VN3m"
});

Vue.use(ElementUI, {
  size: "small"
});

Vue.use(VueClipboards);

Vue.use(VueRouter);
Vue.use(mavonEditor);

//组内成员和游客操作限制
let blackAuths = {
  "visitor": ["store_delete", "project_delete", "doc_update", "doc_delete", "user_delete", "user_update", "user_updatePass", "task_update", "task_delete"],
  "member": ["store_delete", "project_delete", "doc_update", "doc_delete", "user_delete", "user_update", "user_updatePass", "task_update", "task_delete"]
}

// vue自定义指令
Vue.directive('auth', {
  // bind [authName,creator]
  inserted: function (el, bind) {
    if (bind.value) {
      let authName = bind.value[0];
      let creator = bind.value[1];
      let userName = sessionStorage.getItem("userName")
      let roleBlackAuths = blackAuths[sessionStorage.getItem("roleEnName")];
      // 如果是自己创的数据
      if (userName == creator) {
        el.style.display = "inline-block";
      }
      else {
        // 不是自己创的数据切没操作权限
        if (roleBlackAuths.includes(authName)) {
          el.style.display = "none";
        }
        else {
          el.style.display = "inline-block";
        }
      }
    }
    else {
      el.style.display = "inline-block";
    }
  },
  update(el, bind) {
    if (bind.value) {
      let authName = bind.value[0];
      let creator = bind.value[1];
      let userName = sessionStorage.getItem("userName")
      let roleBlackAuths = blackAuths[sessionStorage.getItem("roleEnName")];
      // 如果是自己创的数据
      if (userName == creator) {
        el.style.display = "inline-block";
      }
      else {
        if (roleBlackAuths.includes(authName)) {
          el.style.display = "none";
        }
        else {
          el.style.display = "inline-block";
        }
      }
    }
    else {
      el.style.display = "inline-block";
    }
  }
})


window.app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
