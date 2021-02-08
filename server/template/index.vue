<template>
    <div class="mxComponentName">
        <v-table :name="name" v-loading="loading" :searchConfig="searchConfig" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
import vTable from "@/components/vTable"
// mxComponentLabel
export default {
    name: 'mxComponentName',
    components: { vTable },
    data() {
        return {
            name: "mxComponentName",
            loading: false,
            list: {
                records: mxComponentTableTestData,
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: mxComponentColumns,
            tableConfig: mxComponentTableConfig,
            searchConfig: mxComponentSearchConfig
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
            this.$router.push({ path: "/mxComponentProject/mxComponentName_detail" })
        },
    }
}
</script>

<style lang="scss">
.mxComponentName {
}
</style>