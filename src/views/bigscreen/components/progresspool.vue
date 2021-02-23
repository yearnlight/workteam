<template>
  <dv-percent-pond :config="config" style="width:200px;height:100px;" />
</template>

<script>
export default {
  data() {
    return {
      config: {
        value: 66,
        lineDash: [10, 2]
      }
    }
  }
}
</script>