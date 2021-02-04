<template>
  <div class="userCenter">
    <div class="userCenter-info">
      <div>
        <div class="userCenter-info-header">
          <div class="userCenter-info-header-head">
            <img alt="" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png">
          </div>
          <div class="userCenter-info-header-name">{{userInfo.name}}</div>
          <div class="userCenter-info-header-signature">{{userInfo.key}}</div>
        </div>
      </div>
      <div class="userCenter-info-detail">
        <p><label>团队：</label>{{userInfo.team}}</p>
        <p><label>上次登录时间：</label>{{userInfo.loginTime}}</p>
        <p><label>登录次数：</label>{{userInfo.logintimes}}次</p>
        <p><label>角色：</label><el-tag>{{roleEnums[userInfo.role]}}</el-tag>
        </p>
      </div>
    </div>
    <div class="userCenter-other">
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的事件" name="event"></el-tab-pane>
        <el-tab-pane label="我的文章" name="doc"></el-tab-pane>
        <el-tab-pane label="我的应用" name="store"></el-tab-pane>
        <el-tab-pane label="我的任务" name="task"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleEnums:{
        "super":"超级管理员",
        "member":"普通用户",
        "visitor":"游客",
      },
      name: "江阿生",
      colors: [
        "#409EFF",
        "#F56C6C",
        "#909399",
        "#E6A23C",
        "#9764e0",
        "#e06ab7",
        "#67C23A",
      ],
      userInfo: {},
      activeName: "event"
    }
  },
  computed: {
    bg() {
      return this.colors[Math.floor(Math.random() * 7)];
    }
  },
  created() {
    this.fetchUserInfo()
  },
  methods: {
    fetchUserInfo() {
      let userInfoStr = sessionStorage.getItem("userInfo");
      this.userInfo = JSON.parse(userInfoStr)
    }
  }
}
</script>

<style lang="scss">
.userCenter {
  background-color: inherit !important;
  display: flex;
  &-info {
    padding: 20px;
    background-color: #fff;
    flex: 7;
    &-header {
      margin-bottom: 24px;
      text-align: center;
      &-head {
        img {
          width: 104px;
          height: 104px;
          margin-bottom: 20px;
        }
      }
      &-name {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }
    }
    &-detail {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      list-style: none;
      font-feature-settings: "tnum", "tnum";
      p {
        margin-bottom: 8px;
        padding-left: 26px;
        label{
          text-align: right;
          width: 100px;
          display: inline-block;
        }
      }
    }
  }

  &-other {
    flex: 17;
    background-color: #fff;
    margin-left: 20px;
    padding: 20px;
  }
}
</style>