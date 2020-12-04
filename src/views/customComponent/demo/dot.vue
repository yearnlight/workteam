<template>
    <div class="dotDemo">
        <div class="dotDemo-content">
            <dot v-for="(item,index) in source" :level="item.level" :key="index">{{item.label}}</dot>
        </div>
    </div>
</template>

<script>
import dot from "@/components/Dot/index"
export default {
    components: { dot },
    data() {
        return {
            source: [
                { label: "运行失败", level: "danger" },
                { label: "可用", level: "success" },
                { label: "启动中", level: "warning" },
                { label: "健康检查中", level: "test" },
                { label: "挂载状态", level: "primary" },
                { label: "禁用", level: "info" },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.dotDemo {
  &-content {
    padding: 20px;
    .dot {
      padding: 5px;
    }
  }
}
</style>
