<template>
  <span :class="[level,'level',{'dark':effect == 'dark','plain':effect == 'plain'}]"><slot>{{text}}</slot></span>
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
    },
    effect: {
      type: String,
      default: 'dark',
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  padding: 2px 5px;
  font-size: 13px;
  color: #666;
}

.primary {
  border-left: 3px solid #409eff;
  &.dark {
    background-color: #ecf5ff;
  }
}

.success {
  border-left: 3px solid #67c23a;
  &.dark {
    background-color: #f0f9eb;
  }
}

.warning {
  border-left: 3px solid #e6a23c;
  &.dark {
    background-color: #fdf6ec;
  }
}

.danger {
  border-left: 3px solid #f56c6c;
  &.dark {
    background-color: #fef0f0;
  }
}

.info {
  border-left: 3px solid #909399;
  &.dark {
    background-color: #f4f4f5;
  }
}

.test {
  border-left: 3px solid #9764e0;
  &.dark {
    background-color: #9764e033;
  }
}
</style>
