<template>
  <div class="overview-notice">
    <ul class="noticeList">
      <li v-for="(item,index) in notices" :key="index">
        <a class="link">
          <span class="link-date">{{item.date}}</span>
          <span class="link-title">{{item.title}}</span>
          <span class="link-content">{{item.content}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [
        { date: "2021-03-10", title: "【升级通知】", content: "烽火云（城轨云）网络于2021年3月10日22:00-06:00（北京时间）升级通知" },
        { date: "2021-03-02", title: "【升级通知】", content: "烽火云（城轨云）网络于2021年3月02日22:00-06:00（北京时间）升级通知" },
        { date: "2021-03-01", title: "【升级通知】", content: "烽火云（城轨云）网络于2021年3月01日22:00-06:00（北京时间）升级通知" }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-notice {
  width: 100%;
  .noticeList {
    width: 100%;
    list-style: none;
    li {
      a.link {
        &:hover {
          color: #526ecc;
          text-decoration: none;
        }
        display: block;
        text-decoration: none;
        color: #252b3a;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: keep-all;
        height: 18px;
        margin-top: 12px;
        line-height: 18px;
        &-date {
          margin-right: 12px;
          float: left;
          color: #575d6c;
        }
      }
    }
  }
}
</style>