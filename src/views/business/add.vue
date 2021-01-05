<template>
    <div class="generate">
        <el-form ref="setForm" :model="setData" :rules="rules" size="small" label-width="180px">
            <div class="base">
                <div class="base-header">服务配置</div>

                <div class="base-content">
                    <el-form-item label="服务名称" prop="name">
                        <el-input v-model="setData.name" placeholder="请输入服务名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="服务Code" prop="code">
                        <el-input v-model="setData.code" placeholder="请输入服务Code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="服务描述" prop="desc">
                        <el-input v-model="setData.desc" type="textarea" placeholder="请输入服务描述" :autosize="{minRows: 4, maxRows: 4}"></el-input>
                    </el-form-item>
                    <el-form-item label="服务图标" prop="icon">
                        <el-input v-model="setData.icon" placeholder="请输入服务图标（在云计算图标库中寻找/选择）" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="服务展现类型" prop="type">
                        <el-radio-group v-model="setData.type" size="small">
                            <el-radio v-for="(item, index) in typeOptions" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>

            </div>

            <div class="base">
                <div class="base-header">表格配置</div>

                <div class="base-content">
                    <el-form-item label="是否支持表格配置" prop="tableConfig.setting">
                        <el-switch v-model="setData.tableConfig.setting"></el-switch>
                        <el-popover placement="right" trigger="hover" popper-class="reminder">
                            <span>表格配置：表格右上角操作按钮，包含<span class="high">数据刷新</span>、<span class="high">下载Excel</span>、<span class="high">自定义列</span></span>
                            <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-warning-outline"></el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="表格查询入参结构" prop="tableConfig.isPublic">
                        <el-switch v-model="setData.tableConfig.isPublic"></el-switch>
                        <el-popover placement="right" trigger="hover" popper-class="reminder">
                            <span>表格查询入参结构默认是：<span class="high">组装searchDTOList结构，资源管理接口专用</span></span>
                            <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-warning-outline"></el-button>
                        </el-popover>
                        <div class="example">
                            <div class="example-header">示例：</div>
                            <div class="example-struct" v-if="setData.tableConfig.isPublic">
                                <div class="example-struct-desc">Url: /fitmgr-publiccloud/v1/Huaweicloud/image/image</div>
                                <div>入参结构：{{JSON.stringify(structExample2, null, 2)}}</div>
                            </div>
                            <div class="example-struct" v-else>
                                <div class="example-struct-desc">Url: /resource/cmdb/page</div>
                                <div>入参结构：{{JSON.stringify(structExample1, null, 2)}}</div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否表格分页" prop="tableConfig.pagination">
                        <el-switch v-model="setData.tableConfig.pagination"></el-switch>
                        <el-popover placement="right" trigger="hover" popper-class="reminder">
                            <span>表格分页：表格是否支持后端分页展示数据</span>
                            <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-warning-outline"></el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item v-if="setData.tableConfig.pagination" label="默认一页显示多少条" prop="tableConfig.pageSize">
                        <el-select v-model="setData.tableConfig.pageSize">
                            <el-option v-for="item in pageSizesOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-popover placement="right" trigger="hover" popper-class="reminder">
                            <span>表格初始化出来时：默认基于后端分页限制，一页展示<span class="high">{{setData.tableConfig.pageSize}}条</span>数据</span>
                            <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-warning-outline"></el-button>
                        </el-popover>
                    </el-form-item>

                    <el-form-item label="表格类型" prop="tableConfig.type">
                        <el-radio-group v-model="setData.tableConfig.type">
                            <el-radio :label="null">普通表格</el-radio>
                            <el-radio label="radio">单选表格</el-radio>
                            <el-radio label="selection">多选表格</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="表格列配置" class="tableConfig" prop="tableColumns">
                        <!-- setData.tableColumns -->
                        <div class="columns-header">
                            <div class="columns-header-item">列对应属性</div>
                            <div class="columns-header-item">表头名称</div>
                            <div class="columns-header-item miniWidth">列宽度(px)</div>
                            <div class="columns-header-item miniWidth">是否开启Tooltip</div>
                            <div class="columns-header-item miniWidth">设置为详情入口</div>
                            <div class="columns-header-item" v-if="isConfigInfo">详情入口回调方法名</div>
                            <div class="columns-header-item miniWidth">设置为操作列</div>
                            <div class="columns-header-item miniWidth" v-if="isConfigOperate">操作列配置</div>
                        </div>
                        <div class="columns" v-for="(item,index) in setData.tableColumns" :key="index">
                            <div class="columns-item">
                                <div class="columns-item-node">
                                    <el-input placeholder="列对应属性" v-model="item.prop"></el-input>
                                </div>
                                <div class="columns-item-node">
                                    <el-input placeholder="表头名称" v-model="item.label"></el-input>
                                </div>
                                <div class="columns-item-node miniWidth">
                                    <el-input placeholder="列宽度(px)" v-model="item.width"></el-input>
                                </div>
                                <div class="columns-item-node miniWidth">
                                    <el-switch v-model="item['show-overflow-tooltip']"></el-switch>
                                </div>
                                <div class="columns-item-node miniWidth">
                                    <el-switch v-model="item.isInfo"></el-switch>
                                </div>
                                <div :class="[{'placeHidden':!item.isInfo,'placeVisible':item.isInfo},'columns-item-node']" v-if="isConfigInfo">
                                    <el-input placeholder="方法名" v-model="item.funName"></el-input>
                                </div>
                                <div class="columns-item-node miniWidth">
                                    <el-switch v-model="item.isOperate"></el-switch>
                                </div>
                                <div :class="[{'placeHidden':!item.isOperate,'placeVisible':item.isOperate},'columns-item-node miniWidth']" v-if="isConfigOperate">
                                    <el-button size="mini" icon="el-icon-setting" @click="setOperateColumn(item,index)">{{item.operateFun && item.operateFun.length?"查看操作列":"设置操作列"}}</el-button>
                                </div>

                                <div class="columns-item-operate">
                                    <el-button size="mini" icon="el-icon-minus" v-if="setData.tableColumns.length != 1" @click="minus(setData.tableColumns,index)"></el-button>
                                    <el-button size="mini" icon="el-icon-plus" @click="plus(setData.tableColumns)" v-if="setData.tableColumns.length == (index + 1)"></el-button>
                                </div>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="录入测试数据" class="tableConfig" prop="testData">
                        <div class="tableConfig-testData">
                            <div v-for="(item,index) in setData.tableColumns" :key="index" class="tableConfig-testData-item">
                                <label>{{item.prop}}：</label>
                                <el-input v-model="item.value" :placeholder="`${item.prop}测试数据`"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                </div>
            </div>

            <div class="base-operate">
                <el-button type="warning" @click="preview">预览</el-button>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </div>

        </el-form>

        <!-- 表格预览 -->
        <el-dialog v-bind="$attrs" custom-class="tablePreview" :close-on-click-modal="false" v-on="$listeners" width="70%" :visible.sync="isPreview" title="预览表格">
            <div class="tablePreview-content">
                <m-table :configs="backupConfigs" />
            </div>

            <div slot="footer">
                <el-button @click="isPreview = false;">关闭</el-button>
            </div>
        </el-dialog>

        <!-- 设置操作列 -->
        <el-dialog v-bind="$attrs" :close-on-click-modal="false" v-on="$listeners" :visible.sync="isOperateColumnConfig" @close="onCloseOperateDialog" title="设置操作列">
            <el-form ref="pageForm" :model="operateConfigFormData" size="small" label-width="180px">
                <el-form-item label="操作列配置" prop="operates" class="tableConfig">
                    <div class="columns-header">
                        <div class="columns-header-item">操作名称</div>
                        <div class="columns-header-item">回调方法名</div>
                        <div class="columns-header-item miniWidth">图标</div>
                    </div>
                    <div class="columns" v-for="(item,index) in operateConfigFormData.operates" :key="index">
                        <div class="columns-item">
                            <div class="columns-item-node">
                                <el-input placeholder="操作名称" v-model="item.label"></el-input>
                            </div>
                            <div class="columns-item-node">
                                <el-input placeholder="回调方法名" v-model="item.function"></el-input>
                            </div>
                            <div class="columns-item-node miniWidth">
                                <el-input placeholder="图标" v-model="item.icon"></el-input>
                            </div>

                            <div class="columns-item-operate">
                                <el-button size="mini" icon="el-icon-minus" v-if="operateConfigFormData.operates.length != 1" @click="minus(operateConfigFormData.operates,index)"></el-button>
                                <el-button size="mini" icon="el-icon-plus" @click="plus(operateConfigFormData.operates)" v-if="operateConfigFormData.operates.length == (index + 1)"></el-button>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="isOperateColumnConfig = false;">取消</el-button>
                <el-button type="primary" @click="saveOperateConfig">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mTable from "./tableModel";
export default {
    components: { mTable },
    props: [],
    data() {
        return {
            setData: {
                name: undefined,
                code: undefined,
                desc: undefined,
                icon: undefined,
                type: "list",
                tableConfig: {
                    setting: false,
                    pagination: true,
                    isPublic: false,//兼容其他类型接口，是否组装searchDTOList结构
                    pageSize: 10,
                    type: null
                },
                tableColumns: [
                    { prop: "cidr", label: "CIDR" },
                    { prop: "status", label: "状态", width: "100" },
                    { prop: "start_ip", label: "第一个可用地址" },
                    { prop: "end_ip", label: "最后一个可用地址" }
                ]
            },
            operateConfigFormData: {
                operates: [{ function: "", label: "", icon: "" }]
            },
            currentRow: null,//当前操作的表格配置列
            rules: {
                name: [{
                    required: true,
                    message: '请输入服务名称',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入服务Code',
                    trigger: 'blur'
                }],
                desc: [{
                    required: true,
                    message: '请输入服务描述',
                    trigger: 'blur'
                }],
                icon: [{
                    required: true,
                    message: '请输入服务图标（在云计算图标库中寻找/选择）',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '服务展现类型不能为空',
                    trigger: 'change'
                }],
            },
            typeOptions: [{
                "label": "表格",
                "value": "list"
            }, {
                "label": "详情",
                "value": "info"
            }, {
                "label": "关于",
                "value": "about"
            }],
            pageSizesOptions: [
                {
                    "label": "5条",
                    "value": 5
                }, {
                    "label": "10条",
                    "value": 10
                }, {
                    "label": "20条",
                    "value": 20
                }, {
                    "label": "30条",
                    "value": 30
                }
                , {
                    "label": "50条",
                    "value": 50
                }
            ],
            structExample1: {
                componentCode: "image",
                current: 1,
                size: 10,
                searchDTOList: [
                    {
                        key: "status",
                        connector: 0,
                        value: "active"
                    }
                ]
            },
            structExample2: {
                current: 1,
                size: 10,
                status: "active"
            },
            isOperateColumnConfig: false,
            backupConfigs: {},
            isPreview: false
        }
    },
    computed: {
        isConfigInfo() {
            return this.setData.tableColumns.some(s => s.isInfo)
        },
        isConfigOperate() {
            return this.setData.tableColumns.some(s => s.isOperate)
        }
    },
    watch: {},
    created() { },
    mounted() { },
    methods: {
        submitForm() {
            this.$refs['setForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        },
        resetForm() {
            this.$refs['setForm'].resetFields()
        },
        minus(source, index) {
            source.splice(index, 1);
        },
        plus(source) {
            source.push({ prop: "", label: "" })
        },
        setOperateColumn(row, index) {
            //打开设置表格操作列配置弹框
            this.isOperateColumnConfig = true;
            this.currentRow = row;

            //设置过配置时，回显配置
            if (this.currentRow.operateFun && this.currentRow.operateFun.length) {
                this.operateConfigFormData.operates = this.currentRow.operateFun;
            }
        },
        saveOperateConfig() {
            //保存表格操作列配置
            this.currentRow.operateFun = this.$util.deepCopy(this.operateConfigFormData.operates);
            this.isOperateColumnConfig = false;
        },
        onCloseOperateDialog() {
            //关闭操作列配置弹框回调

            //还原弹框默认值
            this.operateConfigFormData = {
                operates: [{ function: "", label: "", icon: "" }]
            }
        },
        preview() {
            this.backupConfigs = this.dealData();
            this.isPreview = !this.isPreview;
        },
        dealData() {
            let backupConfigs = {
                table: {},
                business: {
                    list: {
                        records: [],
                        total: 0
                    }
                },
                testData: []
            };
            let backupColumns = this.$util.deepCopy(this.setData.tableColumns);
            let isExist = backupColumns.some(s => s.type == "radio" || s.type == "selection");
            if (isExist) {
                backupColumns = backupColumns.shift();
            }
            // 单选表格
            if (this.setData.tableConfig.type == "radio") {
                backupColumns.unshift({ type: "radio" })
            }
            else if (this.setData.tableConfig.type == "selection") {
                backupColumns.unshift({ type: "selection" })
            }

            let oneTest = {};
            backupColumns.forEach(item => {
                //把当前项设置为详情列
                if (item.isInfo && item.funName) {
                    item.operateFun = {
                        function: item.funName
                    }
                }
                if (item.value) {
                    oneTest[item.prop] = item.value;
                    delete item.value;
                }
            })

            if (JSON.stringify(oneTest) != "{}") {
                backupConfigs.testData.push(oneTest);
            }

            backupConfigs.table.tableConfig = this.setData.tableConfig;
            // 初始化数据
            backupConfigs.business.loading = false;
            backupConfigs.business.inputParams = {
                page: 1,
                limit: 10
            }

            backupConfigs.table.tableColumns = backupColumns;
            return backupConfigs;
        }
    }
}
</script>

<style lang="scss">
.tablePreview {
  &-content {
    max-height: 500px;
    overflow-y: scroll;
  }
}

.generate {
  .tableConfig {
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
          width: 80px;
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
          .el-input,
          .el-switch {
            width: 200px !important;
          }
          margin-right: 10px;
          &.placeHidden {
            visibility: hidden !important;
          }
          &.placeVisible {
            visibility: visible !important;
          }
          &.miniWidth {
            .el-input,
            .el-switch {
              width: 120px !important;
            }
          }
        }
        &-operate {
          width: 100px;
        }
      }
    }
  }

  .example {
    &-header {
      color: #999;
      font-size: 12px;
    }
    &-struct {
      &-desc {
        padding: 5px;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        word-break: break-word;
        margin: 10px 0;
        background-color: #fff;
      }
      line-height: 1.8;
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
      font-size: 12px;
      padding: 18px 24px;
      background-color: #fafafa;
      border: 1px solid #eaeefb;
      margin-bottom: 25px;
      border-radius: 4px;
      -webkit-font-smoothing: auto;
    }
  }
}
</style>


