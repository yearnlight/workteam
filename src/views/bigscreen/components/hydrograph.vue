<template>
  <dv-water-level-pond :config="config" style="width:150px;height:150px;" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        data: [55],
        shape: 'round'
      }
    }
  }
}
</script>