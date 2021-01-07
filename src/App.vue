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
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .reminder {
    font-size: 12px;
    color: #999;
    max-width: 320px;
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

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(144, 147, 153, 0.3);
    -webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
  }

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
    .high {
      color: #f39800 !important;
    }
    .blue {
      color: #409eff;
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
    .el-dialog {
      .el-form {
        &-item {
          .el-input,
          .el-select,
          .el-textarea {
            width: 70%;
            .el-input {
              width: 100%;
            }
          }
        }
      }
    }
    .action {
      .label {
        font-size: 12px;
        display: inline-block;
        line-height: 18px;
        padding: 0 10px;
        border: 1px solid #007fff;
        border-radius: 14px;
        color: #007fff;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
    .pre {
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

    .hljs {
      line-height: 1.8;
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
      font-size: 12px;
      padding: 18px 24px;
      background-color: #fafafa;
      border: 1px solid #eaeefb;
      margin-bottom: 25px;
      border-radius: 4px;
      -webkit-font-smoothing: auto;
    }

    .base {
      border: 1px solid rgb(236, 239, 248);
      margin-bottom: 10px;
      padding: 10px 20px 0px;

      &-header {
        font-size: 16px;
        line-height: 1;
        margin-top: 5px;
        margin-bottom: 25px;
        border-left: 4px solid rgb(64, 158, 255);
        padding-left: 14px;
        vertical-align: middle;
      }

      &-content {
        padding: 20px;
      }

      &-operate {
        margin-top: 10px;
        text-align: right;
        padding: 10px 20px 10px 0px !important;
        border: 1px solid rgb(236, 239, 248);
        margin-bottom: 10px;
      }

      .el-form {
        &-item {
          .el-input,
          .el-select,
          .el-textarea {
            width: 50%;
            .el-input {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
