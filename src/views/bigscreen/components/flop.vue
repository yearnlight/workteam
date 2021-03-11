<template>
  <div>
    <slot />
    <div class="chartContent center">
      <dv-digital-flop :config="config" style="width:200px;height:50px;" />
    </div>
  </div>
</template>

<script>
function formatter(number) {
  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

  return segs.join(',').split('').reverse().join('')
}

export default {
  data() {
    return {
      config: {
        number: [123456],
        content: '{nt}个',
        formatter
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