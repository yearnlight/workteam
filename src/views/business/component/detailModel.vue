<template>
    <div class="demo">
        <div class="base">
            <div class="base-header">详情预览</div>
            <div class="base-content">
                <info-base :infos="testData" :detailColumns="detailColumns" />
            </div>
        </div>

        <div class="base">
            <div class="base-header">详情配置</div>
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
import infoBase from "@/components/infoBase";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/color-brewer.css';
export default {
    components: { infoBase },
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
            detailColumns: [],
            loading: false,
            configCode: "",
            configBusinessCode: "",
            testData: {},
            configTestCode: ""
        }
    },
    created() {


        let detailColumns = this.configs.detail;

        //组装测试数据
        let testData = {}
        //串联起来所有业务模块测试数据
        detailColumns.forEach(dc => {
            if (dc.fields && dc.fields.length) {
                dc.fields.forEach(d => {
                    let temp = {};
                    temp[d.key] = d.value;

                    Object.assign(testData, temp);
                    // 重置配置参数中的业务数据
                    // d.value = ""
                })
            }
        })
        this.testData = testData;
        this.configCode = JSON.stringify(detailColumns, null, 2);

        // 设置详情列配置
        this.detailColumns = detailColumns;

        this.configTestCode = JSON.stringify(testData, null, 2);
    },
    watch: {
        configs: {
            handler(n) {
                if (n) {
                    let detailColumns = n.detail;

                    this.configCode = JSON.stringify(n.detail, null, 2);

                    let testData = {}
                    n.detail[0].fields.forEach(d => {
                        let temp = {};
                        temp[d.key] = d.value;
                        Object.assign(testData, temp);
                    })
                    this.testData = testData;
                    // 设置详情列配置
                    this.detailColumns = detailColumns;
                    this.configTestCode = JSON.stringify(testData, null, 2);
                }
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.demo {
  .configCode {
  }
}
</style>
