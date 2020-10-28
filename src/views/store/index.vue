<template>
    <div class="store">
        <div class="store-title"><span>服务应用</span>
            <el-button
                type="primary"
                icon="el-icon-plus"
            >添加服务</el-button>
        </div>
        <div class="store-content">
            <card :stores="stores"></card>
        </div>
    </div>
</template>

<script>
import card from "./card";
export default {
  components: { card },
  data() {
    return {
      stores: [
        {
          href: "https://undraw.co/illustration",
          createtime: "2020-10-28 21:53:29",
          desc: "SVG 素材库",
          name: "unDraw",
          creator: "杨明翔",
          color: "#409EFF"
        },
        {
          href: "https://mrhj.gitee.io/form-generator/#/",
          createtime: "2020-10-28 21:53:29",
          desc: "可视化生成表单代码",
          name: "Generator",
          creator: "杨明翔",
          color: "#67C23A"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.store {
  &-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  &-content {
  }
}
</style>
