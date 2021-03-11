<template>
  <div>
    <slot />
    <div class="chartContent center">
      <v-chart :options="config" autoresize />
    </div>
  </div>
</template>

<script>
import ECharts from "echarts";
export default {
  data() {
    return {
      config: {
        title: {
          text: "任务分布",
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          show: true,
          bottom: 0,
          data: ["待办", "需求分析中"],
          padding: [5, 5],
          selected: {
            完结: false,
          },
          textStyle: {
            color: '#ffffff'
          }
        },
        color: [
          "#409EFF",
          "#F56C6C",
          "#909399",
          "#E6A23C",
          "#9764e0",
          "#e06ab7",
          "#333333",
          "#67C23A",
        ],
        data: undefined,
        series: [
          {
            name: "任务状态",
            type: "pie",
            radius: ["35%", "55%"],
            center: ["50%", "40%"],
            label: {
              formatter: "{b} {c}",
            },
            data: [{ name: "待办", value: 2 }, { name: "需求分析中", value: 3 }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    }
  },
  watch: {
    "config.data": {
      handler(n, o) {
        if (n) {
          this.config.series[0].data = n;
          this.config.legend.data = n.filter(f => f.name);
        }
      },
      deep: true
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