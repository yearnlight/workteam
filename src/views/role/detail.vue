<template>
    <div class="role_detail">
        <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
    </div>
</template>

<script>
import infoBase from "@/components/infoBase"
// 角色管理
export default {
    components: { infoBase },
    data() {
        return {
            name: "role",
            infos: {"name":""},
            detailColumns: [{"name":"基本信息","fields":[{"name":"名称","key":"name","value":""}]}]
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
.role_detail {
}
</style>
