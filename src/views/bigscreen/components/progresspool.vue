<template>
  <div>
    <slot />
    <div class="chartContent center">
      <dv-percent-pond :config="config" style="width:200px;height:100px;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        value: 66,
        lineDash: [10, 2]
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
    align-items: center;
  }
}
</style>