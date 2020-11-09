<template>
  <!-- 自定义组件 -->
  <div class="custom">
    <div class="custom-menu">
      <div
        @click="switchCom(item)"
        :class="[{'active':customName == item.name},'custom-menu-item']"
        v-for="(item,index) in customComponents"
        :key="index"
      >
        {{item.title}}
      </div>
    </div>

    <div class="custom-component">
      <component
        class="custom-component-item"
        :is="customName"
      ></component>
      <div
        class="custom-component-desc"
        v-if="customItem.desc"
        v-highlight
      >
        <pre><code>{{customItem.desc}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import matter from "./matter";
import level from "./level";
import hljs from 'highlight.js';
// 样式文件
import 'highlight.js/styles/routeros.css';
export default {
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
  components: { matter, level },
  data() {
    return {
      customComponents: [
        {
          title: "Matter 事项", name: "matter", desc: `
                    <matter title="告警信息" value="0" level="danger"></matter><!-- 红色 --> \n
                    <matter title="一般信息" value="0" level="primary"></matter>\n
                    <matter title="成功信息" value="0" level="success"></matter>\n
                    <matter title="信息" value="0" level="info"></matter>\n
                    <matter title="测试信息" value="0" level="test"></matter>
                ` },
        {
          title: "Level 等级", name: "level", desc: `
                    <level text="告警信息" level="danger"></level><!-- 红色 --> \n
                    <level text="一般信息" level="primary"></level>\n
                    <level text="成功信息" level="success"></level>\n
                    <level text="信息" level="info"></level>\n
                    <level text="测试信息" level="test"></level>\n
                    <level text="告警信息" level="danger" effect="plain"></level><!-- 红色 --> \n
                    <level text="一般信息" level="primary" effect="plain"></level>\n
                    <level text="成功信息" level="success" effect="plain"></level>\n
                    <level text="信息" level="info" effect="plain"></level>\n
                    <level text="测试信息" level="test" effect="plain"></level>
                ` },
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
      display: block;
      height: 40px;
      color: #444;
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 400;
      cursor: pointer;
      padding: 0 5px;
      //   border-left: 3px solid #409eff;
      &.active {
        color: #409eff;
      }
      &:hover {
        color: #409eff;
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


