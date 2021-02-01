<template>
    <div class="role">
        <v-table :name="name" v-loading="loading" :searchConfig="searchConfig" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
import vTable from "@/components/vTable"
// 角色管理
export default {
    name: 'role',
    components: { vTable },
    data() {
        return {
            name: "role",
            loading: false,
            list: {
                records: [{"name":"超级管理员","enName":"super","level":"全系统","remark":"最大权限","createtime":"2021-01-30 16:15:27"}],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [{"prop":"name","label":"名称"},{"prop":"enName","label":"英文名称","width":""},{"prop":"level","label":"级别"},{"prop":"remark","label":"备注"},{"prop":"createtime","label":"创建时间"},{"prop":"uuid","label":"操作","isOperate":true,"operateFun":[{"function":"del","label":"删除","icon":""},{"prop":"","label":"编辑","function":"edit"}]}],
            tableConfig: {"setting":true,"pagination":true,"isPublic":true,"pageSize":10,"type":null},
            searchConfig: {"labels":[{"name":"名称","field":"name","value":"","type":"input","connector":"0","hide":false}],"btns":[{"name":"查询","click":""}],"inputParams":{}}
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
            this.$router.push({ path: "/work/role_detail" })
        },
    }
}
</script>

<style lang="scss">
.role {
}
</style>