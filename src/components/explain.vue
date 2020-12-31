<template>
  <div class="layout">
    <div class="explain" :style="`background:url(${bgBlank})`">
      <div class="explain-content">
        <div class="explain-title">{{displayConfigs.title}}</div>
        <div class="explain-desc">{{displayConfigs.desc}}</div>
      </div>
      <div class="explain-icon">
        <!-- <img class="explain-ico-img" :src="configs.icon" /> -->
        <svg-icon class="explain-icon-img" :icon-class="displayConfigs.icon || 'cloud_host'"></svg-icon>
      </div>
      <!-- <el-button type="primary" @click="$parent.create">创建服务</el-button> -->
      <el-button type="primary" @click="create">创建服务</el-button>
    </div>
  </div>
</template>

<script>
import fields from "@/resource/fields";
export default {
  props: {
    configs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      bgBlank: require('@/assets/bg-blank.png'),
      displayConfigs: {}
    }
  },
  watch: {
    name(n, o) {
      if (n && n != o) {
        // 如果没有传configs，尝试用name去fields中找配置
        this.setData(n);
      }
    }
  },
  created() {
    // 如果没有传configs，尝试用name去fields中找配置
    this.setData(this.name)
  },
  methods: {
    create() {
      this.$message.warning("开发中......")
    },
    setData(name) {
      // 如果没有传configs，尝试用name去fields中找配置
      if (!(this.configs && this.configs.name)) {
        this.$set(this.displayConfigs, "title", fields[name].name)
        this.$set(this.displayConfigs, "desc", fields[name].explain)
        this.$set(this.displayConfigs, "icon", fields[name].icon)
      }
      else {
        this.displayConfigs = this.configs;
      }
    }
  }
};
</script>

<style lang="scss">
.layout {
  padding: 10px 20px !important;
}
.explain {
  width: 856px;
  height: 211px;
  padding: 40px !important;
  background: url(../assets/bg.png) no-repeat;
  background-size: contain;
  display: flex;
  justify-content: space-between;
  position: relative;
  &-title {
    font-size: 26px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  &-desc {
    max-width: 600px;
    word-break: break-all;
    color: #666;
  }
  &-content {
    max-width: 600px;
  }
  &-icon {
    display: inline-flex;
    width: 170px;
    margin-right: 40px;
    align-items: center;
    &-img {
      height: 120px !important;
      width: 120px !important;
      padding: 20px !important;
      border: 1px solid #fff !important;
      border-radius: 40px !important;
      color: #108ee9;
    }
  }
  .el-button {
    position: absolute;
    bottom: 39px;
    width: 176px;
    height: 42px;
    font-size: 13px;
    border: none;
    background-color: #409eff;
    color: #fff;
    border-radius: 0;
  }
}
</style>