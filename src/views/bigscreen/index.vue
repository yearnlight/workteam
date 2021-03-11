<template>
  <div class="bigscreen">
    <!-- 大屏组件 -->
    <div class="bigscreen-components">
      <el-menu background-color="#1e222d" menu-trigger="click" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :default-openeds="['2']" class="el-menu-vertical-demo">
        <el-submenu :index="String(index)" v-for="(item,index) in coms" :key="index">
          <template slot="title">
            <span>{{item.title}}</span>
          </template>
          <el-menu-item :index="`${child.name}`" v-for="(child,cindex) in item.children" :key="cindex">
            <template slot="title">
              <div draggable="true" @dragstart="dragToBoardStart" class="node">
                <span :title="`${child.type}_${child.name}_${child.title}`">
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
      <div class="bigscreen-demo-operate">
        <div class="bigscreen-demo-operate-btns">
          <el-button v-if="!isFixed" @click="createItem">添加</el-button>
          <el-button @click="preview" type="warning">{{isFixed?"自定义配置":"预览"}}</el-button>
          <el-button v-if="isFixed" @click="save" type="success">保存</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
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
                  <span class="title-text">{{screenTitle || "大屏预演"}}</span>
                  <dv-decoration-6 class="title-bototm" :reverse="true" :color="['#50e3c2', '#67a1e5']" style="width:250px;height:8px;" />
                </div>
                <dv-decoration-8 :reverse="true" :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
              </div>
              <dv-decoration-10 style="width:33.3%;height:5px;" />
            </div>

            <!-- 第二行 -->
            <div class="d-flex jc-between px-2"></div>
            <div class="body-box">
              <vue-power-drag ref="mxScreenGridster" :resizeEnd="resizeEnd" :resizable="!isFixed" :draggable="!isFixed" :your-list="list" :base-margin-left="baseMarginLeft" :base-margin-top="baseMarginTop" :base-width="baseWidth" :base-height="baseHeight">
                <template v-for="(item,index) in list" :slot="'slot'+index">
                  <div :class="[{'draged':!isFixed,'fixed':isFixed},'mode']" :key="index">
                    <!-- 自定义表框组件 -->
                    <component :is="borderName" class="borderBox" :ref="`borderBox_${index}`">
                      <span class="mode-operate">
                        <span v-if="item.componentName" title="清空" class="el-icon-close" @click="removeItem(item)"></span>
                        <span class="el-icon-delete" title="删除" @click="delItem(item,index)"></span>
                        <span class="el-icon-setting" title="配置" @click="setItem(item,index)"></span>
                      </span>
                      <div class="mode-content" ondragover="return false" @drop="(e)=>dropToBoard(e,item)">
                        <div v-if="!item.componentName" class="noModule">
                          <div class="noModule-header" :style="{justifyContent: 'left'}">{{item.title}}</div>
                          <div class="noModule-content">待填充</div>
                        </div>
                        <component v-else :is="item.componentName" class="customModule">
                          <template>
                            <div class="chartHeader" :style="{justifyContent: 'left'}">{{item.title}}</div>
                          </template>
                        </component>
                      </div>
                    </component>
                  </div>
                </template>
              </vue-power-drag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="配置" custom-class="settingDialog" :visible.sync="isSet" @closed="onClosed">
      <el-form :model="moduleForm" ref="moduleForm" :rules="rules" label-width="140px">
        <el-form-item label="模块标题" prop="title">
          <el-input v-model="moduleForm.title" placeholder="请输入标题" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="!isCreate" label="组件名称" prop="componentName">
          <el-input :disabled="true" v-model="moduleForm.componentName" placeholder="从左侧拖入组件"></el-input>
        </el-form-item>

        <el-form-item label="是否对接接口" prop="isApi">
          <el-radio-group v-model="moduleForm.isApi">
            <!-- <el-radio :label="0">否</el-radio> -->
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="!isCreate" label="接口Url" prop="apiUrl">
          <el-input v-model="moduleForm.apiUrl" placeholder="请输入模块接口Url"></el-input>
        </el-form-item>

        <el-form-item v-if="!isCreate" label="接口类型" prop="apiType">
          <el-select v-model="moduleForm.apiType" clearable placeholder="请选择接口类型">
            <el-option v-for="item in interfaceTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="!isCreate" label="接口参数" prop="apiParams">
          <el-input v-model="moduleForm.apiParams" type="textarea" placeholder="请输入模块接口参数"></el-input>
        </el-form-item>

        <!-- <div class="data" v-else>

          <el-form-item label="X轴数据" prop="xData">
            <el-input v-model="moduleForm.xData" placeholder="数组类型，例如：['北京','西安','武汉','南京']" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Y轴数据" prop="yData">
            <el-input v-model="moduleForm.yData" placeholder="数组类型，例如：[126,69,78,79]" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

        </div> -->

        <el-form-item label="设置颜色组" prop="colors">
          <el-select v-model="moduleForm.colors" multiple filterable allow-create default-first-option placeholder="请设置颜色组">
            <el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isSet = false">取 消</el-button>
        <el-button type="primary" @click="saveSetting('moduleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import drag from 'vue-power-drag'
const bgSky = require("@/assets/bigscreen/bg-sky.png");
const bgEarth = require("@/assets/bigscreen/bg-earth.png");
const bgGallery = require("@/assets/bigscreen/bg-gallery.png");

const req = require.context('@/views/bigscreen/components', false, /\.vue$/);
const requireAll = requireContext => requireContext.keys();
const re = /\.\/(.*)\.vue/;

//大屏组件
const screenComponentNames = requireAll(req).map(i => {
  return i.match(re)[1]
});

let screenComponents = {}
screenComponentNames.forEach(compName => {
  screenComponents[compName] = () => import(`./components/${compName}.vue`)
})
screenComponents['vue-power-drag'] = drag;

import setMinxin from "./set.js"

export default {
  components: screenComponents,
  mixins: [setMinxin],
  data() {
    return {
      isFixed: false,// 是否固定
      loading: false,
      isCreate: true,
      operateIndex: 0,// 当前操作模块序号
      bgUrl: bgGallery,
      screenBg: "bg-gallery",
      list: undefined,
      baseWidth: 0,
      baseHeight: 0,
      coms: [
        {
          title: "背景图", children: [
            { title: "星空", name: "bg-sky", type: "bg" },
            { title: "地球", name: "bg-earth", type: "bg" },
            { title: "长廊", name: "bg-gallery", type: "bg" }
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
      ],
      bgs: { "bg-sky": bgSky, "bg-earth": bgEarth, "bg-gallery": bgGallery },
      borderName: "dv-border-box-8"
    }
  },
  computed: {
    screenTitle() {
      return this.$route.query.title;
    }
  },
  created() {
    //屏幕适配，使得当前布局能在所有分辨率下适用，示例是在1366*638分辨率下完成
    let screenWidth = window.innerWidth - 15 * 4 - 36;
    let screenHeight = window.innerHeight - 162 - 45;
    this.baseWidth = 90.8333 * (screenWidth / 1366);
    this.baseHeight = 100 * (screenHeight / 638);
    this.baseMarginLeft = 15;
    this.baseMarginTop = 15;
    this.resetStyles();
  },
  mounted() {
    let gridster = this.$refs['mxScreenGridster']; //获取gridster实例
    gridster.init(); //在适当的时候初始化布局组件
    this.getModules();
  },
  methods: {
    resetStyles() {
      this.$nextTick(function () {
        // 重置样式
        document.getElementsByClassName("dragAndResize").forEach(dom => {
          dom.style.width = "calc(100% - " + (this.baseMarginLeft) + "px)"
          dom.style.height = "calc(100%) !important"
        })
        document.getElementsByClassName("item").forEach(dom => {
          dom.style.border = "none";
          dom.style.backgroundColor = "inherit";
        })

        document.getElementsByClassName("resizeHandle").forEach(dom => {
          dom.style.borderBottom = "10px solid #fff";
        })

      })
    },
    getModules() {
      let that = this;
      let demoData = [
        { "x": 1, "y": 1, "sizex": 4, "sizey": 2, "title": "预设模块1", isApi: 1, apiType: "get" },
        { "x": 5, "y": 1, "sizex": 4, "sizey": 2, "title": "预设模块2", isApi: 1, apiType: "get" },
        { "x": 9, "y": 1, "sizex": 4, "sizey": 2, "title": "预设模块3", isApi: 1, apiType: "get" },
        { "x": 1, "y": 3, "sizex": 4, "sizey": 2, "title": "预设模块4", isApi: 1, apiType: "get" },
        { "x": 5, "y": 3, "sizex": 4, "sizey": 2, "title": "预设模块5", isApi: 1, apiType: "get" },
        { "x": 9, "y": 3, "sizex": 4, "sizey": 2, "title": "预设模块6", isApi: 1, apiType: "get" },
        { "x": 1, "y": 5, "sizex": 4, "sizey": 2, "title": "预设模块7", isApi: 1, apiType: "get" },
        { "x": 5, "y": 5, "sizex": 4, "sizey": 2, "title": "预设模块8", isApi: 1, apiType: "get" },
        { "x": 9, "y": 5, "sizex": 4, "sizey": 2, "title": "预设模块9", isApi: 1, apiType: "get" },
      ]
      // 编辑模块
      if (this.$route.query.id) {
        this.$axios.post("/bigscreen/get-modules", { pid: this.$route.query.id }).then(res => {
          if (res.status == 200) {
            if (res.data && res.data.length) {
              let one = res.data[0];
              this.list = res.data;
              let screenBg = one.screenBg || "bg-gallery"
              that.bgUrl = that.bgs[screenBg];
              that.screenBg = screenBg;
              that.borderName = one.screenBorder || "dv-border-box-8";

            }
            else {
              this.list = demoData;
            }
            this.resetStyles();
          }
        })
      }
      else {
        this.list = demoData;
      }
    },
    app(name, type) {
      if (type == 'bg') {
        this.screenBg = name;
        this.bgUrl = this.bgs[name];
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
    preview() {
      this.isFixed = !this.isFixed;
    },
    save() {
      // 保存配置
      let params = { pid: this.$route.query.id, screenBorder: this.borderName, screenBg: this.screenBg, modules: this.$refs['mxScreenGridster'].getList() };
      this.$axios.post("/bigscreen/set-modules", params).then(res => {
        if (res.status == 200) {
          this.$message.success("模块配置保存成功")
        }
        else {
          this.$message.error("模块配置保存失败")
        }
      })
    },
    // module
    dropToBoard(e, item) {
      const content = JSON.parse(e.dataTransfer.getData("text/plain")); // 接收来自拖出的内容,并还原为对象
      const date = new Date();
      let names = content.name.split("_");
      if (names[0] == "border") {
        this.borderName = names[1].toLowerCase();
      }
      else if (names[0] == "chart") {
        this.$set(item, "title", names[2])
        this.$set(item, "componentName", names[1].toLowerCase())
      }

    },
    removeItem(item) {
      this.$set(item, "componentName", undefined)
    },
    addItemBox(moduleForm) {
      let gridster = this.$refs['mxScreenGridster']; //获取gridster实例
      let maxY = Math.max.apply(null, this.list.map(m => m.y))
      let maxYItem = this.list.filter(l => l.y == maxY)[0];
      gridster.addItemBox({
        x: 1,
        y: maxY + maxYItem.sizey,
        sizex: 6,
        sizey: 2,
        title: moduleForm.title || "新增模块(待修改)",
        isApi: 1
      })
      this.resetStyles();
    },
    delItem(item, index) {
      let gridster = this.$refs['mxScreenGridster']; //获取gridster实例

      gridster.removeItem(index); //此时会在this.myList的index位置将item置为{}，目的是为了不让vue重新渲染整个v-for。
      //注意，这里删除布局框并不会删除里面的组件，组件需要自己用v-if来控制销毁，如果是highchart，必须手动调用chartInstance.$destroy()
    },
    createItem() {
      this.isSet = true;
      this.isCreate = true;
      this.moduleForm = {
        isApi: 1
      };
    },
    setItem(item, index) {
      // 编辑
      this.isSet = true;
      this.moduleForm = this.$util.deepCopy(item);
      this.operateIndex = index;
      this.isCreate = false;
    },
    saveSetting(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isCreate) {
            this.addItemBox(this.moduleForm);
          }
          else {
            this.list[this.operateIndex] = this.moduleForm;
          }
          this.isSet = false;
        } else {
          return false;
        }
      });
    },
    resizeEnd(e, item, index) {
      // 缩放结束重新初始化边框
      this.$refs[`borderBox_${index}`][0].initWH()
    }
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
    width: 240px;
    background-color: #1e222d;
    overflow-y: auto;
    .el-menu {
      border-right: none;
    }
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
    &-operate {
      display: flex;
      background-color: #1e222d;
      padding: 10px;
      &-btns {
        display: inline-block;
        margin-left: auto;
        margin-right: 20px;
        .el-button {
          margin-left: 10px;
          padding: 9px 15px;
        }
      }
    }
    #index {
      height: calc(100% - 52px);
    }
  }
}

.el-select-dropdown__item {
  padding-left: 20px !important;
}
.settingDialog {
  .el-button {
    margin-left: 10px;
    padding: 9px 15px;
  }
  .el-radio + .el-radio {
    margin-left: 20px !important;
  }
}

.mode {
  height: 100%;
  // &.draged {
  //   height: calc(100% - 15px) !important;
  // }
  // &.fixed {
  //   height: calc(100%);
  // }
  position: relative;
  &-operate {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 999;
    span {
      cursor: pointer;
      font-size: 13px;
    }
    span + span {
      margin-left: 5px;
    }
  }
  &-content {
    height: 100%;
    color: #ffffff;
    .noModule {
      height: 100%;
      padding: 10px 15px;
      &-header {
        padding-bottom: 10px;
        color: #c3cbde;
        font-size: 16px;
        font-weight: "normal";
        font-family: "Avenir, Helvetica, Arial, sans-serif";
        display: flex;
      }
      &-content {
        height: calc(100% - 31px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .customModule {
      height: 100%;
      padding: 10px 15px;
      .chartHeader {
        padding-bottom: 10px;
        color: #c3cbde;
        font-size: 16px;
        font-weight: "normal";
        font-family: "Avenir, Helvetica, Arial, sans-serif";
        display: flex;
      }
      .chartContent {
        .echarts {
          height: 100%;
        }
        width: 100%;
        height: calc(100% - 31px);
        display: flex;
        justify-content: center;
        align-items: center;
        &.center {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>