<template>
    <!-- 自定义组件 -->
    <div class="custom">
        <div class="custom-menu">
            <div @click="switchCom(item)" :class="[{'active':customName == item.name},'custom-menu-item']" v-for="(item,index) in customComponents" :key="index">
                {{item.title}}
            </div>
        </div>

        <div class="custom-component">
            <component class="custom-component-item" :is="customName"></component>
            <div class="custom-component-desc" v-if="customItem.desc">
                <pre v-highlightjs>
                    <code class="html" spellcheck="false">{{customItem.desc}}</code>
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
import matter from "./matter";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/atom-one-light.css';
export default {
    directives: {
        highlightjs: {
            inserted(el) {
                // 遍历元素并且使用 highlight 进行处理 
                const preEl = document.querySelectorAll('pre code');
                preEl.forEach(el => {
                    hljs.highlightBlock(el);
                });
            }
        }
    },
    components: { matter },
    data() {
        return {
            customComponents: [
                {                    title: "事项", name: "matter", desc: `
                    <matter title="告警信息" value="0" level="danger"></matter><!-- 红色 --> \n
                    <matter title="一般信息" value="0" level="primary"></matter>\n
                    <matter title="成功信息" value="0" level="success"></matter>\n
                    <matter title="信息" value="0" level="info"></matter>\n
                    <matter title="测试信息" value="0" level="test"></matter>
                ` },
                { title: "卡片", name: "card", desc: "" },
            ],
            customName: "matter",
            customItem: null
        }
    },
    created() {
        this.customItem = this.customComponents[0];
    },
    methods: {
        switchCom(item) {
            this.customName = item.name;
            this.customItem = item;
        }
    }
}
</script>

<style lang="scss" scoped>
.custom {
  display: flex;
  &-menu {
    width: 150px;
    border-right: 1px solid #eaeefb;
    position: relative;
    &-item {
      padding: 10px;
      //   border-left: 3px solid #409eff;
      &.active {
        background-color: #ecf5ff;
      }
      &:hover {
        background-color: #ecf5ff;
      }
    }
  }
  &-component {
    flex: 1;
    margin: 10px;
    &-item {
      border-bottom: 1px solid #eaeefb;
    }
    &-desc {
    }
  }
}
</style>


