<template>
  <div class="list">
    <v-table name="list" :data="list" @info="info" @del="del" @edit="edit" @link="link" @search="search">
      <el-button type="primary" icon="el-icon-plus" @click="add">创建任务</el-button>
      <template #progress="slotProps">
        <el-progress :percentage="slotProps.rowData.finished"></el-progress>
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
        records: [
          {
            taskName: "订单详情优化",
            finished: 50,
            owner: "杨明翔",
            startTime: "2020-08-24 09:00:00",
            endTime: "2020-08-26 09:00:00",
            duration: "2d",
            priority: "high",
            creator: "杨明翔",
            status: "testing",
          },
          {
            taskName: "tags拉通",
            finished: 100,
            owner: "杨明翔",
            startTime: "2020-08-21 09:00:00",
            endTime: "2020-08-23 09:00:00",
            duration: "2d",
            priority: "high",
            creator: "杨明翔",
            status: "end",
          },
        ],
        total: 2,
      },
    };
  },
  methods: {
    add() {
      this.$router.push("/work/tasklistAdd");
    },
    del(item) {
      this.$confirm(`你确定删除任务${item.taskName} ?`, "删除").then(() => {});
    },
  },
};
</script>

<style lang="scss">
.list {
}
</style>