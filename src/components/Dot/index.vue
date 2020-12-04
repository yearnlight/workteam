<template>
  <span class="dot"><i :class="[level,'dot-level']"></i><span class="dot-bold"><slot>{{text}}</slot></span></span>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: 'primary',
    },
    text: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.dot {
  &-level {
    display: inline-block;
    margin-right: 8px;
    margin-top: 3px;
    vertical-align: top !important;
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 8.3px;
      height: 8.3px;
      border-radius: 50%;
    }

    &.primary {
      background-color: rgba(64, 158, 255, 0.1);
      box-shadow: 0 8px 16px 0 rgba(64, 158, 255, 0.36);
      &::before {
        background-color: #409eff;
      }
    }

    &.success {
      background-color: rgba(103, 194, 58, 0.1);
      box-shadow: 0 8px 16px 0 rgba(103, 194, 58, 0.36);
      &::before {
        background-color: #67c23a;
      }
    }

    
    &.warning {
      background-color: rgba(230, 162, 60, 0.1);
      box-shadow: 0 8px 16px 0 rgba(230, 162, 60, 0.36);
      &::before {
        background-color: #e6a23c;
      }
    }

    &.danger {
      background-color: rgba(245, 108, 108, 0.1);
      box-shadow: 0 8px 16px 0 rgba(245, 108, 108, 0.36);
      &::before {
        background-color: #f56c6c;
      }
    }

    
    &.info {
      background-color: rgba(144, 147, 153, 0.1);
      box-shadow: 0 8px 16px 0 rgba(144, 147, 153, 0.36);
      &::before {
        background-color: #909399;
      }
    }

    &.test {
      background-color: rgba(151, 100, 224, 0.1);
      box-shadow: 0 8px 16px 0 rgba(151, 100, 224, 0.36);
      &::before {
        background-color: #9764e0;
      }
    }
  }

  &-bold {
    font-weight: 600 !important;
    font-size: 14px;
  }
}
</style>