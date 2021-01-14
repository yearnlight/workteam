<template>
    <div class="demo">
        <div class="demo-operate">
            <el-button type="warning" icon="el-icon-setting" @click="generate">生成代码</el-button>
        </div>

        <el-tabs v-model="activeName" v-if="name">
            <el-tab-pane label="表格" name="list">
                <v-table :name="name" v-loading="loading" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
                <div class="configCode" v-if="configCode" v-highlight>
                    <pre><code v-text="configCode"></code></pre>
                </div>
            </el-tab-pane>
            <el-tab-pane label="详情" name="info">
                <no-data fill="#E6A23C" v-if="!configInfoCode" text="当前服务没有详情配置" />
                <div v-else>
                    <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
                    <div class="configInfoCode" v-if="configInfoCode" v-highlight>
                        <pre><code v-text="configInfoCode"></code></pre>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于" name="about">
                <no-data fill="#E6A23C" v-if="!configExplainCode" text="当前服务没有关于配置" />
                <div v-else>
                    <explain :name="name" :configs="explainConfigs"></explain>
                    <div class="configInfoCode" v-if="configExplainCode" v-highlight>
                        <pre><code v-text="configExplainCode"></code></pre>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="所有配置" name="config">
                <div>
                    <div class="configInfoCode" v-if="configAllCode" v-highlight>
                        <pre><code v-text="configAllCode"></code></pre>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <div v-else class="nodata">
            <img :src="nodataSvg" />
            <span class="nodata-text">请选择服务查看配置</span>
        </div>

    </div>

</template>

<script>
import vTable from "@/components/vTable";
import InfoBase from "@/components/infoBase";
import explain from "@/components/explain";
import t_fields from "@/resource/t_fields";
import fields from "@/resource/fields";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/color-brewer.css';
import { stringify } from 'querystring';
export default {
    components: { vTable, InfoBase, explain },
    directives: {
        highlight: {
            // 被绑定元素插入父节点时调用
            inserted: function (el) {
                let blocks = el.querySelectorAll('pre code');
                for (let i = 0; i < blocks.length; i++) {
                    hljs.highlightBlock(blocks[i]);
                }
            },
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
            componentUpdated: function (el) {
                let blocks = el.querySelectorAll('pre code');
                for (let i = 0; i < blocks.length; i++) {
                    hljs.highlightBlock(blocks[i]);
                }
            }
        }
    },
    props: {
        name: {
            type: String
        },
        config: {
            type: Object
        },
        infos: {
            type: Object
        }
    },
    data() {
        return {
            nodataSvg: require("@/assets/empty-card.svg"),
            loading: false,
            activeName: "list",
            list: {
                records: [],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [],
            detailColumns: [],
            configCode: "",
            configInfoCode: "",
            configExplainCode: "",
            explainConfigs: null
        }
    },
    created() {
        // 新创服务
        if (this.config.code) {
            this.setDyncConfigCode();
        }
        else {
            this.setConfigCode(this.name);
        }

    },
    watch: {
        name(n, o) {
            if (n && n != o) {
                if (this.config.code) {
                    this.setDyncConfigCode();
                }
                else {
                    this.setConfigCode(n);
                }
            }
            else {
                if (this.config.code) {
                    this.setDyncConfigCode();
                }
                else {
                    this.setConfigCode(n);
                }
            }
        }
    },
    methods: {
        setConfigCode(n) {
            let clone_t_fields_module = this.$util.deepCopy(t_fields[n])
            let clone_fields_module = this.$util.deepCopy(fields[n])
            this.columns = clone_t_fields_module.tableColumns;
            // 表格配置代码
            this.configCode = JSON.stringify(clone_t_fields_module, null, 2);
            // 表格测试数据
            this.list.records = [];
            // 详情测试数据
            this.infos = {};

            // 详情配置代码
            if (clone_fields_module && clone_fields_module.detail) {
                this.detailColumns = clone_fields_module.detail;
                this.configInfoCode = JSON.stringify({ detail: this.detailColumns }, null, 2);
            }
            else {
                this.configInfoCode = "";
            }
            // 关于
            this.explainConfigs = {
                title: clone_fields_module.name,
                desc: clone_fields_module.explain,
                icon: clone_fields_module.icon
            }
            // 关于配置代码
            this.configExplainCode = JSON.stringify(this.explainConfigs, null, 2);
            // 所有配置代码
            let allConfig = {};
            allConfig[n] = this.$util.deepMerge(clone_t_fields_module, clone_fields_module);
            this.configAllCode = JSON.stringify(allConfig, null, 2)
        },
        setDyncConfigCode() {
            // 表格配置
            let tableConfigs = JSON.parse(this.config.tableConfig);
            this.columns = tableConfigs.tableColumns;
            // 表格配置代码
            this.configCode = JSON.stringify(tableConfigs, null, 2);
            // 表格测试数据
            this.list.records = JSON.parse(this.config.tableTestData)

            //详情配置
            let detailConfig = { detail: JSON.parse(this.config.detailConfig) };
            this.detailColumns = JSON.parse(this.config.detailConfig);
            // 详情测试数据
            this.infos = JSON.parse(this.config.detailTestData);
            // 详情配置代码
            this.configInfoCode = JSON.stringify(detailConfig, null, 2);

            // 关于配置
            this.explainConfigs = {
                title: this.config.name,
                desc: this.config.desc,
                icon: this.config.icon
            }
            // 关于配置代码
            this.configExplainCode = JSON.stringify(this.explainConfigs, null, 2);

            // 所有配置代码
            let allConfig = {};
            allConfig[this.config.code] = this.$util.deepMerge(tableConfigs, detailConfig);
            this.configAllCode = JSON.stringify(allConfig, null, 2)
        },
        search() { },
        del() { },
        edit() { },
        download(url) {
            let that = this;
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", `${that.config.code}.tar.gz`);
            document.body.appendChild(link);
            link.click();
        },
        generate() {
            let that = this;
            this.$axios.post("/server-config/generate", { uuid: that.config.uuid }).then(res => {
                if (res.status == 200) {
                    let tarPath = res.data;
                    this.download(tarPath);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.demo {
  &-operate {
    display: flex;
    .el-button {
      margin-left: auto;
    }
  }
  .configCode {
  }

  .nodata {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-text {
      color: #999;
      padding: 10px;
      font-size: 13px;
    }
  }
}
</style>
