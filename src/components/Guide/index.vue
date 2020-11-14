<template>
  <div class="guide">
    <div :class="[level,'guide-wrapper']">
      <div class="guide-wrapper-container">
        <div class="guide-wrapper-container-line"></div>
        <div class="circle">
          <span class="circle-number">{{step}}</span>
        </div>
      </div>
      <div class="card">
        <span class="card-title">{{title}}</span>
        <div class="card-content">
          {{desc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    level: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: '标题'
    },
    desc: {
      type: String,
      default: '详情'
    }
  }
}
</script>


<style lang="scss" scoped>
.guide {
  padding-top: 15px;
  font-size: 0;
  &:not(:last-child) {
    margin-right: 5px;
  }
  &-wrapper {
    &-container {
      &-line {
        position: absolute;
        width: 34px;
        height: 3px;
        background: #fff;
        left: 23px;
      }
      .circle {
        position: absolute;
        top: -15px;
        left: 24px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid #5e7ce0;
        box-sizing: border-box;
        background: #fff;
        &-number {
          color: #526ecc;
          font-size: 20px;
          width: 100%;
          height: 100%;
          line-height: 1.5;
          text-align: center;
          position: absolute;
        }
      }

      max-width: none;
      position: relative;
      display: inline-block;
      margin-right: 8px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      vertical-align: top;
      flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
    }

    .card {
      background: #fff;
      border-top: 3px solid #5e7ce0;
      box-sizing: border-box;
      padding: 24px 24px 20px;
      &-title {
        background: #fff;
        font-weight: 700;
        font-size: 14px;
        line-height: 1.5;
        color: #252b3a;
      }
      &-content {
        background: #fff;
        font-size: 12px;
        line-height: 1.5;
        color: #575d6c;
      }
    }

    &.primary {
      .circle {
        border: 2px solid #409eff;
        &-number {
          color: #409eff;
        }
      }
      .card {
        border-top: 3px solid #409eff;
      }
    }
    &.success {
      .circle {
        border: 2px solid #67c23a;
        &-number {
          color: #67c23a;
        }
      }
      .card {
        border-top: 3px solid #67c23a;
      }
    }
    &.danger {
      .circle {
        border: 2px solid #f56c6c;
        &-number {
          color: #f56c6c;
        }
      }
      .card {
        border-top: 3px solid #f56c6c;
      }
    }
    &.warning {
      .circle {
        border: 2px solid #e6a23c;
        &-number {
          color: #e6a23c;
        }
      }
      .card {
        border-top: 3px solid #e6a23c;
      }
    }
    &.info {
      .circle {
        border: 2px solid #909399;
        &-number {
          color: #909399;
        }
      }
      .card {
        border-top: 3px solid #909399;
      }
    }
    &.test {
      .circle {
        border: 2px solid #9764e0;
        &-number {
          color: #9764e0;
        }
      }
      .card {
        border-top: 3px solid #9764e0;
      }
    }
  }
}
</style>
