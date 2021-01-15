<template>
    <div class="passwordRule">
        <v-table :name="name" v-loading="loading" :searchConfig="searchConfig" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
import vTable from "@/components/vTable"
// 密码规则
export default {
    name: 'passwordRule',
    components: { vTable },
    data() {
        return {
            name: "passwordRule",
            loading: false,
            list: {
                records: [{"name":"登录密码规则","status":"active","starttime":"2021-01-15 14:00:00","endtime":"2021-02-15 14:00:00","uuid":"1"}],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [{"prop":"name","label":"规则名称","isInfo":true,"funName":"info","operateFun":{"function":"info"}},{"prop":"status","label":"状态","width":"100","isEnum":true,"enums":{"active":{"label":"应用","type":"success","component":"tag"},"disable":{"label":"禁用","type":"info","component":"tag"}}},{"prop":"starttime","label":"启用时间"},{"prop":"endtime","label":"截止时间"},{"prop":"uuid","label":"操作","isOperate":true,"operateFun":[{"function":"del","label":"删除","icon":"el-icon-delete"},{"prop":"","label":"编辑","function":"edit","icon":"el-icon-edit"}]}],
            tableConfig: {"setting":true,"pagination":true,"isPublic":false,"pageSize":10,"type":null},
            searchConfig: {"labels":[{"name":"规则名称","field":"name","value":"","type":"input","connector":"6","hide":false,"placeholder":"请输入，支持模糊搜索"},{"prop":"","label":"","name":"状态","field":"status","placeholder":"请选择","connector":"0","type":"select","data":[{"label":"应用","type":"","component":"","value":"active"},{"prop":"","label":"禁用","value":"disable"}]}],"btns":[{"name":"查询","click":""}],"inputParams":{}}
        }
    },
    created() {
        this.search();
    },
    methods: {
        search() { },
        del(item, index) {
            this.$confirm(`你确定删除此项 ?`, "删除").then(() => {

            })
        },
        edit(item, index) { },
        info(item, index) {
            // 跳入详情
            this.$router.push({ path: "/work/passwordRule_detail" })
        },
    }
}
</script>

<style lang="scss">
.passwordRule {
}
</style>