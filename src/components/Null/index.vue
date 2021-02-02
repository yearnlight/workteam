<template>
  <div class="null">
    <img :src="nullUrl" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nullUrl: require("@/assets/page_not_found.png")
    }
  }
}
</script>

<style lang="scss">
.null {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>