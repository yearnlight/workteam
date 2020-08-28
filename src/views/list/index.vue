<template>
  <div class="list">
    <v-table name="list" :data="list" @info="info" @del="del" @edit="edit">
      <el-button type="primary" icon="el-icon-plus" @click="add">创建任务</el-button>
      <template #progress="slotProps">
        <el-progress :percentage="slotProps.rowData.finished"></el-progress>
      </template>
      <template #overtime="slotProps">
        <span v-if="slotProps.rowData.overtime">
          <span class="red">{{$util.formatTime(slotProps.rowData.overtime)}}</span>
        </span>
      </template>
      <template #estimatedTime="slotProps">
        <span>{{slotProps.rowData.estimatedTime | formatDur}}</span>
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
      list: {
        records: [],
        total: 2,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.post("/task/list", {}).then((res) => {
        if (res.status == 200) {
          this.list.records = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
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
}
</style>