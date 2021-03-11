<template>
  <div>
    <slot></slot>
    <div class="chartContent">
      <v-chart :options="options" autoresize v-if="isShow" />
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.render();
    this.isShow = true;
  },
  methods: {
    render() {
      this.options.title.text = "Echart柱状图";
      this.options.title.show = false;
      this.options.yAxis.name = "人";
      this.options.legend.data.push(["压强"]);
      this.options.xAxis.data = [
        "08-12",
        "08-13",
        "08-14",
        "08-15",
      ];
      this.options.series.push({
        name: "人数",
        type: "bar",
        barMaxWidth: 30,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: [1, 23, 20, 7],
      });
    },
  },
  data() {
    return {
      isShow: false,
      dataShadow: [25, 25, 25, 25],
      options: {
        title: {
          left: "left",
          text: "",
          textStyle: {
            color: "#c3cbde",
            fontSize: 16,
            fontWeight: "normal",
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          },
          padding: 20,
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        yAxis: {
          type: "value",
          name: "",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          nameTextStyle: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: [],
          nameTextStyle: {
            color: "#fff",
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: false,
          },
        },
        legend: {
          show: false,
          data: ["活跃人数"],
          top: 30,
          textStyle: {
            color: "#ffffff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "#fff",
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: this.dataShadow,
            animation: false,
          },
        ],
        animationDuration: 100,
        grid: {
          containLabel: true,
          bottom: 10
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.chartContent {
  .echarts {
    height: 100%;
    width: 100%;
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