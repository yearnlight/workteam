<template>
  <div class="ranking">
    <slot />
    <dv-scroll-ranking-board :config="config" v-if="isRefresh" class="chartContent" />
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
            value: 55123
          },
          {
            name: '南阳',
            value: 12022
          },
          {
            name: '西峡',
            value: 78932
          },
          {
            name: '驻马店',
            value: 63411
          },
          {
            name: '洛阳',
            value: 49411
          },
          {
            name: '新乡',
            value: 44231
          }
        ],
        unit: '单位',
        valueFormatter({ value }) {
          const reverseNumber = (value + '').split('').reverse()
          let valueStr = ''

          while (reverseNumber.length) {
            const seg = reverseNumber.splice(0, 3).join('')
            valueStr += seg
            if (seg.length === 3) valueStr += ','
          }

          return valueStr.split('').reverse().join('')
        }
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

