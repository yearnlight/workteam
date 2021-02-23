<template>
  <div class="ranking">
    <div class="header" :style="{justifyContent: config.title.align}">{{config.title.text}}</div>
    <dv-scroll-ranking-board :config="config" v-if="isRefresh" class="chartContent" />

    <el-dialog title="配置排名图" :visible.sync="isOpen" @closed="onClosed">
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
          console.warn(arguments)
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
.ranking {
  width: 100%;
  height: 100%;
}
</style>

