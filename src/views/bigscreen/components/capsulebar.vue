<template>
  <div class="capsulebar">
    <div class="chartHeader" :style="{justifyContent: config.title.align}">{{config.title.text}}</div>
    <dv-capsule-chart v-if="isRefresh" :config="config" class="chartContent" />
    <el-dialog title="配置胶囊柱图" :visible.sync="isOpen" @closed="onClosed">
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
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="interface" v-if="form.isInterface == 1">
          <el-form-item label="接口" prop="interface">
            <el-input v-model="form.interface" placeholder="请输入接口" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <div class="data" v-else>
          <el-form-item label="X轴数据" prop="xData">
            <el-input v-model="form.xData" placeholder="数组类型，例如：['北京','西安','武汉','南京']" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Y轴数据" prop="yData">
            <el-input v-model="form.yData" placeholder="数组类型，例如：[126,69,78,79]" type="textarea" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="单位" prop="unit">
            <el-input v-model="form.unit" placeholder="请输入单位" autocomplete="off"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOpen = false">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import setMinxin from "./set.js"
export default {
  mixins: [setMinxin],
  data() {
    return {
      config: {
        title: {
          text: "人口基数",
          align: "left"
        },
        data: [
          {
            name: '南阳',
            value: 167
          },
          {
            name: '周口',
            value: 123
          },
          {
            name: '漯河',
            value: 98
          },
          {
            name: '郑州',
            value: 75
          },
          {
            name: '西峡',
            value: 66
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '单位'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.capsulebar {
  width: 100%;
  height: 100%;
}
</style>