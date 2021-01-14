<template>
    <div class="mxComponentName_detail">
        <info-base :infos="infos" :detailName="name" :detailColumns="detailColumns"></info-base>
    </div>
</template>

<script>
import infoBase from "@/components/infoBase"
// mxComponentDetailLabel
export default {
    components: { infoBase },
    data() {
        return {
            name: "mxComponentName",
            infos: mxComponentDetailTestData,
            detailColumns: mxComponentDetailColumns
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
.mxComponentName_detail {
}
</style>
