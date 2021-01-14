<template>
    <div class="mxComponentName">
        <v-table :name="name" v-loading="loading" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
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
            tableConfig: mxComponentTableConfig
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
            this.$router.push({ path: "/work/mxComponentName_detail" })
        },
    }
}
</script>

<style lang="scss">
.mxComponentName {
}
</style>