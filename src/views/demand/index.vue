<template>
    <div class="demand">
        <v-table v-loading="loading" name="demand" :data="list" @search="search">
            <template>
                <el-button icon="el-icon-plus" type="primary" @click="pub">发布</el-button>
            </template>
        </v-table>
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
            isPub: false
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
            this.$axios.post("/demand/list", this.inputParams).then((res) => {
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
        },
        pub() {
            this.isPub = true;
        }
    },
};
</script>
