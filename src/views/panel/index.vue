<template>
  <div class="panel">
    <div class="panel-backlog">
      <div class="header">待办项</div>
      <div class="panel-backlog-items">
        <div class="item" v-for="(item,index) in backlogList" :key="index">
          <div class="content">
            <div class="name">{{item.name}}</div>
            <span class="status" :style="`background-color: ${$util.displayEnum($enum.statusList,item.status).color};`">{{$util.displayEnum($enum.statusList,item.status).label}}</span>
          </div>
          <div class="duration">预期：{{item.estimatedTime}}</div>
        </div>
      </div>
    </div>
    <div class="panel-member">
      <div class="header">成员任务</div>
      <div class="panel-member-items">
        <div class="item" v-for="(item,index) in memberList" :key="index">
          <span>{{item.owner}}:</span>
          <div class="item-progress" v-for="(pitem,pindex) in item.tasks" :key="pindex">
            <el-col :span="16">
              <el-progress :style="`width:${parseInt(pitem.duration)*20}px`" :text-inside="true" :stroke-width="18" :percentage="pitem.finished"></el-progress>
            </el-col>
            <el-col :span="8">
              <span class="item-sum">
                <el-button type="text">{{pitem.name}}</el-button>
                (预期:{{pitem.estimatedTime}})
              </span>
            </el-col>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-run">
      <div class="header">统计</div>
    </div>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    return {
      backlogList: [],
      memberList: [],
    };
  },
  created() {
    this.getbacklogList();
    this.getUserList().then(() => {
      this.getTaskList().then(() => {
        this.doMemberList();
      });
    });
  },
  methods: {
    doMemberList() {
      let runList = [];
      this.userList.forEach((u) => {
        let temp = {
          owner: u.name,
          tasks: this.taskList.filter((t) => t.owner.includes(u.name)),
        };
        runList.push(temp);
      });
      console.info(runList);
      this.memberList = runList;
    },
    getbacklogList() {
      this.$axios
        .post("/task/list", { status: ["waitAssign", "shelve"] })
        .then((res) => {
          if (res.status == 200) {
            this.backlogList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    getUserList() {
      return this.$axios.get("/task/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getTaskList() {
      return this.$axios.post("/task/list", {}).then((res) => {
        if (res.status == 200) {
          this.taskList = res.data.filter(
            (n) => n.status != "shelve" && n.status !== "waitAssign"
          );
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.panel {
  display: flex;
  .header {
    border-bottom: 1px solid #ebebeb;
    padding: 10px;
  }
  &-backlog {
    flex: 1;
    border-left: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    &-items {
      display: flex;
      flex-wrap: wrap;
      .item {
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        padding: 10px;
        border: 1px solid #ebebeb;
        margin: 10px;
        width: calc(33.33% - 42px);
        height: 100px;
        display: flex;
        flex-direction: column;
        .content {
          flex: 3;
          .name {
            padding-bottom: 10px;
          }
        }
        .duration {
          flex: 1;
          text-align: right;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  &-run {
    flex: 1;
    border-right: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  &-member {
    flex: 1;
    border: 1px solid #ebebeb;
    &-items {
      padding: 10px;
      .item {
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        border: 1px solid #ebebeb;
        padding: 10px;
        clear: both;
        margin-bottom: 10px;
        &-sum {
          font-size: 12px;
          color: #999;
        }
        &-progress {
          clear: both;
          overflow: hidden;
          display: flex;
          align-items: center;
          .el-progress {
            margin: 10px 10px 10px 0;
            .el-progress-bar {
              &__outer {
                border-radius: 0;
              }
              &__inner {
                border-radius: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>