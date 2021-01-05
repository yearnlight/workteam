<template>
  <div class="store-card">
    <el-card shadow="hover" :body-style="{ padding: '0px' }" v-for="(item,index) in stores" :key="index">
      <div class="store-card-icon" @click="goto(item)">
        <img v-if="item.icon" :src="item.icon" />
        <card-img v-else :text="item.name" :fill="item.color"></card-img>
      </div>

      <div style="padding: 14px;">
        <el-collapse>
          <el-collapse-item :title="item.name" :name="index">
            <div>
              <span class="tag">【{{item.label}}】</span>{{item.desc}}
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="bottom clearfix">
          <time class="time">{{item.createtime}} {{item.creator}}</time>
          <span>
            <span class="el-icon-delete red" @click="del(item)"></span>
          </span>
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
    del({ name, uuid }) {
      this.$confirm(`你确定删除应用服务【${name}】?`, "删除").then(() => {
        this.$axios.post("/store/delete", { uuid }).then(res => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.$emit("handDelete", name);
          }
          else {
            this.$message.error("删除应用服务失败");
          }
        })
      })
    },
    goto(item) {
      window.open(item.href, "_blank");
    }
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
    cursor: pointer;
    height: 140px;
    img {
      padding: 20px;
      max-width: calc(100% - 40px);
      max-height: 80%;
    }
  }
  .el-collapse {
    border: none;
    margin-bottom: 5px;
    .el-collapse-item__header {
      height: 30px;
      line-height: 30px;
      border: none;
    }
    .el-collapse-item__wrap {
      border: none;
    }
    .el-collapse-item__content {
      padding-bottom: 10px;
      color: #909399;
      .tag {
        color: #f39800;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .time {
      font-size: 12px;
      color: #909399;
    }
    .blue {
      margin-right: 10px;
      font-size: 12px;
    }
    .red {
      font-size: 12px;
    }
  }
}
</style>


