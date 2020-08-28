<template>
  <div class="panel" v-loading="loading">
    <div class="panel-backlog">
      <div class="header">待办项</div>
      <div class="panel-backlog-items">
        <div class="item" v-for="(item,index) in backlogList" :key="index">
          <div class="content">
            <div class="name" @click="info(item)">{{item.name|strCutOut(8)}}</div>
            <span class="status" :style="`background-color: ${$util.displayEnum($enum.statusList,item.status).color};`">{{$util.displayEnum($enum.statusList,item.status).label}}</span>
          </div>
          <div class="floor">
            <el-button @click="allocate(item)" type="text">分配</el-button>
            <div class="duration">预期：{{item.estimatedTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-member">
      <div class="header">成员任务</div>
      <div class="panel-member-items">
        <div class="item" v-for="(item,index) in memberList" :key="index">
          <span>{{item.owner}}:</span>
          <div class="item-progress" v-for="(pitem,pindex) in item.tasks" :key="pindex">
            <el-col :span="12">
              <el-progress :style="`width:${parseInt(pitem.estimatedTime)*20}px;min-width:80px;max-width:240px;`" :text-inside="true" :stroke-width="18" :percentage="pitem.finished"></el-progress>
            </el-col>
            <el-col :span="12">
              <div class="item-operate">
                <span class="item-sum">
                  <el-button type="text" @click="info(pitem)">{{pitem.name|strCutOut(6)}}</el-button>
                  (预期:{{pitem.estimatedTime}})
                  <el-badge v-if="pitem.overtime" :value="`超时：${$util.formatTime(pitem.overtime)}`" class="item">
                    <span class="el-icon-alarm-clock"></span>
                  </el-badge>
                </span>
                <span class="el-icon-delete red" @click="remove(pitem,item.owner)"></span>
              </div>
            </el-col>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-run">
      <div class="header">统计</div>
    </div>

    <el-dialog title="分配任务" :visible.sync="isAllocate">
      <el-form :model="allocateForm" ref="allocateForm" :rules="rules" label-width="120px">
        <el-form-item label="所有者" prop="owner">
          <el-select filterable multiple v-model="allocateForm.owner" placeholder="请选择所有者" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
              <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAllocate = false">取 消</el-button>
        <el-button type="primary" @click="saveAllocate('allocateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    return {
      loading: false,
      backlogList: [],
      memberList: [],
      isAllocate: false,
      selectTaskItem: null,
      allocateForm: { owner: [] },
      rules: {
        owner: [
          {
            required: true,
            message: "请选择所有者",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.loading = true;
    this.loadBacklog();
    this.loadRun();
  },
  methods: {
    info(item) {
      this.$router.push({
        path: "/work/tasklistInfo",
        query: {
          id: item.id,
        },
      });
    },
    loadBacklog() {
      this.getbacklogList();
    },
    loadRun() {
      this.getUserList().then(() => {
        this.getTaskList().then(() => {
          this.doMemberList();
        });
      });
    },
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
      this.loading = false;
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
    allocate(item) {
      this.isAllocate = true;
      this.selectTaskItem = this.$util.deepCopy(item);
      this.allocateForm = { owner: [] };
    },
    remove(item, curOwer) {
      this.$confirm(`你确定移除任务【${item.name}】`, "移除任务").then(() => {
        let owners = item.owner.split(",");
        let curIndex = owners.indexOf(curOwer);
        let status = item.status;
        owners.splice(curIndex, 1);
        if (!(owners && owners.length)) {
          status = "waitAssign";
        }
        this.$axios
          .post("/task/update", {
            id: item.id,
            owner: owners.join(","),
            status: status,
          })
          .then((res) => {
            if (res.status == 200) {
              this.loadBacklog();
              this.loadRun();
            } else {
              this.$message.error(res.msg);
            }
          });
      });
    },
    saveAllocate(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$axios
          .post("/task/update", {
            id: this.selectTaskItem.id,
            owner: this.allocateForm.owner.join(","),
            status: "demanding",
          })
          .then((res) => {
            if (res.status == 200) {
              this.loadBacklog();
              this.loadRun();
              this.isAllocate = false;
            } else {
              this.$message.error(res.msg);
            }
          });
      });
    },
    getTaskList() {
      return this.$axios
        .post("/task/list", {
          status: ["demanding", "designing", "coding", "testing"],
        })
        .then((res) => {
          if (res.status == 200) {
            this.taskList = res.data;
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
    flex: 3;
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
            cursor: pointer;
            font-weight: 600;
          }
        }
        .floor {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .duration {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }

  &-run {
    flex: 2;
    border-right: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  &-member {
    flex: 3;
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
        &-operate {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .red {
            font-size: 14px;
          }
          .el-badge {
            border: none;
            padding: 3px;
            margin-bottom: 0;
            &__content {
              right: 8px;
            }
          }
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