<template>
  <div class="doc">
    <div v-if="token" :class="[{'hidden':isInFrame},'docHeader']">
      <div class="docHeader-title">
        工作协作平台
        <span @click="isCollapse = !isCollapse" :class="[{'el-icon-d-arrow-left':!isCollapse,'el-icon-d-arrow-right':isCollapse},'collapse']"></span>
      </div>
      <div class="docHeader-items">
        <el-dropdown class="userInfo-container mr-20" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- <img v-if="avatar" :src="avatar" class="user-avatar" /> -->
            <el-avatar :style="`background:${bg}`">{{name.charAt(name.length-1)}}</el-avatar>
            <span class="user-nickname">
              {{ name }}
              <i class="el-icon-caret-bottom el-icon--right" />
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">
              <span class="el-icon-user" />个人信息
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <span class="el-icon-switch-button" />退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div :class="[{'in-frame':isInFrame,'no':!token},'docMenu']">
      <div v-if="token" :class="[{'maxWidth':!isCollapse,'minWidth':isCollapse},'docMenu-content']">
        <el-menu :collapse="isCollapse" :default-active="$route.path" :router="true" background-color="#304156" text-color="#bfcbd9" active-text-color="#00a4ff">

          <el-menu-item :index="item.path" v-for="(item,index) in leftmenus.filter(m=>!m.children)" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>

          <el-submenu v-for="(item,index) in leftmenus.filter(m=>m.children)" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="citem.path" v-for="(citem,cindex) in item.children" :key="cindex">
              <span slot="title"><i :class="citem.icon"></i>{{citem.title}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <div :class="[{'maxWidth':!isCollapse,'minWidth':isCollapse,'no':!token},'docMenu-main']">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "@/menu.js";
export default {
  data() {
    return {
      name: "江阿生",
      isInFrame: false,
      isCollapse: false,
      colors: [
        "#409EFF",
        "#F56C6C",
        "#909399",
        "#E6A23C",
        "#9764e0",
        "#e06ab7",
        "#67C23A",
      ],
    };
  },
  computed: {
    bg() {
      return this.colors[Math.floor(Math.random() * 7)];
    },
    token() {
      return this.$util.getToken()
    }
  },
  created() {
    this.leftmenus = menus;
    this.setRoute();
    let userStr = sessionStorage.getItem("userInfo");
    if (userStr) {
      let userInfo = JSON.parse(userStr);
      this.name = userInfo.name;
    }
  },
  mounted() {
    if (window.self !== window.top) {
      this.isInFrame = true;
    }
  },
  methods: {
    setRoute() { },
    handleCommand(command) {
      if (command == "logout") {
        this.$confirm("你确定退出当前系统 ?", "退出").then(() => {
          window.sessionStorage.clear();
          this.$router.push("/login");
        });
      }
    },
  },
};
</script>

<style lang="scss">
%addBorder {
  border-radius: 5px;
  padding: 12px;
  border: 1px solid #ebeef5;
  margin-bottom: 12px;
}
.collapse {
  margin-left: 10px;
  cursor: pointer;
}
.hidden {
  display: none !important;
}
.doc {
  height: 100%;
  .docHeader {
    height: 50px;
    background-color: #2b303b;
    padding: 0 20px;
    display: flex;
    align-items: center;
    &-title {
      font-size: 16px;
      height: 21px;
      line-height: 21px;
      color: #fff;
    }
    &-items {
      margin-left: auto;
      .userInfo-container {
        .el-dropdown-link {
          display: flex;
          align-items: center;
          .user-nickname {
            margin-left: 5px;
          }
        }
        color: #fff;
        .user-avatar {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
  .docMenu {
    display: flex;
    height: calc(100% - 50px);
    &.no {
      height: 100% !important;
    }
    &.in-frame {
      height: 100%;
    }
    .add-operate {
      @extend %addBorder;
      text-align: right;
    }
    &-content {
      &.no {
        width: 0 !important;
      }
      &.maxWidth {
        width: 160px;
      }
      &.minWidth {
        width: 64px;
      }
      &-title {
        padding: 5px;
        color: #a1a6ab;
        font-size: 14px;
      }
      background-color: rgb(48, 65, 86);
      .el-menu {
        border-right: 0;
        .el-submenu {
          .el-menu {
            background-color: #1f2d3d !important;
            .el-menu-item {
              min-width: 160px !important;
            }
          }
        }
        .el-submenu__title {
          margin-bottom: 5px;
          line-height: 36px;
          height: 36px;
          padding: 0;
        }
        .el-menu-item {
          &.is-active {
            background-color: #00a4ff !important;
            color: #ffffff !important;
          }
          // &.is-active::after {
          //   content: "";
          //   position: absolute;
          //   right: 0;
          //   top: 0;
          //   width: 2px;
          //   background-color: #00a4ff;
          //   bottom: 0;
          //   z-index: 1;
          //   height: 100%;
          // }
          height: 36px;
          line-height: 36px;
        }
      }
    }
    &-main {
      overflow-y: auto;
      height: calc(100% - 20px);
      &.maxWidth {
        width: calc(100% - 180px);
      }
      &.minWidth {
        width: 64px;
        width: calc(100% - 84px);
      }
      &.no {
        width: 100% !important;
      }
      padding: 10px;
      &.in-frame {
        height: 100%;
        width: 100%;
        padding: 0;
      }
      background-color: rgb(240, 242, 245);
      .add {
        &-base {
          &-header {
            font-weight: 600;
            border-bottom: 1px solid #e6e6e6;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            font-size: 16px;
          }
          &-content {
            padding: 20px;
            &-table {
              margin-top: 10px;
              width: 70%;
            }
          }
          @extend %addBorder;
          padding: 0px;
          .el-form {
            &-item {
              .el-input,
              .el-alert,
              .el-textarea,
              .el-date-editor,
              .el-select {
                width: 50%;
                .el-input {
                  width: 100%;
                }
              }
              .el-col {
                .el-input {
                  width: 100%;
                }
              }
            }
          }
        }
        &-operate {
          @extend %addBorder;
          text-align: right;
        }

        &.cell3 {
          .add-base {
            &-content {
              display: flex !important;
              flex-wrap: wrap;
              .el-form-item {
                width: 33.33% !important;
              }
            }
          }
        }

        &.cell2 {
          .add-base {
            &-content {
              display: flex !important;
              flex-wrap: wrap;
              .el-form-item {
                width: 50% !important;
              }
            }
          }
        }
      }
      & > div:first-child {
        background-color: #fff;
        height: calc(100% - 20px);
        padding: 10px;
        overflow-y: auto;
      }
    }
  }
}
</style>