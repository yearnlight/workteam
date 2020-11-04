<template>
  <div class="event">
    <div class="notFound">
      <img
        class="notFound-img"
        :src="notFoundSrc"
      />
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      notFoundSrc: require("@/assets/not_found.svg")
    }
  }
}
</script>

<style lang="scss">
.notFound {
  display: flex;
  justify-content: center;
  height: calc(100% - 20px);
  align-items: center;
  &-img {
    width: 300px;
    height: 200px;
  }
}
</style>