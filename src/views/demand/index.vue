<template>
    <div class="demand">
        <v-table v-loading="loading" name="demand" :data="list" @search="search">
            <template>
                <el-button icon="el-icon-plus" type="primary" @click="pub">发布</el-button>
            </template>
        </v-table>

        <el-dialog title="处理" :visible.sync="isDo">
            <el-form :model="dealForm" label-width="150px">
                <el-form-item label="需求名称">
                    <span>{{dealForm.name}}</span>
                </el-form-item>
                <el-form-item label="设置状态">
                    <el-select v-model="dealForm.status" placeholder="请选择状态">
                        <el-option label="待办" value="todo"></el-option>
                        <el-option label="处理中" value="doing"></el-option>
                        <el-option label="搁置" value="shelve"></el-option>
                        <el-option label="完成" value="finish"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="dealForm.remark" type="textarea" placeholder="请输入备注" show-word-limit :autosize="{minRows: 4, maxRows: 4}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDo = false">取 消</el-button>
                <el-button type="primary" @click="doDeal">确 定</el-button>
            </div>
        </el-dialog>
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
            isPub: false,
            isDo: false,
            dealForm: {

            }
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
            if (params) this.inputParams = params;
            this.getList();
        },
        pub() {
            this.$router.push("/work/demand_form");
        },
        info({ id }) {
            this.$router.push({ path: "/work/demand_info", query: { id: id } });
        },
        edit({ id }, index) {
            this.$router.push({ path: "/work/demand_form", query: { id: id } });
        },
        deal({ id, name, status }) {
            this.isDo = true;;
            this.dealForm = { id, name, status };
        },
        doDeal() {
            this.$axios.post("/demand/deal", this.dealForm).then(res => {
                if (res.status == 200) {
                    this.isDo = false;
                    this.$message.success(res.msg || "处理成功")
                    this.search();
                }
                else {
                    this.$message.error(res.msg || "处理失败")
                }
            })
        },
        del({ id, name }) {
            this.$confirm(`你确定删除小需求${name}?`, "删除").then(() => {
                this.$axios.post("/demand/delete", { id: id }).then(res => {
                    if (res.status == 200) {
                        this.$message.success(res.msg || "删除成功")
                        this.search();
                    }
                    else {
                        this.$message.error(res.msg || "删除失败")
                    }
                })
            })
        }
    },
};
</script>
