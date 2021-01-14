<template>
    <div class="conversation">
        <v-table :name="name" v-loading="loading" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search"></v-table>
    </div>
</template>

<script>
// 会话管理
export default {
    name: 'conversation',
    data() {
        return {
            name: "conversation",
            loading: false,
            list: {
                records: [{"account":"yangmx","username":"杨明翔","logintime":"2021-01-13 14:06:50","status":"active","ip":"192.168.3.42"}],
                total: 0
            },
            inputParams: {
                page: 1,
                limit: 10
            },
            columns: [{"prop":"account","label":"账号"},{"prop":"username","label":"用户名称","width":""},{"prop":"logintime","label":"登录时间"},{"prop":"status","label":"状态","isEnum":true,"enums":{"active":{"label":"登陆中","type":"success","component":"tag"},"error":{"label":"异常","type":"danger","component":"tag"}}},{"prop":"ip","label":"IP"}],
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
    }
}
</script>

<style lang="scss">
.conversation {
}
</style>