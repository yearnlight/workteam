<template>
    <div class="store-card">
        <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            v-for="(item,index) in stores"
            :key="index"
        >
            <div class="store-card-icon">
                <card-img
                    :text="item.name"
                    :fill="item.color"
                ></card-img>
            </div>

            <div style="padding: 14px;">
                <span class="name">{{item.name}}</span>
                <div class="bottom clearfix">
                    <time class="time">{{item.createtime}}</time>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import cardImg from "./card-img";
export default {
  components: { cardImg },
  props: {
    stores: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleCommand(key) {}
  }
};
</script>

<style lang="scss">
.store-card {
  display: flex;
  flex-wrap: wrap;
  .el-card {
    width: 250px;
    margin: 10px;
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .time {
      font-size: 12px;
      color: #909399;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>


