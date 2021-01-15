<template>
    <div class="password">
        <v-table :name="name" v-loading="loading" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
import vTable from "@/components/vTable"
// 密码管理
export default {
    name: 'password',
    components: { vTable },
    data() {
        return {
            name: "password",
            loading: false,
            list: {
                records: [{"name":"密码规则1","status":"active","start_ip":"192.0.0.0","end_ip":"192.0.0.1","uuid":"1"}],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [{"prop":"name","label":"名称","isOperate":false,"isInfo":true,"funName":"info","operateFun":{"function":"info"}},{"prop":"status","label":"状态","width":"100","isEnum":true,"enums":{"active":{"label":"应用中","type":"success","component":"tag"},"error":{"label":"错误","type":"danger","component":"tag"}}},{"prop":"start_ip","label":"第一个可用地址"},{"prop":"end_ip","label":"最后一个可用地址"},{"prop":"uuid","label":"操作","isOperate":true,"operateFun":[{"function":"del","label":"删除","icon":"el-icon-delete"},{"prop":"","label":"编辑","function":"edit","icon":"el-icon-edit"}]}],
            tableConfig: {"setting":true,"pagination":true,"isPublic":false,"pageSize":10,"type":null}
        }
    },
    created() {
        this.search();
    },
    methods: {
        search() { },
        del(item, index) { },
        edit(item, index) { },
        info(item, index) {
            // 跳入详情
            this.$router.push({ path: "/work/password_detail" })
        },
    }
}
</script>

<style lang="scss">
.password {
}
</style>