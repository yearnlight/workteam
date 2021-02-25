<template>
  <div class="bigscreen">
    <!-- 大屏组件 -->
    <div class="bigscreen-components">
      <el-menu :unique-opened="true" :default-openeds="['3']" class="el-menu-vertical-demo">
        <el-submenu :index="String(index)" v-for="(item,index) in coms" :key="index">
          <template slot="title">
            <span>{{item.title}}</span>
          </template>
          <el-menu-item :index="`${child.name}`" v-for="(child,cindex) in item.children" :key="cindex">
            <template slot="title">
              <div draggable="true" @dragstart="dragToBoardStart" class="node">
                <span :title="`${child.type}_${child.name}`">
                  <i :class="['workteam',child.icon]"></i>
                  <span>{{child.title}}</span>
                </span>
                <span class="blue link" v-if="child.type == 'bg' || child.type == 'layout'" @click.stop.prevent="app(child.name,child.type)">应用</span>
              </div>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 大屏演示 -->
    <div class="bigscreen-demo">
      <div id="index">
        <!-- <dv-screen-container class="bg"> -->
        <div class="bg" :style="{backgroundImage: 'url(' + bgUrl + ')', backgroundSize:'contain'}">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <div v-else class="host-body">
            <div class="d-flex jc-center">
              <dv-decoration-10 style="width:33.3%;height:5px;" />
              <div class="d-flex jc-center">
                <dv-decoration-8 :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
                <div class="title">
                  <span class="title-text">大屏预演</span>
                  <dv-decoration-6 class="title-bototm" :reverse="true" :color="['#50e3c2', '#67a1e5']" style="width:250px;height:8px;" />
                </div>
                <dv-decoration-8 :reverse="true" :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
              </div>
              <dv-decoration-10 style="width:33.3%;height:5px;" />
            </div>

            <!-- 第二行 -->
            <div class="d-flex jc-between px-2"></div>

            <div class="body-box">
              <!-- 第三行数据 -->
              <div class="left">
                <div class="left-top">
                  <module :key="layout" />
                </div>
                <div class="left-middle" v-if="['3-21-3','3-12-3','3-3-21','3-3-12','3-3-3'].includes(layout)">
                  <module :key="layout" />
                </div>
                <div class="left-bottom">
                  <module :key="layout" />
                </div>
              </div>
              <div class="center">
                <div class="center-top">
                  <module :key="layout" />
                </div>
                <div class="center-middle" v-if="['12-3-3','21-3-3','3-3-21','3-3-12','3-3-3'].includes(layout)">
                  <module :key="layout" />
                </div>
                <div class="center-top">
                  <module :key="layout" />
                </div>
              </div>
              <div class="right">
                <div class="right-top">
                  <module :key="layout" />
                </div>
                <div class="right-middle" v-if="['12-3-3','21-3-3','3-21-3','3-12-3','3-3-3'].includes(layout)">
                  <module :key="layout" />
                </div>
                <div class="right-bottom">
                  <module :key="layout" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bgSky = require("@/assets/bigscreen/bg-sky.png");
const bgEarth = require("@/assets/bigscreen/bg-earth.png");
const bgGallery = require("@/assets/bigscreen/bg-gallery.png");
import module from "./module";
export default {
  components: { module },
  data() {
    return {
      loading: false,
      bgUrl: bgGallery,
      layout: "3-3-3",
      coms: [
        {
          title: "背景图", children: [
            { title: "星空", name: "bg-sky", type: "bg" },
            { title: "地球", name: "bg-earth", type: "bg" },
            { title: "长廊", name: "bg-gallery", type: "bg" }
          ]
        },
        {
          title: "布局", name: "layout", children: [
            { title: "九宫格(3-3-3)", name: "3-3-3", type: "layout", icon: "icon-layout" },
            { title: "六宫格(2-2-2)", name: "2-2-2", type: "layout", icon: "icon-layout" },
            { title: "八宫格(21-3-3)", name: "21-3-3", type: "layout", icon: "icon-layout" },
            { title: "八宫格(12-3-3)", name: "12-3-3", type: "layout", icon: "icon-layout" },
            { title: "八宫格(3-21-3)", name: "3-21-3", type: "layout", icon: "icon-layout" },
            { title: "八宫格(3-12-3)", name: "3-12-3", type: "layout", icon: "icon-layout" },
            { title: "八宫格(3-3-21)", name: "3-3-21", type: "layout", icon: "icon-layout" },
            { title: "八宫格(3-3-12)", name: "3-3-12", type: "layout", icon: "icon-layout" },
          ]
        },
        {
          title: "边框", children: [
            { title: "边框1", name: "dv-border-Box-1", icon: "icon-border", type: "border" },
            { title: "边框2", name: "dv-border-Box-2", icon: "icon-border", type: "border" },
            { title: "边框3", name: "dv-border-Box-3", icon: "icon-border", type: "border" },
            { title: "边框4", name: "dv-border-Box-4", icon: "icon-border", type: "border" },
            { title: "边框5", name: "dv-border-Box-5", icon: "icon-border", type: "border" },
            { title: "边框6", name: "dv-border-Box-6", icon: "icon-border", type: "border" },
            { title: "边框7", name: "dv-border-Box-7", icon: "icon-border", type: "border" },
            { title: "边框8", name: "dv-border-Box-8", icon: "icon-border", type: "border" },
            { title: "边框9", name: "dv-border-Box-9", icon: "icon-border", type: "border" },
            { title: "边框10", name: "dv-border-Box-10", icon: "icon-border", type: "border" },
            { title: "边框11", name: "dv-border-Box-11", icon: "icon-border", type: "border" },
            { title: "边框12", name: "dv-border-Box-12", icon: "icon-border", type: "border" },
            { title: "边框13", name: "dv-border-Box-13", icon: "icon-border", type: "border" },
          ]
        },
        {
          title: "图表", children: [
            { title: "Echart柱状图", icon: "icon-bar", name: "echartbar", type: "chart" },
            { title: "Echart环状图", icon: "icon-loop", name: "echartloop", type: "chart" },
            { title: "Echart折线图", icon: "icon-line", name: "echartline", type: "chart" },
            { title: "DataV胶囊柱状图", icon: "icon-bar", name: "capsulebar", type: "chart" },
            { title: "DataV环状图", icon: "icon-loop", name: "loop", type: "chart" },
            { title: "DataV水位图", icon: "icon-hydrograph", name: "hydrograph", type: "chart" },
            { title: "DataV进度池", icon: "icon-progresspool", name: "progresspool", type: "chart" },
            { title: "DataV排名图", icon: "icon-ranking", name: "ranking", type: "chart" },
            { title: "DataV轮播表格", icon: "icon-carouseltable", name: "carouseltable", type: "chart" },
            { title: "DataV数字翻牌", icon: "icon-flop", name: "flop", type: "chart" },
            { title: "DataV锥形图", icon: "icon-cone", name: "cone", type: "chart" },
            { title: "DataV仪表盘", icon: "icon-dashbord", name: "dashbord", type: "chart" },
            { title: "饼状图", icon: "icon-pie", name: "pie", type: "chart" },
          ]
        }
      ]
    }
  },
  created() { },
  methods: {
    app(name, type) {
      if (type == 'bg') {
        let bgs = { "bg-sky": bgSky, "bg-earth": bgEarth, "bg-gallery": bgGallery }
        this.bgUrl = bgs[name];
      }
      else if (type == 'layout') {
        this.layout = name;
      }
    },
    // 从左边的节点库拖出节点
    dragToBoardStart(e) {
      // 设置拖出的数据
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          name: e.target.children[0].title
        })
      );
      e.dataTransfer.effectAllowed = "copy"; // 设置拖的操作为复制操作
      // window.
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "@/assets/scss/index.scss";
.bigscreen {
  display: flex;
  height: 100% !important;
  &-components {
    width: 250px;
    height: calc(100 - 20px);
    overflow-y: auto;
    .node {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .link {
        cursor: pointer;
      }
    }
  }

  &-demo {
    flex: 1;
  }
}
</style>