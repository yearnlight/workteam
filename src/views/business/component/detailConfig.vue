<template>
  <div class="base">
    <div class="base-header">详情配置</div>
    <div class="base-content">
      <el-form ref="setForm" :model="setDetailData" size="small" label-width="180px">
        <div class="module" v-for="(module,mindex) in setDetailData.detail" :key="mindex">
          <div class="module-content">
            <el-form-item label="详情模块标题" :prop="`detail[${mindex}].name`" :rules="[{ required: true, message: '请输入详情模块标题', trigger: 'blur' }]">
              <el-input v-model="module.name" placeholder="请输入详情模块标题，默认‘基本信息’" clearable></el-input>
            </el-form-item>
            <el-form-item label="基本详情配置" class="detailConfig" prop="tableColumns">
              <!-- 详情 -->
              <div class="columns">
                <!-- setData.tableColumns -->
                <div class="columns-item">
                  <div class="columns-item-node">
                    <div class="header">对应属性</div>
                  </div>
                  <div class="columns-item-node">
                    <div class="header">对应名称</div>
                  </div>
                  <div class="columns-item-node miniWidth">
                    <div class="header">是否开启Tooltip</div>
                  </div>
                  <div class="columns-item-node miniWidth">
                    <div class="header">设置为枚举列</div>
                  </div>
                  <div class="columns-item-node miniWidth" v-if="module.fields.some(s => s.isEnum)">
                    <div class="header">枚举列配置</div>
                  </div>
                </div>

                <div class="columns-item" v-for="(item,index) in module.fields" :key="index">
                  <div class="columns-item-node">
                    <el-input placeholder="对应属性" v-model="item.key"></el-input>
                  </div>
                  <div class="columns-item-node">
                    <el-input placeholder="对应名称" v-model="item.name"></el-input>
                  </div>
                  <div class="columns-item-node miniWidth">
                    <el-switch v-model="item['show-overflow-tooltip']"></el-switch>
                  </div>
                  <div class="columns-item-node miniWidth">
                    <el-switch v-model="item.isEnum" @change="changeSetEnum(item)"></el-switch>
                  </div>
                  <div :class="[{'placeHidden':!item.isEnum,'placeVisible':item.isEnum},'columns-item-node miniWidth']" v-if="module.fields.some(s => s.isEnum)">
                    <el-button size="mini" icon="el-icon-setting" @click="setDetailEnumColumn(item,index)">{{item.enums ?"查看枚举列":"设置枚举列"}}</el-button>
                  </div>

                  <div class="columns-item-operate">
                    <el-button size="mini" icon="el-icon-minus" v-if="module.fields.length != 1" @click="minus(module.fields,index)"></el-button>
                    <el-button size="mini" icon="el-icon-plus" @click="plus(module.fields)" v-if="module.fields.length == (index + 1)"></el-button>
                  </div>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="录入测试数据" class="detailConfig" prop="testData">
              <div class="detailConfig-testData">
                <div v-for="(item,index) in module.fields" :key="index" class="detailConfig-testData-item">
                  <label>{{item.name}}：</label>
                  <el-select v-if="item.enums" clearable placeholder="请选择" v-model="item.value">
                    <el-option :label="obj.label" :value="key" v-for="(obj,key) in item.enums" :key="key"></el-option>
                  </el-select>
                  <el-input v-else v-model="item.value" :placeholder="`${item.name}测试数据`"></el-input>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="module-operate">
            <el-button size="mini" icon="el-icon-minus" v-if="setDetailData.detail.length != 1" @click="minus(setDetailData.detail,mindex)"></el-button>
            <el-button size="mini" icon="el-icon-plus" @click="plusModule(setDetailData.detail,mindex)"></el-button>
          </div>
        </div>

        <el-form-item>
          <el-button @click="preview" type="warning" icon="el-icon-view">详情预览</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- 设置枚举列 -->
    <el-dialog v-bind="$attrs" :close-on-click-modal="false" v-on="$listeners" :visible.sync="isEnumColumn" @close="onCloseEnumDialog" title="设置枚举列">
      <el-form ref="pageForm" :model="enumConfigFormData" size="small" label-width="120px">
        <el-form-item label="枚举列配置" prop="operates" class="tableConfig">
          <div class="columns">
            <div class="columns-item">
              <div class="columns-item-node">
                <div class="header">枚举Value</div>
              </div>
              <div class="columns-item-node">
                <div class="header">枚举显示Label</div>
              </div>
              <div class="columns-item-node miniWidth">
                <div class="header">枚举呈现组件</div>
              </div>
              <div class="columns-item-node miniWidth">
                <div class="header">组件类型</div>
              </div>
            </div>

            <div class="columns-item" v-for="(item,index) in enumConfigFormData.arrEnums" :key="index">
              <div class="columns-item-node">
                <el-input clearable placeholder="枚举Value" v-model="item.key"></el-input>
              </div>
              <div class="columns-item-node">
                <el-input clearable placeholder="枚举显示Label" v-model="item.label"></el-input>
              </div>

              <div class="columns-item-node miniWidth">
                <el-select clearable placeholder="请选择枚举呈现组件" v-model="item.component">
                  <el-option label="Dot" value="dot"></el-option>
                  <el-option label="El-Tag" value="el-tag"></el-option>
                  <el-option label="Tag" value="tag"></el-option>
                  <el-option label="Level" value="level"></el-option>
                </el-select>
              </div>

              <div class="columns-item-node miniWidth" v-if="item.component">
                <el-select clearable placeholder="请选择组件类型" v-model="item.type">
                  <el-option label="一般" value="primary">
                    <tag type="primary">一般</tag>
                  </el-option>
                  <el-option label="成功" value="success">
                    <tag type="success">成功</tag>
                  </el-option>
                  <el-option label="警告" value="warning">
                    <tag type="warning">警告</tag>
                  </el-option>
                  <el-option label="危险" value="danger">
                    <tag type="danger">危险</tag>
                  </el-option>
                  <el-option label="信息" value="info">
                    <tag type="info">信息</tag>
                  </el-option>
                  <el-option label="测试" value="test">
                    <tag type="test">测试</tag>
                  </el-option>
                </el-select>
              </div>

              <div class="columns-item-operate">
                <el-button size="mini" icon="el-icon-minus" v-if="enumConfigFormData.arrEnums.length != 1" @click="minus(enumConfigFormData.arrEnums,index)"></el-button>
                <el-button size="mini" icon="el-icon-plus" @click="plus(enumConfigFormData.arrEnums)" v-if="enumConfigFormData.arrEnums.length == (index + 1)"></el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEnumColumn = false;">取消</el-button>
        <el-button type="primary" @click="saveEnumConfig">确定</el-button>
      </div>
    </el-dialog>

    <!-- 详情预览 -->
    <el-dialog v-bind="$attrs" custom-class="tablePreview" :close-on-click-modal="false" v-on="$listeners" width="70%" :visible.sync="isPreview" title="预览详情">
      <div class="tablePreview-content">
        <detail-model v-if="isPreview" :configs="setDetailData" />
      </div>

      <div slot="footer">
        <el-button @click="isPreview = false;">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import detailModel from "./detailModel";
export default {
  components: { detailModel },
  props: {
    detailConfig: {
      type: String
    },
    columns: {
      type: Object
    }
  },
  data() {
    return {
      rules: {

      },
      setDetailData: {
        detail: [
          {
            name: "基本信息",
            fields: [
              { name: "名称", key: "name", value: "" }
            ]
          }
        ]
      },
      enumConfigFormData: {
        arrEnums: [{ label: "", type: "", component: "", key: "" }],
      },
      currentRow: {},
      isEnumColumn: false,
      isPreview: false,
    }
  },
  watch: {
    detailConfig(n) {
      if (n) {
        this.setDetailData = {
          detail: JSON.parse(n)
        }
      }
    }
  },
  created() {
    // 编辑时渲染
    if (this.detailConfig) {
      this.setDetailData = {
        detail: JSON.parse(this.detailConfig)
      }
    }
  },
  methods: {
    changeSetEnum(item) {
      let that = this;
      if (item.isEnum) {
        let columns = that.columns.filter(f => f.prop == item.key && f.isEnum)
        if (columns && columns.length) {
          let column = columns[0]
          that.$set(item, "enums", column.enums);
        }
        else {
          that.$set(item, "enums", undefined);
        }
      }
      else {
        that.$set(item, "enums", undefined);
      }
    },
    setDetailEnumColumn(row) {
      this.isEnumColumn = true;
      this.currentRow = row;
      if (this.currentRow.enums) {
        // 对象转成数组去弹框中回显
        this.enumConfigFormData.arrEnums = this.objToArr(this.currentRow.enums);
      }
    },
    onCloseEnumDialog() {
      //还原弹框默认值
      this.enumConfigFormData = {
        arrEnums: [{ label: "", type: "", component: "", key: "" }],
      }
    },
    saveEnumConfig() {
      //保存表格枚举列配置
      this.currentRow.enums = this.arrToObj(this.$util.deepCopy(this.enumConfigFormData.arrEnums));
      this.isEnumColumn = false;
    },
    minus(source, index) {
      source.splice(index, 1);
    },
    plus(source) {
      source.push({ key: "", name: "" })
    },
    plusModule(source, index) {
      source.splice(index + 1, 0, {
        name: "",
        fields: [
          { name: "", key: "", value: "" }
        ]
      });
    },
    arrToObj(arr) {
      let target = {};
      if (arr && arr.length) {
        arr.forEach(item => {
          target[item.key] = { label: item.label, type: item.type, component: item.component };
        })
      }
      return target;
    },
    objToArr(obj) {
      let target = [];
      for (let key in obj) {
        let item = obj[key];
        target.push({ label: item.label, type: item.type, component: item.component, key: key })
      }
      return target;
    },
    preview() {
      this.$refs['setForm'].validate((valid) => {
        if (valid) {
          this.isPreview = true;
        }
        else {
          return false;
        }
      })

    },
  }
}
</script>

<style lang="scss">
.module {
  display: flex;
  margin-bottom: 20px;
  &-content {
    border: 1px dashed #409eff;
    padding: 20px 5px;
    flex: 1;
  }
  &-operate {
    width: 120px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
}
.detailConfig {
  background: #fafafa;
  padding: 10px;
  overflow-x: scroll;
  &-testData {
    display: flex;
    flex-wrap: wrap;
    &-item {
      display: flex;
      width: 25%;
      margin-bottom: 10px;
      label {
        margin-right: 10px;
        color: #999;
      }
      .el-input {
        width: 200px;
      }
    }
  }

  .columns {
    &-header {
      color: #999;
      display: flex;
      &-item {
        width: 200px;
        margin-right: 10px;
        &.miniWidth {
          width: 120px !important;
        }
      }
    }
    &-item {
      margin-bottom: 10px;
      display: flex;
      &-node {
        border-right: 2px solid #fff;
        .header {
          color: #999;
          width: 190px !important;
        }
        .el-input,
        .el-switch {
          width: 190px !important;
        }
        .el-button {
          width: 160px !important;
        }
        margin-right: 5px;
        padding-right: 5px;
        &.placeHidden {
          visibility: hidden !important;
        }
        &.placeVisible {
          visibility: visible !important;
        }
        &.miniWidth {
          .el-input,
          .el-button,
          .el-switch {
            width: 130px !important;
          }
          .header {
            width: 130px !important;
          }
        }
      }
      &-operate {
        width: 100px;
        display: inherit;
      }
    }
  }
}
</style>

