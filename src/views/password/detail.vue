<template>
    <div class="password_detail">
        <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
    </div>
</template>

<script>
import infoBase from "@/components/infoBase"
// 密码管理
export default {
    components: { infoBase },
    data() {
        return {
            name: "password",
            infos: {"name":"密码规则1","status":"active","uuid":"1"},
            detailColumns: [{"name":"基本信息","fields":[{"name":"名称","key":"name","value":"密码规则1"},{"key":"status","name":"状态","isEnum":true,"enums":{"active":{"label":"应用中","type":"success","component":"tag"},"error":{"label":"错误","type":"danger","component":"tag"}},"value":"active"},{"key":"uuid","name":"ID","value":"1"}]}]
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
.password_detail {
}
</style>
