<template>
  <div class="user">
    <v-table name="user" :data="list" @info="info" @del="del" @edit="edit">
      <el-button type="primary" icon="el-icon-plus" @click="add">添加用户</el-button>
    </v-table>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    return {
      list: { records: [], total: 0 },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.get("/task/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.list.records = res.data;
          this.list.total = res.data.length;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    info() {},
    del(item) {
      this.$confirm(`你确定删除 ${item.name} ?`, "删除").then(() => {
        this.$axios.post("/task/user/delete", { id: item.id }).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getList();
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    edit() {},
    add() {
      this.$router.push("/work/userlistAdd");
    },
  },
};
</script>