<template>
  <div>
    <slot />
    <div class="chartContent center">
      <dv-water-level-pond :config="config" style="width:150px;height:150px;" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [55],
        shape: 'round'
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