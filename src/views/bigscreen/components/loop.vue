<template>
  <div class="loop">
    <div class="header" :style="{justifyContent: config.title.align}">{{config.title.text}}</div>
    <div class="chartContent center">
      <dv-active-ring-chart v-if="isRefresh" :config="config" style="height:145px;width:145px;" />
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

        <el-form-item label="X轴数据" prop="xData">
          <el-input v-model="form.xData" placeholder="数组类型，例如：['北京','西安','武汉','南京']" type="textarea" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Y轴数据" prop="yData">
          <el-input v-model="form.yData" placeholder="数组类型，例如：[126,69,78,79]" type="textarea" autocomplete="off"></el-input>
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
        radius: '70%',
        activeRadius: '75%',
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ],
        digitalFlopStyle: {
          fontSize: 20
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loop {
  width: 100%;
  height: 100%;
}
</style>