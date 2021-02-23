<template>
  <v-chart :options="options" autoresize />
</template>

<script>
import echarts from "echarts";
export default {
  created() {
    let demoData = [
      { date: "2021-02-23", pm25: 10, pm10: 2 },
      { date: "2021-02-24", pm25: 6, pm10: 3 },
      { date: "2021-02-25", pm25: 3, pm10: 2 },
      { date: "2021-02-26", pm25: 15, pm10: 6 },
      { date: "2021-02-27", pm25: 11, pm10: 1 },
      { date: "2021-02-28", pm25: 12, pm10: 4 },
    ]
    this.render(demoData)
  },
  methods: {
    render(source) {
      this.options.title.text = "环境监测曲线图";
      this.options.yAxis.name = "μg/m³";
      this.options.xAxis.data = source.map((m) => m.date);
      this.options.series.push({
        name: "PM2.5",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          color: "#2a87be",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(62, 185, 226,0.5)",
            },
            {
              offset: 1,
              color: "rgb(62, 185, 226,0.1)",
            },
          ]),
        },
        data: source.map((m) => m.pm25),
      });
      this.options.series.push({
        name: "PM10",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          color: "#e0b66a",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(224, 182, 106, 0.5)",
            },
            {
              offset: 1,
              color: "rgb(224, 182, 106,0.1)",
            },
          ]),
        },
        data: source.map((m) => m.pm10),
      });
    },
  },
  data() {
    return {
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
            splitLine: {
              show: false,
            },
          },
        },
        legend: {
          data: ["PM2.5", "PM10"],
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
        series: [],
        animationDuration: 100,
        grid: {
          bottom: 20,
          top: 80,
          right: 40,
          containLabel: true,
        },
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>