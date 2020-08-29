<template>
  <div class="list">
    <v-table name="list" :data="list" @info="info" @del="del" @edit="edit">
      <div class="search">
        <el-button type="primary" icon="el-icon-plus" @click="add">创建任务</el-button>
        <div class="search-param">
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="daterange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>

      <template #progress="slotProps">
        <el-progress :percentage="slotProps.rowData.finished"></el-progress>
      </template>
      <template #overtime="slotProps">
        <span v-if="slotProps.rowData.overtime">
          <span
            :class="[{'line-through':slotProps.rowData.status == 'shelve' || slotProps.rowData.status == 'waitAssign'},{'red':slotProps.rowData.overtime>0,'warn':slotProps.rowData.overtime<0}]"
          >{{slotProps.rowData.overtime>0?"超时":"剩余"}}（{{$util.formatTime(slotProps.rowData.overtime)}}）</span>
        </span>
      </template>
      <template #endTime="slotProps">
        <span :class="{'line-through':slotProps.rowData.status == 'shelve' || slotProps.rowData.status == 'waitAssign'}">{{slotProps.rowData.endTime}}</span>
      </template>
      <template #estimatedTime="slotProps">
        <span :class="{'line-through':slotProps.rowData.status == 'shelve' || slotProps.rowData.status == 'waitAssign'}">{{slotProps.rowData.estimatedTime | formatDur}}</span>
      </template>
      <template #priority="slotProps">
        <span class="priority" :style="`border-left: 3px solid ${$util.displayEnum($enum.prioritys,slotProps.rowData.priority).color};`">{{$util.displayEnum($enum.prioritys,slotProps.rowData.priority).label}}</span>
      </template>
      <template #status="slotProps">
        <span class="status" :style="`background-color: ${$util.displayEnum($enum.statusList,slotProps.rowData.status).color};`">{{$util.displayEnum($enum.statusList,slotProps.rowData.status).label}}</span>
      </template>
    </v-table>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    return {
      daterange: [],
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(params) {
      this.$axios.post("/task/list", params).then((res) => {
        if (res.status == 200) {
          this.list.records = res.data;
          this.list.total = res.data.length;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    search() {
      if (this.daterange && this.daterange.length) {
        this.getList({
          startTime: this.daterange[0],
          endTime: this.daterange[1],
        });
      } else {
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
  .line-through {
    text-decoration: line-through;
    color: #999;
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-param {
      display: flex;
      align-items: center;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>