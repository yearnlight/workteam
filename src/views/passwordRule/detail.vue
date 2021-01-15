<template>
    <div class="passwordRule_detail">
        <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
    </div>
</template>

<script>
import infoBase from "@/components/infoBase"
// 密码规则
export default {
    components: { infoBase },
    data() {
        return {
            name: "passwordRule",
            infos: {"name":"登录密码规则","status":"active","starttime":"2021-01-15 14:00:00","endtime":"2021-02-15 14:00:00","uuid":"1","creator":"yangmx","createtime":"2021-01-15 14:10:28"},
            detailColumns: [{"name":"基本信息","fields":[{"name":"规则名称","key":"name","value":"登录密码规则"},{"key":"status","name":"状态","isEnum":true,"enums":{"active":{"label":"应用","type":"success","component":"tag"},"disable":{"label":"禁用","type":"info","component":"tag"}},"value":"active"},{"key":"starttime","name":"开始时间","value":"2021-01-15 14:00:00"},{"key":"endtime","name":"截止时间","value":"2021-02-15 14:00:00"},{"key":"uuid","name":"ID","value":"1"}]},{"name":"其它信息","fields":[{"name":"创建者","key":"creator","value":"yangmx"},{"key":"createtime","name":"创建时间","value":"2021-01-15 14:10:28"}]}]
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
.passwordRule_detail {
}
</style>
