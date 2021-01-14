<template>
    <div class="conversation_detail">
        <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
    </div>
</template>

<script>
import infoBase from "@/components/infoBase"
// 会话管理
export default {
    components: { infoBase },
    data() {
        return {
            name: "conversation",
            infos: {"account":"yangmx","username":"杨明翔","logintime":"2021-01-13 14:10:37","status":"active","ip":"196.168.3.63"},
            detailColumns: [{"name":"基本信息","fields":[{"name":"账号","key":"account","value":"yangmx"},{"key":"username","name":"用户名","value":"杨明翔"},{"key":"logintime","name":"登录时间","value":"2021-01-13 14:10:37"},{"key":"status","name":"状态","isEnum":true,"enums":{"active":{"label":"登陆中","type":"success","component":"tag"},"error":{"label":"异常","type":"danger","component":"tag"}},"value":"active"},{"key":"ip","name":"IP","value":"196.168.3.63"}]}]
        }
    },
    created() {
        this.fetchDetail();
    },
    methods: {
        fetchDetail() { }
    }
}
</script>

<style lang="scss">
.conversation_detail {
}
</style>
