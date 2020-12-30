<template>
    <div class="demo">
        <el-tabs v-model="activeName">
            <el-tab-pane label="表格" name="list">
                <v-table v-loading="loading" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
                <div class="configCode" v-if="configCode" v-highlight>
                    <pre><code v-text="configCode"></code></pre>
                </div>
            </el-tab-pane>
            <el-tab-pane label="详情" name="info">
                <no-data fill="#E6A23C" text="开发中" />
            </el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import vTable from "@/components/vTable";
import t_fields from "@/resource/t_fields";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/routeros.css';
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
        name: {
            type: String
        }
    },
    data() {
        return {
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
            configCode: ""
        }
    },
    created() {
        this.columns = t_fields[this.name].tableColumns;
        this.configCode = JSON.stringify(t_fields[this.name], null, 2);
    },
    watch: {
        name(n, o) {
            if (n && n != o) {
                this.columns = t_fields[n].tableColumns;
                this.configCode = JSON.stringify(t_fields[this.name], null, 2);
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
