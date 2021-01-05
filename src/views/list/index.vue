<template>
  <div class="list">
    <el-scrollbar style="height:calc(100% - 20px)">
      <v-table v-loading="loading" name="list" :data="list" @del="del" @edit="edit" @search="search">
        <div class="search" v-if="token">
          <el-button type="primary" icon="el-icon-plus" @click="add">创建任务</el-button>
          <div class="search-param">
            <div class="search-param-item">
              <el-select filterable multiple v-model="inputParams.status" placeholder="请选择状态" clearable>
                <el-option v-for="(item, index) in $enum.statusList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
                  <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${
                    $util.displayEnum($enum.statusList, item.value).color
                  };`">{{ item.label }}</span>
                </el-option>
              </el-select>
            </div>
            <div class="search-param-item">
              <el-select filterable multiple v-model="inputParams.owner" placeholder="请选择所有者" clearable>
                <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
                  <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
            <div class="search-param-item">
              <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="inputParams.daterange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <template #nameTag="slotProps">
          <el-tooltip :content="`【${ slotProps.rowData.tag }】${slotProps.rowData.name}`" placement="top" effect="light">
            <el-button v-if="token" type="text" @click="info(slotProps.rowData)">
              <span v-if="slotProps.rowData.tag" class="tag">【{{ slotProps.rowData.tag }}】</span>{{ slotProps.rowData.name }}
            </el-button>
            <span v-else>
              <span v-if="slotProps.rowData.tag" class="tag">【{{ slotProps.rowData.tag }}】</span>{{ slotProps.rowData.name }}
            </span>
          </el-tooltip>
        </template>
        <template #progress="slotProps">
          <el-progress :percentage="slotProps.rowData.finished"></el-progress>
        </template>
        <template #overtime="slotProps">
          <span v-if="slotProps.rowData.overtime">
            <span :class="[
              {
                'line-through':
                  slotProps.rowData.status == 'shelve' ||
                  slotProps.rowData.status == 'waitAssign' ||
                  slotProps.rowData.status == 'backlog',
              },
              {
                red: slotProps.rowData.overtime > 0,
                warn: slotProps.rowData.overtime < 0,
              },
            ]">{{ slotProps.rowData.overtime > 0 ? "超时" : "剩余" }}（{{
              $util.formatTime(slotProps.rowData.overtime)
              }}）</span>
          </span>
        </template>
        <template #endTime="slotProps">
          <span :class="{
            'line-through':
              slotProps.rowData.status == 'shelve' ||
              slotProps.rowData.status == 'waitAssign',
          }">{{ slotProps.rowData.endTime }}</span>
        </template>
        <template #estimatedTime="slotProps">
          <span :class="{
            'line-through':
              slotProps.rowData.status == 'shelve' ||
              slotProps.rowData.status == 'waitAssign',
          }">{{ slotProps.rowData.estimatedTime | formatDur }}</span>
        </template>
        <template #priority="slotProps">
          <span class="priority" :style="`border-left: 3px solid ${
            $util.displayEnum($enum.prioritys, slotProps.rowData.priority).color
          };`">{{
            $util.displayEnum($enum.prioritys, slotProps.rowData.priority).label
            }}</span>
        </template>
        <template #status="slotProps">
          <span class="status" :style="`background-color: ${
            $util.displayEnum($enum.statusList, slotProps.rowData.status).color
          };`">{{
            $util.displayEnum($enum.statusList, slotProps.rowData.status).label
            }}</span>
        </template>
      </v-table>
    </el-scrollbar>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    return {
      loading: false,
      userList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      list: {
        records: [],
        total: 0,
      },
      inputParams: {
        page: 1,
        limit: 10,
        daterange: [],
        owner: [],
        status: [],
      },
    };
  },
  computed: {
    token() {
      return sessionStorage.getItem("token");
    }
  },
  created() {
    this.getList();
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$axios.get("/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getList() {
      this.loading = true;
      this.$axios.post("/task/list", this.inputParams).then((res) => {
        this.loading = false;
        if (res.status == 200) {
          this.list = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    search(params) {
      if (params) this.inputParams = Object.assign(this.inputParams, params);
      if (this.inputParams.daterange && this.inputParams.daterange.length) {
        Object.assign(this.inputParams, {
          startTime: this.inputParams.daterange[0],
          endTime: this.inputParams.daterange[1],
        });
        this.getList();
      } else {
        this.inputParams.startTime = "";
        this.inputParams.endTime = "";
        this.getList();
      }
    },
    add() {
      this.$router.push("/work/tasklistAdd");
    },
    del(item) {
      this.$confirm(`你确定删除任务${item.name} ?`, "删除").then(() => {
        this.$axios.post("/task/delete", { id: item.id }).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getList();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    edit(item) {
      this.$router.push({
        path: "/work/tasklistAdd",
        query: {
          id: item.id,
        },
      });
    },
    info(item) {
      this.$router.push({
        path: "/work/tasklistInfo",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.list {
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-param {
      display: flex;
      align-items: center;
      &-item {
        margin: 0 5px;
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .tag {
    color: #f39800;
  }
}
</style>