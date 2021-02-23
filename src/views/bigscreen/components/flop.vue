<template>
  <dv-digital-flop :config="config" style="width:200px;height:50px;" />
</template>

<script>
function formatter(number) {
  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

  return segs.join(',').split('').reverse().join('')
}

export default {
  data() {
    return {
      config: {
        number: [123456],
        content: '{nt}个',
        formatter
      }
    }
  }
}
</script>