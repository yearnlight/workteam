<template>
    <div class="demo">
        <div class="base">
            <div class="base-header">表格预览</div>
            <div class="base-content">
                <v-table v-loading="loading" :columns="columns" :tableConfig="tableConfig" :data="list" @del="del" @edit="edit" @search="search"></v-table>
            </div>
        </div>

        <div class="base">
            <div class="base-header">表格配置</div>
            <div class="base-content">
                <div class="configCode" v-if="configCode" v-highlight>
                    <pre><code v-text="configCode"></code></pre>
                </div>
            </div>
        </div>

        <div class="base">
            <div class="base-header">业务配置</div>
            <div class="base-content">
                <div class="configCode" v-if="configBusinessCode" v-highlight>
                    <pre><code v-text="configBusinessCode"></code></pre>
                </div>
            </div>
        </div>

        <div class="base">
            <div class="base-header">测试数据</div>
            <div class="base-content">
                <div class="configCode" v-if="configTestCode" v-highlight>
                    <pre><code v-text="configTestCode"></code></pre>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import vTable from "@/components/vTable";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/color-brewer.css';
export default {
    components: { vTable },
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
        configs: {
            type: Object
        },
    },
    data() {
        return {
            loading: false,
            list: {
                records: [],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [],
            tableConfig: {},
            configCode: "",
            configInfoCode: "",
            configBusinessCode: "",
            configTestCode: ""
        }
    },
    created() {

        // 设置表格列配置
        this.columns = this.configs.table.tableColumns;
        // 设置表格配置
        this.tableConfig = this.configs.table.tableConfig;
        this.configCode = JSON.stringify(this.configs.table, null, 2);

        this.configBusinessCode = JSON.stringify(this.configs.business, null, 2);
        this.list = {
            records: this.configs.testData,
            total: this.configs.business.list.total
        }
        this.inputParams = this.configs.business.inputParams;
        this.loading = this.configs.business.loading;


        this.configTestCode = JSON.stringify(this.configs.testData, null, 2);
    },
    watch: {
        configs: {
            handler(n) {
                if (n) {
                    // 设置表格列配置
                    this.columns = n.table.tableColumns;
                    // 设置表格配置
                    this.tableConfig = n.table.tableConfig;
                    this.configTableCode = JSON.stringify(n.table, null, 2);

                    //业务内代码
                    this.configBusinessCode = JSON.stringify(this.$util.deepCopy(n.business), null, 2);
                    this.list = {
                        records: n.testData,
                        total: n.business.list.total
                    }
                    this.inputParams = n.business.inputParams;
                    this.loading = n.business.loading;


                    this.configTestCode = JSON.stringify(n.testData, null, 2);
                }
            }
        }
    },
    methods: {
        del(item, index) {

        },
        edit(item, index) {

        },
        search(params) {
            if (params) this.inputParams = Object.assign(this.inputParams, params);
            this.fetchList();
        },
        fetchList() {

        }
    }
}
</script>

<style lang="scss" scoped>
.demo {
  .configCode {
  }
}
</style>
