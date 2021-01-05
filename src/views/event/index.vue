<template>
    <div class="list">
        <el-scrollbar style="height:calc(100% - 20px)">
            <v-table v-loading="loading" name="event" :data="list" @search="search">
                <template #level="scope">
                    <level v-if="scope.rowData.level == 'success'" level="success" text="成功"></level>
                    <level v-else-if="scope.rowData.level == 'error'" level="danger" text="错误"></level>
                    <level v-else level="warning" text="警告"></level>
                </template>
            </v-table>
        </el-scrollbar>
    </div>
</template>

<script>
import level from "@/components/Level/index"
import vTable from "@/components/vTable";
export default {
    components: { vTable, level },
    data() {
        return {
            loading: false,
            list: {
                records: [],
                total: 0,
            },
            inputParams: {
                page: 1,
                limit: 10
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
    },
    methods: {
        getList() {
            this.loading = true;
            this.$axios.post("/event/list", this.inputParams).then((res) => {
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
            this.getList();
        }
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