<template>
  <div class="capsulebar">
    <slot />
    <dv-capsule-chart v-if="isRefresh" :config="config" class="chartContent" />
  </div>
</template>

<script>
export default {
  props: {
    isRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      config: {
        title: {
          text: "人口基数",
          align: "left"
        },
        data: [
          {
            name: '南阳',
            value: 167
          },
          {
            name: '周口',
            value: 123
          },
          {
            name: '漯河',
            value: 98
          },
          {
            name: '郑州',
            value: 75
          },
          {
            name: '西峡',
            value: 66
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '单位'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chartContent {
  .echarts {
    height: 100%;
  }
  width: 100%;
  height: calc(100% - 31px);
  &.center {
    display: flex;
    justify-content: center;
  }
}
</style>