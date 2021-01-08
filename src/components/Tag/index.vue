<template>
    <span :class="[type,'tag']">
        <slot>{{text}}</slot>
    </span>
</template>
<script>
export default {
    props: {
        type: {
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
.tag {
  padding: 3px 8px !important;
  color: #fff !important;
}

.primary {
  background-color:  #409eff;
}

.success {
  background-color:  #67c23a;
}

.warning {
  background-color:  #e6a23c;
}

.danger {
  background-color:  #f56c6c;
}

.info {
  background-color:  #909399;
}

.test {
  background-color: #9764e0;
}
</style>
