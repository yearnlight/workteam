<template>
  <div class="echartloop">
    <div class="chartHeader" :style="{justifyContent: config.title.align}">{{config.title.text}}</div>
    <div class="chartContent center">
      <v-chart :options="config" autoresize />
    </div>

    <el-dialog title="配置环形图" :visible.sync="isOpen" @closed="onClosed">
      <el-form :model="form" ref="form" :rules="rules" label-width="140px">
        <el-form-item label="模块标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="模块标题位置" prop="align">
          <el-radio-group v-model="form.align">
            <el-radio label="left">居左</el-radio>
            <el-radio label="center">居中</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否对接接口" prop="isInterface">
          <el-radio-group v-model="form.isInterface">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="interface" v-if="form.isInterface == 1">
          <el-form-item label="接口" prop="interface">
            <el-input v-model="form.interface" placeholder="请输入接口" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="请求类型" prop="interfaceType">
            <el-select v-model="form.interfaceType" clearable placeholder="请选择接口类型">
              <el-option v-for="item in interfaceTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="请求参数" prop="interfaceBody">
            <el-input v-model="form.interfaceBody" type="textarea" placeholder="请输入接口参数" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <div class="data" v-else>

          <el-form-item label="X轴数据" prop="xData">
            <el-input v-model="form.xData" placeholder="数组类型，例如：['北京','西安','武汉','南京']" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Y轴数据" prop="yData">
            <el-input v-model="form.yData" placeholder="数组类型，例如：[126,69,78,79]" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

        </div>

        <el-form-item label="设置颜色组" prop="colors">
          <el-select v-model="form.colors" multiple filterable allow-create default-first-option placeholder="请设置颜色组">
            <el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpen = false">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ECharts from "echarts";
import setMinxin from "./set.js"
export default {
  mixins: [setMinxin],
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
.echartloop {
  height: 100%;
  width: 100%;
  .echarts {
    height: 100%;
    width: 100%;
  }
}
</style>