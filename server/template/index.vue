<template>
    <div class="mxComponentName">
        <v-table :name="name" v-loading="loading" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
// mxComponentLabel
export default {
    name: 'mxComponentName',
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
    }
}
</script>

<style lang="scss">
.mxComponentName {
}
</style>