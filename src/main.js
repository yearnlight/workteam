import Vue from 'vue'
import App from './App.vue'
import Axios from "axios";
import Util from "@/utils/index";
import Enums from "@/common/enums";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import router from "./router.js";
import * as filters from './filters'
import ECharts from 'vue-echarts';
import BaiduMap from 'vue-baidu-map';

Vue.component('v-chart', ECharts);
Vue.config.productionTip = false

Axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  }
);
Axios.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      config.headers['Token'] =  token;
    }
    return config;
  }
);

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$axios = Axios;
Vue.prototype.$util = Util;
Vue.prototype.$enum = Enums;

Vue.use(BaiduMap, {
  ak: "Ze9OqgmMenxVVxSFhkECy06rbF72VN3m"
});

Vue.use(ElementUI, {
  size: "small"
});

Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
