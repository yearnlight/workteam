<template>
  <div class="panel" v-loading="loading">
    <div class="panel-backlog">
      <div class="header">待办项</div>
      <div class="panel-backlog-items">
        <div class="item" v-for="(item, index) in backlogList" :key="index">
          <div class="content">
            <div class="name" @click="info(item)">
              {{ item.name | strCutOut(7) }}
            </div>
            <div class="tags">
              <span
                class="status"
                :style="`background-color: ${
                  $util.displayEnum($enum.statusList, item.status).color
                };`"
                >{{
                  $util.displayEnum($enum.statusList, item.status).label
                }}</span
              >
              <span class="action" v-if="item.tag">
                <span class="label">{{ item.tag }}</span>
              </span>
            </div>
          </div>
          <div class="floor">
            <el-button @click="allocate(item)" type="text">分配</el-button>
            <div class="duration">预期：{{ item.estimatedTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-member">
      <div class="header">
        成员任务
        <span class="header-info">
          <span class="el-icon-alarm-clock red"></span>超时时间
          <span class="el-icon-alarm-clock warn"></span>剩余时间
        </span>
      </div>
      <div class="panel-member-items">
        <div class="item" v-for="(item, index) in memberList" :key="index">
          <span>{{ item.owner }}:</span>
          <div
            class="item-progress"
            v-for="(pitem, pindex) in item.tasks"
            :key="pindex"
          >
            <el-col :span="12">
              <el-progress
                :style="`width:${
                  parseInt(pitem.estimatedTime) * 15
                }px;min-width:80px;max-width:200px;`"
                :text-inside="true"
                :stroke-width="18"
                :percentage="pitem.finished"
              ></el-progress>
            </el-col>
            <el-col :span="12">
              <div class="item-operate">
                <div class="item-sum">
                  <el-button type="text" @click="info(pitem)">{{
                    pitem.name | strCutOut(6)
                  }}</el-button>
                  (预期:{{ pitem.estimatedTime }})
                  <el-badge
                    :type="pitem.overtime > 0 ? 'error' : 'warning'"
                    v-if="pitem.overtime"
                    :value="`${$util.formatTime(pitem.overtime)}`"
                    class="item"
                  >
                    <span
                      :class="[
                        { red: pitem.overtime > 0, warn: pitem.overtime < 0 },
                        'el-icon-alarm-clock',
                      ]"
                    ></span>
                  </el-badge>
                </div>
                <span
                  class="el-icon-delete red"
                  @click="remove(pitem, item.owner)"
                ></span>
              </div>
            </el-col>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-run">
      <div class="header">统计</div>
      <div class="panel-run-content">
        <v-chart :options="polar" />
      </div>
    </div>
    <el-dialog title="分配任务" :visible.sync="isAllocate">
      <el-form
        :model="allocateForm"
        ref="allocateForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label>
          <div class="reminder">
            任务分配时，如果多人承担，请及时修改
            <span class="high">预估时间</span>，暂不支持自动调整。
          </div>
        </el-form-item>
        <el-form-item label="所有者" prop="owner">
          <el-select
            filterable
            multiple
            v-model="allocateForm.owner"
            placeholder="请选择所有者"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in userList"
              :key="index"
              :label="item.name"
              :value="item.name"
              :disabled="item.disabled"
            >
              <span
                :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`"
                >{{ item.name }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAllocate = false">取 消</el-button>
        <el-button type="primary" @click="saveAllocate('allocateForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VChart from "vue-echarts/components/ECharts.vue";
import vTable from "@/components/vTable";
import ECharts from "echarts";
export default {
  components: { vTable, VChart },
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
      polar: {
        title: {
          text: "任务状态统计",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          show: true,
          bottom: 0,
          data: [],
          padding: [20, 5],
          selected: {
            完结: false,
          },
        },
        color: [
          "#409EFF",
          "#F56C6C",
          "#909399",
          "#E6A23C",
          "#9764e0",
          "#e06ab7",
          "#333333",
          "#67C23A",
        ],
        series: [
          {
            name: "任务状态",
            type: "pie",
            radius: ["25%", "45%"],
            center: ["50%", "40%"],
            label: {
              formatter: "{b} {c}",
            },
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.loading = true;
    this.loadBacklog();
    this.loadRun();
    this.loadStatistics();
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
    loadStatistics() {
      this.$axios.post("/task/statistics").then((res) => {
        if (res.status == 200) {
          this.polar.legend.data = res.data.legend;
          this.polar.series[0].data = res.data.series;
        }
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
      this.memberList = runList;
      this.loading = false;
    },
    getbacklogList() {
      this.$axios
        .post("/task/list", { status: ["waitAssign", "shelve"] })
        .then((res) => {
          if (res.status == 200) {
            this.backlogList = res.data.records;
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
        // 当前时间 > 开始时间
        let status = "";
        if (new Date() - new Date(this.selectTaskItem.startTime) >= 0) {
          // 任务状态设置成需求分析中
          status = "demanding";
        } else {
          // 任务状态设置成待办
          status = "backlog";
        }
        this.$axios
          .post("/task/update", {
            id: this.selectTaskItem.id,
            owner: this.allocateForm.owner.join(","),
            status: status,
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
          status: ["backlog", "demanding", "designing", "coding", "testing"],
        })
        .then((res) => {
          if (res.status == 200) {
            this.taskList = res.data.records;
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
    display: flex;
    align-items: center;
    &-info {
      margin-left: auto;
      font-size: 12px;
      color: #999;
      .el-icon-alarm-clock {
        padding: 0 3px;
      }
    }
  }

  &-backlog {
    flex: 2;
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
        width: calc(50% - 42px);
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
          .tags{
            display: flex;
            justify-content: space-between;
            align-items: center;
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
    &-content {
      padding: 20px;
      .echarts {
        width: calc(100%);
        height: 320px;
      }
    }
  }

  &-member {
    flex: 3;
    border: 1px solid #ebebeb;
    &-items {
      overflow-y: auto;
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
          &-right {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;
          }
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