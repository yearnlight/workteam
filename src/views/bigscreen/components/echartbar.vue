<template>
  <v-chart :options="options" autoresize v-if="isShow" />
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
      this.options.title.text = "卸料平台";
      this.options.yAxis.name = "%";
      this.options.legend.data.push(["压强"]);
      this.options.xAxis.data = [
        "2020-8-12",
        "2020-8-13",
        "2020-8-14",
        "2020-8-15",
      ];
      this.options.series.push({
        name: "电量",
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
          data: ["电量"],
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
          top: 80,
          containLabel: true,
        },
      },
    };
  },
};
</script>

<style lang="scss">
.echarts {
  height: 100%;
  width: 100%;
}
</style>