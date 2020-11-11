<template>
    <div class="guideDemo">
        <div class="guideDemo-content">
            <guide v-for="(item,index) in guides" :desc="item.desc" :key="index" :step="item.step" :level="item.level" :title="item.title"></guide>
        </div>
    </div>
</template>

<script>
import guide from "@/components/Guide/index"
export default {
    components: { guide },
    data() {
        return {
            guides: [
                { step: 1, level: "success", title: "成功信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },
                { step: 2, level: "primary", title: "提示信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },
                { step: 3, level: "warning", title: "警告信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },
                { step: 4, level: "danger", title: "错误信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },
                { step: 5, level: "info", title: "一般信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },
                { step: 6, level: "test", title: "测试信息", desc: "系统盘随云服务器一同购买，数据盘可单独购买并手动挂载至云服务器。您可在当前页面点击“购买磁盘”，也可在云服务器控制台点击“新增磁盘”。" },

            ]
        }
    }
}   
</script>

<style lang="scss" scoped>
.guideDemo {
  &-content {
    display: flex;
    flex-wrap: wrap;
    .guide {
      width: calc(33.33% - 10px);
    }
  }
}
</style>
