<template>
  <div class="cone">
    <slot />
    <dv-conical-column-chart v-if="isRefresh" class="chartContent" :config="config"></dv-conical-column-chart>
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
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 71
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 35
          },
          {
            name: '漯河',
            value: 15
          }
        ],
        img: [

        ],
        showValue: true
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