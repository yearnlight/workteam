<template>
  <div class="overview">
    <!-- 概览组件模块 -->
    <div class="overview-module">
      <el-menu background-color="#333854" text-color="#fff" active-text-color="#ffd04b" :unique-opened="false" :default-openeds="['0','1','2','3']" class="el-menu-vertical-demo">
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
              </div>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 概览布局预览 -->
    <div class="overview-layout">
      <div class="overview-layout-operate">
        <div class="overview-layout-operate-btns">
          <el-button v-if="!isFixed" @click="createItem">添加</el-button>
          <el-button @click="preview" type="warning">{{isFixed?"自定义配置":"预览"}}</el-button>
          <el-button v-if="isConfig && isFixed" @click="save" type="success">保存</el-button>
          <el-button v-if="isConfig" @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <vue-power-drag ref="mxGridster" :resizable="!isFixed" :draggable="!isFixed" :your-list="list" :base-margin-left="baseMarginLeft" :base-margin-top="baseMarginTop" :base-width="baseWidth" :base-height="baseHeight">
        <template v-for="(item,index) in list" :slot="'slot'+index">
          <div class="module" :key="index">
            <span class="tool" v-if="!isFixed">
              <span v-if="item.componentName" @click="clearItem(item)" title="清空" class="el-icon-circle-close red"></span>
              <span @click="deleteItem(index)" title="删除" class="el-icon-delete red"></span>
              <span @click="configItem(item,index)" title="配置" class="el-icon-setting green"></span>
            </span>
            <div class="module-title">
              <span class="module-title-text">{{item.title}}</span>
              <a class="module-title-link">{{item.link}}</a>
            </div>
            <div class="module-content" ondragover="return false" @drop="(e)=>dropToBoard(e,item)">
              <span v-if="!item.componentName">待填充</span>
              <component v-else :is="item.componentName" />
            </div>
          </div>
        </template>
      </vue-power-drag>
    </div>

    <el-drawer :title="isCreate?'添加模块':'配置模块'" custom-class="drawer" :show-close="false" :visible.sync="drawer" direction="rtl" :before-close="closeModule">
      <el-form ref="moduleForm" :model="moduleForm" :rules="rules" label-width="80px">
        <el-form-item label="模块标题" prop="title">
          <el-input v-model="moduleForm.title" placeholder="请输入模块标题"></el-input>
        </el-form-item>
        <el-form-item label="链接标题" prop="link">
          <el-input v-model="moduleForm.link" placeholder="请输入链接标题，例如：更多"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="moduleForm.linkUrl" placeholder="请输入链接地址，用于跳转入口"></el-input>
        </el-form-item>
        <el-form-item v-if="!isCreate" label="组件名称" prop="componentName">
          <el-input :disabled="true" v-model="moduleForm.componentName" placeholder="从左侧拖入组件"></el-input>
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

        <el-form-item>
          <el-button type="primary" @click="saveModuleConfigs('moduleForm')">{{isCreate?"立即添加":"保存配置"}}</el-button>
          <el-button @click="drawer = false;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

        
<script>
import drag from 'vue-power-drag'
const req = require.context('@/views/overview/components', false, /\.vue$/);
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
export default {
  components: screenComponents,
  data() {
    return {
      drawer: false,
      isCreate: true,
      operateIndex: 0,
      moduleForm: {
        title: undefined,
        link: undefined,
        linkUrl: undefined
      },
      rules: {
        title: [
          { required: true, message: '请输入模块标题', trigger: 'blur' },
        ],
      },
      isFixed: false,
      list: [{ "x": 7, "y": 1, "sizex": 6, "sizey": 2, "title": "资源容量", "link": "更多" }, { "x": 1, "y": 1, "sizex": 6, "sizey": 2, "title": "热度", "link": "更多" }, { "x": 1, "y": 3, "sizex": 6, "sizey": 1, "title": "CPU TOP5", "link": "更多" }, { "x": 7, "y": 3, "sizex": 6, "sizey": 1, "title": "内存 TOP5", "link": "更多" }],
      baseWidth: 0,
      baseHeight: 0,
      coms: [
        {
          title: "资源容量", children: [
            { title: "资源统计", icon: "icon-bar", name: "resource", type: "chart" },
          ]
        },
        {
          title: "运营容量", children: [
            { title: "配额", icon: "icon-bar", name: "quota", type: "chart" },
            { title: "计量", icon: "icon-loop", name: "measure", type: "chart" },
            { title: "计费", icon: "icon-line", name: "billing", type: "chart" },
            { title: "订单", icon: "icon-line", name: "order", type: "chart" },
            { title: "公告", icon: "icon-event", name: "notice", type: "chart" },
          ]
        },
        {
          title: "组织容量", children: [
            { title: "总用户", icon: "icon-bar", name: "users", type: "chart" },
            { title: "当前登录用户", icon: "icon-loop", name: "activeUser", type: "chart" }
          ]
        },
        {
          title: "实时监控", children: [
            { title: "CPU使用TOP5", icon: "icon-bar", name: "cpu", type: "chart" },
            { title: "内存使用TOP5", icon: "icon-loop", name: "memory", type: "chart" }
          ]
        }

      ],
      interfaceTypes: [
        { label: "GET", value: "get" },
        { label: "POST", value: "post" },
        { label: "PUT", value: "put" },
        { label: "DELETE", value: "delete" },
      ],
    }
  },
  computed: {
    isConfig() {
      return this.$route.query.id ? true : false
    }
  },
  created() {
    //屏幕适配，使得当前布局能在所有分辨率下适用，示例是在1366*638分辨率下完成
    let screenWidth = window.innerWidth - 170;
    let screenHeight = window.innerHeight;
    this.baseWidth = 90.8333 * (screenWidth / 1366);
    this.baseHeight = 100 * (screenHeight / 638);
    this.baseMarginLeft = 15;
    this.baseMarginTop = 15;
    this.$nextTick(function () {
      document.getElementsByClassName("dragAndResize").forEach(dom => {
        dom.style.width = "calc(100% - " + (this.baseMarginLeft) + "px)"
      })
    })
  },
  mounted() {
    let gridster = this.$refs['mxGridster']; //获取gridster实例
    gridster.init(); //在适当的时候初始化布局组件
    this.getModules();
  },
  methods: {
    getModules() {
      this.$axios.post("/bigscreen/get-modules", { pid: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.list = res.data;
        }
      })
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
    dropToBoard(e, item) {
      const content = JSON.parse(e.dataTransfer.getData("text/plain")); // 接收来自拖出的内容,并还原为对象
      const date = new Date();
      let names = content.name.split("_");
      this.$set(item, "componentName", names[1].toLowerCase())
    },
    preview() {
      this.isFixed = !this.isFixed;
    },
    save() {
      // 保存配置
      let params = { pid: this.$route.query.id, modules: this.$refs['mxGridster'].getList() };
      this.$axios.post("/bigscreen/set-modules", params).then(res => {
        if (res.status == 200) {
          this.$message.success("模块配置保存成功")
        }
        else {
          this.$message.error("模块配置保存失败")
        }
      })
    },
    addItemBox(moduleForm) {
      let gridster = this.$refs['mxGridster']; //获取gridster实例

      gridster.addItemBox({
        id: 111,
        x: 1,
        y: 1,
        sizex: 6,
        sizey: 2,
        title: moduleForm.title || "新增模块(待修改)",
        link: moduleForm.link || "更多"
      })
    },
    deleteItem(index) {
      this.$confirm("你确定删除当前配置项 ?", "删除").then(() => {
        let gridster = this.$refs['mxGridster']; //获取gridster实例

        gridster.removeItem(index); //此时会在this.myList的index位置将item置为{}，目的是为了不让vue重新渲染整个v-for。
        //注意，这里删除布局框并不会删除里面的组件，组件需要自己用v-if来控制销毁，如果是highchart，必须手动调用chartInstance.$destroy()
      })
    },
    configItem(item, index) {
      this.moduleForm = this.$util.deepCopy(item);
      this.operateIndex = index;
      this.drawer = true;
      this.isCreate = false;
    },
    clearItem(item) {
      this.$set(item, "componentName", undefined)
    },
    createItem() {
      this.drawer = true;
      this.isCreate = true;
    },
    closeModule() {
      this.moduleForm = {
        title: undefined,
        link: undefined,
        linkUrl: undefined
      }
    },
    saveModuleConfigs(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isCreate) {
            this.addItemBox(this.moduleForm);
          }
          else {
            this.list[this.operateIndex] = this.moduleForm;
          }
          this.drawer = false;
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.overview {
  //   重写主屏样式
  background-color: #f0f2f5 !important;
  padding: 0px !important;
  height: 100% !important;
  display: flex;
  &-module {
    width: 200px;
    overflow-y: auto;
    background-color: #333854;
    .el-menu {
      border-right: none;
    }
  }
  &-layout {
    flex: 1;
    overflow-y: auto;
    &-operate {
      display: flex;
      background-color: #333854;
      padding: 10px;
      &-btns {
        display: inline-block;
        margin-left: auto;
        margin-right: 20px;
      }
    }
    .dragAndResize {
      .item {
        box-shadow: 0 1px 3px 0 rgba(2, 25, 42, 0.1) !important;
        border: none !important;
      }
    }
    .module {
      font-size: 12px;
      padding: 20px 24px;
      background-color: #ffffff;
      height: calc(100% - 40px);
      .tool {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 2;
        span {
          cursor: pointer;
          font-size: 14px;
          margin-right: 10px;
        }
      }
      &-title {
        height: 20px;
        line-height: 20px;
        position: relative;

        &-text {
          font-size: 14px;
          color: #252b3a;
          font-weight: 700;
        }
        &-link {
          position: absolute;
          right: 0;
          color: #5673d6;
          font-size: 12px;
          cursor: pointer;
          text-decoration: none;
        }
      }
      &-content {
        height: calc(100% - 20px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.drawer {
  .el-form {
    padding: 10px 40px;
  }
}
</style>