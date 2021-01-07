<template>
    <div class="demandInfo">
        <info-base :infos="infoData" detailName="demand"></info-base>
        <div class="base">
            <div class="base-header">跟踪信息</div>
            <div class="base-content">
                <el-timeline v-if="remarks && remarks.length">
                    <el-timeline-item v-for="(item, index) in remarks" :key="index" :timestamp="item.dealtime">
                        <div class="track">
                            <div class="track-status">状态变更：
                                <dot :level="enums[item.oStatus].type">{{enums[item.oStatus].label}}</dot>
                                →
                                <dot :level="enums[item.nStatus].type">{{enums[item.nStatus].label}}</dot>
                            </div>
                            <div class="track-desc">备注：{{item.desc}}</div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
                <no-data v-else />
            </div>
        </div>
    </div>
</template>

<script>
import InfoBase from "@/components/infoBase";
export default {
    components: { InfoBase },
    data() {
        return {
            infoData: {},
            "enums": {
                "finish": {
                    "label": "完成",
                    "type": "success",
                    "component": "dot"
                },
                "doing": {
                    "label": "处理中",
                    "type": "warning",
                    "component": "dot"
                },
                "shelve": {
                    "label": "搁置",
                    "type": "info",
                    "component": "dot"
                },
                "todo": {
                    "label": "待处理",
                    "type": "primary",
                    "component": "dot"
                }
            }
        }
    },
    computed: {
        remarks() {
            if (this.infoData.remark) {
                return JSON.parse(this.infoData.remark)
            }
            return [];
        }
    },
    created() {
        this.fetchInfo();
    },
    methods: {
        fetchInfo() {
            this.$axios.post("/demand/info", { id: this.$route.query.id }).then(res => {
                if (res.status == 200) {
                    this.infoData = res.data;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.demandInfo {
  .track {
    &-status {
      margin-bottom: 10px;
    }

    &-desc {
      margin-bottom: 10px;
    }
    border: 1px solid #eceff8;
    padding: 20px;
  }
}
</style>

