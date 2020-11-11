<template>
  <!-- matterr -->
  <div class="matterDemo">
    <div class="matterDemo-title">Dark</div>
    <matter :title="item.title" :level="item.level" :value="`${item.value}`" :key="index" v-for="(item,index) in matters"></matter>
  </div>
</template>

<script>
import matter from "@/components/Matter/index"
export default {
  components: { matter },
  data() {
    return {
      matters: [
        { title: "Success", level: "success", value: 0 },
        { title: "Danger", level: "danger", value: 0 },
        { title: "Primary", level: "primary", value: 0 },
        { title: "Warning", level: "warning", value: 0 },
        { title: "Info", level: "info", value: 0 },
        { title: "Test", level: "test", value: 0 },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.matterDemo {
  &-title {
    font-size: 16px;
    font-weight: 600;
    padding: 10px 5px;
  }
}
</style>


