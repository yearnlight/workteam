<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
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
    .red {
      color: #f56c6c;
      cursor: pointer;
    }
    .redbg {
      background-color: #f56c6c;
    }
    .warn {
      color: #f39800;
      cursor: pointer;
    }
    .warnbg {
      background-color: #f39800;
    }
    .line-through {
      text-decoration: line-through;
      color: #999;
    }
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
        color: #f39800 !important;
      }
      .high {
        color: #f39800 !important;
      }
    }

    .reminderInline {
      font-size: 12px;
      display: inline-block;
      margin-left: 10px;
      color: #999;
      &-high {
        color: #f39800 !important;
      }
      .high {
        color: #f39800 !important;
      }
    }

    pre {
      font-family: Menlo, Monaco, Consolas, Courier New, monospace !important;
      line-height: 1.45em;
      font-size: 1em;
      width: 70%;
      margin: 0;
      code {
        font-size: 0.8em;
        padding: 0.5em 1em;
        margin: 0;
        word-break: normal;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace !important;
        display: block;
        color: #333;
        overflow: auto;
        background-color: #f8f8f8;
        border-radius: 2px;
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
