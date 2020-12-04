<template>
  <!-- matterr -->
  <div class="levelDemo">
    <div class="levelDemo-items">
      <div class="levelDemo-items-title">Dark:</div>
      <div class="levelDemo-item">
        <level class="el-level" :text="item.title" :level="item.level" :effect="item.effect" :key="index" v-for="(item,index) in darks"></level>
      </div>

      <div class="levelDemo-items-title">Plain:</div>
      <div class="levelDemo-item">
        <level class="el-level" :text="item.title" :level="item.level" :effect="item.effect" :key="index" v-for="(item,index) in plains"></level>
      </div>
    </div>
  </div>
</template>

<script>
import level from "@/components/Level/index"
export default {
  components: { level },
  data() {
    return {
      darks: [
        { title: "Success", level: "success", effect: "dark" },
        { title: "Danger", level: "danger", effect: "dark" },
        { title: "Primary", level: "primary", effect: "dark" },
        { title: "Warning", level: "warning", effect: "dark" },
        { title: "Info", level: "info", effect: "dark" },
        { title: "Test", level: "test", effect: "dark" },
      ],
      plains: [
        { title: "Success", level: "success", effect: "plain" },
        { title: "Danger", level: "danger", effect: "plain" },
        { title: "Primary", level: "primary", effect: "plain" },
        { title: "Warning", level: "warning", effect: "plain" },
        { title: "Info", level: "info", effect: "plain" },
        { title: "Test", level: "test", effect: "plain" },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.levelDemo {
  &-items {
    padding: 10px;
    &-title {
      font-size: 16px;
      font-weight: 600;
      padding: 5px 0;
    }
  }
  &-item {
    margin: 10px 0;
    .el-level {
      margin-right: 10px;
    }
  }
}
</style>


