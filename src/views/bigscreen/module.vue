<template>
  <div class="module" ondragover="return false" @drop="dropToBoard">
    <dv-border-box-1 v-if="borderName == 'dv-border-box-1'">
      <span class="module-operate" v-if="curComponentName">
        <span class="el-icon-setting" @click="set"></span>
        <span class="el-icon-close" @click="remove"></span>
      </span>
      <div class="module-content">
        <span v-if="!curComponentName">待填充</span>
        <component v-else :is="curComponentName" :isSet="isSet" @cloudSet="cloudSet" />
      </div>
    </dv-border-box-1>

    <dv-border-box-3 v-else-if="borderName == 'dv-border-box-3'">
      <span class="module-operate" v-if="curComponentName">
        <span class="el-icon-setting" @click="set"></span>
        <span class="el-icon-close" @click="remove"></span>
      </span>
      <div class="module-content">
        <span v-if="!curComponentName">待填充</span>
        <component v-else :is="curComponentName" :isSet="isSet" @cloudSet="cloudSet" />
      </div>
    </dv-border-box-3>

    <dv-border-box-13 v-else-if="borderName == 'dv-border-box-13'">
      <span class="module-operate" v-if="curComponentName">
        <span class="el-icon-setting" @click="set"></span>
        <span class="el-icon-close" @click="remove"></span>
      </span>
      <div class="module-content">
        <span v-if="!curComponentName">待填充</span>
        <component v-else :is="curComponentName" :isSet="isSet" @cloudSet="cloudSet" />
      </div>
    </dv-border-box-13>

    <dv-border-box-8 v-else>
      <span class="module-operate" v-if="curComponentName">
        <span class="el-icon-setting" @click="set"></span>
        <span class="el-icon-close" @click="remove"></span>
      </span>
      <div class="module-content">
        <span v-if="!curComponentName">待填充</span>
        <component v-else :is="curComponentName" :isSet="isSet" @cloudSet="cloudSet" />
      </div>
    </dv-border-box-8>

  </div>

</template>

<script>
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

export default {
  components: screenComponents,
  data() {
    return {
      borderName: "dv-border-box-8",
      curComponentName: undefined,
      isSet: false
    }
  },
  methods: {
    dropToBoard(e) {
      const content = JSON.parse(e.dataTransfer.getData("text/plain")); // 接收来自拖出的内容,并还原为对象
      const date = new Date();
      let names = content.name.split("_");
      if (names[0] == "border") {
        this.borderName = names[1].toLowerCase();
      }
      else if (names[0] == "chart") {
        this.curComponentName = names[1].toLowerCase();
      }

    },
    remove() {
      this.curComponentName = undefined;
    },
    set() {
      this.isSet = true;
    },
    cloudSet(isSet) {
      this.isSet = isSet;
    }
  }
}
</script>

<style lang="scss">
.module {
  height: 100%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    .chartHeader {
      padding: 10px 20px;
      color: #c3cbde;
      font-size: 16;
      font-weight: "normal";
      font-family: "Avenir, Helvetica, Arial, sans-serif";
      display: flex;
    }
    .chartContent {
      width: calc(100% - 4rem);
      height: calc(100% - 6rem);
      margin: 1.5rem 2rem;
      &.mediumWidth {
        width: calc(100% - 3rem);
        margin: 1.5rem 1.5rem;
      }
      &.center {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>