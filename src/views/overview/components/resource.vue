<template>
  <div class="overview-resource">
    <div class="resourceList">
      <div class="span" v-for="(item,index) in items" :key="index">
        <span class="span-label">{{item.name}}</span>
        <span class="span-value">{{item.value}} {{item.unit}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: "虚拟云主机数量", value: 0 },
        { name: "CPU核数", value: 0 },
        { name: "内存大小", value: 0 },
        { name: "云硬盘大小", value: 0 },
        { name: "VPC数量", value: 0 },
        { name: "子网数量", value: 0 },
        { name: "负载均衡数量", value: 0 },
        { name: "浮动IP数量", value: 0 },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-resource {
  .resourceList {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    .span {
      margin-top: 10px;
      margin-right: 10px;
      min-width: 210px;
      width: calc(25% - 10px);
      background-color: #e9edfa;
      line-height: 42px;
      height: 42px;
      cursor: pointer;
      border-radius: 2px;
      color: #252b3a;
      &-label {
        display: inline-block;
        padding-left: 15px;
        height: 38px;
        max-width: calc(100% - 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: normal !important;
        word-wrap: normal !important;
        font-size: 12px;
      }
      &-value {
        float: right;
        right: 15px;
        margin-right: 15px;
        line-height: 38px;
        font-size: 18px;
      }
    }
  }
}
</style>