<template>
  <div class="formGenerator">
    <iframe :src="src"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://mrhj.gitee.io/form-generator/#/",
    };
  },
};
</script>

<style lang="scss">
.formGenerator {
  overflow-y: hidden !important;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>