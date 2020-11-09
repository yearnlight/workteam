<template>
  <!-- matterr -->
  <a :class="[`is-${level}`,'matter-a']">
    <div class="matter-content">
      <div class="matter-content-left">
        <span class="matter-content-left-title">{{title}}</span>
      </div>
      <div class="matter-content-right">
        <span class="value">{{value}}</span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: 'primary',
    },
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '0',
    }
  }
}
</script>

<style lang="scss" scoped>
.matter-a {
  margin-bottom: 8px;
  position: relative;
  color: #000;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f3f6fb;
  min-width: 0;
  &::before {
    content: "";
    display: block;
    width: 3px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
}
.is-danger {
  background-color: #fef0f0 !important;
  &::before {
    background: #f56c6c;
  }
  .value {
    color: #f56c6c;
  }
}

.is-primary {
  background-color: #ecf5ff !important;
  &::before {
    background: #409eff;
  }
  .value {
    color: #409eff;
  }
}

.is-success {
  background-color: #f0f9eb !important;
  .value {
    color: #67c23a;
  }
  &::before {
    background: #67c23a;
  }
}

.is-warning {
  background-color: #fdf6ec !important;
  .value {
    color: #e6a23c;
  }
  &::before {
    background: #e6a23c;
  }
}

.is-info {
  background-color: #f4f4f5 !important;
  .value {
    color: #909399;
  }
  &::before {
    background: #909399;
  }
}

.is-test {
  background-color: #9764e033 !important;
  .value {
    color: #9764e0;
  }
  &::before {
    background: #9764e0;
  }
}

.matter-content {
  display: flex;
  width: 100%;
  align-items: center;
  &-left {
    display: flex;
    align-items: center;
    flex: auto;
    text-align: left;
    &-title {
      font-size: 12px;
    }
  }
  &-right {
    flex: 0 1 60px;
    justify-content: flex-end;
    .value {
      font-size: 18px;
    }
  }
}
</style>


