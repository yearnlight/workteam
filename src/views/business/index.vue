
<template>
    <div class="businessMenu">
        <div class="businessMenu-left">
            <div class="businessMenu-left-operate">
                <el-button type="primary" icon="el-icon-plus" @click="create">创建</el-button>
            </div>
            <el-menu :default-active="active" class="el-menu-vertical-demo" @select="select" :collapse="isCollapse">
                <el-menu-item :index="item.key" v-for="(item,index) in menus" :key="index">
                    <span slot="title">{{item.name}}</span>
                    <span slot="title" class="warn" v-if="!item.name">{{item.key}}<span class="remark">[无名称]</span></span>
                </el-menu-item>
            </el-menu>
        </div>

        <div class="businessMenu-right">
            <Model :name="active" />
        </div>

    </div>
</template>

<style lang="scss">
.businessMenu {
  display: flex;
  &-left {
    width: 200px;

    .el-menu {
      border-right: none;
      overflow-y: scroll;
      height: calc(100% - 52px);
    }
    .remark {
      font-size: 12px;
      color: #999;
      margin-left: 3px;
    }
  }
  &-right {
    flex: 1;
    padding: 10px;
    border-left: 1px solid #eaeefb;
    overflow-y: scroll;
  }
}
</style>

<script>
import Model from "./model";
import t_fields from "@/resource/t_fields";

export default {
    components: { Model },
    data() {
        return {
            isCollapse: false,
            active: "region",
            menus: []
        };
    },
    created() {
        let that = this;
        for (let key in t_fields) {
            let item = t_fields[key];
            if (item.tableColumns && item.tableColumns.length) {
                that.menus.push({ key: key, ...item });
            }
        }
        that.active = that.menus[0].key;
    },
    methods: {
        select(index) {
            this.active = index;
        },
        create() {
            // 创建服务配置
            this.$router.push("/work/business_create")
        }
    }
}
</script>