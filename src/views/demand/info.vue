<template>
    <div class="demandInfo">
        <info-base :infos="infoData" detailName="demand"></info-base>
        <div class="base">
            <div class="base-header">跟踪信息</div>
            <div class="base-content">
                <el-timeline v-if="remarks && remarks.length">
                    <el-timeline-item v-for="(item, index) in remarks" :key="index" :timestamp="item.dealtime">
                        <el-card>
                            <div class="item">
                                <label>状态：</label>
                                <div class="value">
                                    <tag :type="enums[item.oStatus].type">{{enums[item.oStatus].label}}</tag>
                                    <span class="connect">变更为</span>
                                    <tag :type="enums[item.nStatus].type">{{enums[item.nStatus].label}}</tag>
                                </div>
                            </div>
                            <div class="item">
                                <label>前端负责人：</label>
                                <div class="value">
                                    <span class="high">{{ item.oWebMaster}}</span>
                                    <span class="connect">变更为</span>
                                    <span class="high">{{ item.nWebMaster }}</span></div>
                            </div>
                            <div class="log item">
                                <label>备注：</label>
                                <p class="log-info">{{ item.desc }}</p>
                            </div>
                        </el-card>
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
  .el-timeline {
    width: 60%;
    .item {
      margin-bottom: 15px;
      label {
        width: 120px;
        display: inline-block;
      }
      .value {
        color: #999;
        display: inline-block;
        .connect{
            font-size: 10px;
            transform: scale(0.5);
            margin: 0 10px;
        }
      }
    }

    .log {
      display: flex;
      &-info {
        color: #999;
        flex: 1;
        white-space: break-spaces;
        margin: 0;
      }
    }
  }
}
</style>

