<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  #app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    .priority {
      padding: 2px 5px !important;
    }
    .status {
      padding: 3px 8px !important;
      color: #fff !important;
    }
    .reminderBtn {
      font-size: 16px !important;
      margin-left: 10px !important;
      color: #999 !important;
    }

    .reminder {
      font-size: 12px;
      color: #999;
      &-high {
        color: #f39800;
      }
      .high {
        color: #f39800;
      }
    }
    .el-button,
    .el-input__inner,
    .el-textarea__inner {
      border-radius: 0 !important;
    }
    .page-intro {
      overflow: hidden;
      -webkit-border-radius: 3px 3px 0 0;
      -moz-border-radius: 3px 3px 0 0;
      border-radius: 3px 3px 0 0;
      margin-bottom: 10px;
      color: #4c5e70;
      p {
        margin: 16px 20px;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>
