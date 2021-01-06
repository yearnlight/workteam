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
import './icons' // icon
Vue.component("v-chart", ECharts);
Vue.component("no-data", NoData);
Vue.component("dot", Dot);
Vue.component("level", Level);
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
window.app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
