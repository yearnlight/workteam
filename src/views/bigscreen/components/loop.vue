<template>
  <div class="loop">
    <slot />
    <div class="chartContent center">
      <dv-active-ring-chart v-if="isRefresh" :config="config" style="height:145px;width:145px;" />
    </div>
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
        radius: '70%',
        activeRadius: '75%',
        color: [],
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
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ],
        digitalFlopStyle: {
          fontSize: 20
        },
        showOriginValue: true
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