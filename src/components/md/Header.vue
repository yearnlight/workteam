<template>
  <div class="header">
    <input
      type="text"
      placeholder="输入文章标题..."
      v-model="title"
    />
    <div class="right-box">
      <i class="iconfont icon-tupian"></i>
      <el-select
        v-model="label"
        placeholder="关联项目"
        clearable
      >
        <el-option
          v-for="(item, index) in projectList"
          :key="index"
          :label="item.name"
          :value="item.name"
        >
          <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${item.color};`">{{item.name}}</span>
        </el-option>
      </el-select>
      <div
        class="toggle-btn"
        @click="publicX"
      >
        <span class="title">发布</span>
        <i class="el-icon-s-promotion"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    userInfo: Object,
  },
  data() {
    return { title: "", label: "", projectList: [], docInfo: {} };
  },
  watch: {
    title: (n, o) => {
      if (!n) return (document.title = `写文章 - 旋涡`);
      document.title = `写文章-${n}-旋涡`;
    },
  },
  created() {
    this.fetchProject().then(() => {
      if (this.$route.query && this.$route.query.id) {
        this.fetchData();
      }
    });
  },
  methods: {
    fetchData() {
      return this.$axios
        .post("/doc/info", { id: this.$route.query.id })
        .then((res) => {
          this.docInfo = res.data;
          this.title = this.docInfo.title;
          this.label = this.docInfo.label;
        });
    },
    fetchProject() {
      return this.$axios.post("/project/list", {}).then((res) => {
        if (res.status == 200) {
          this.projectList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    publicX() {
      let context = this.$parent.$refs["editor"].value;
      if (context && this.label) {
        let params = {
          title: this.title,
          context: context,
          label: this.label,
        };
        // 更新
        if (this.docInfo && this.docInfo.id) {
          this.$axios
            .post("/doc/update", { id: this.docInfo.id, ...params })
            .then((res) => {
              if (res.status == 200) {
                this.$message.success(res.msg);
                this.$router.go(-1);
              } else {
                this.$message.error("更新文档失败");
              }
            });
        } else {
          this.$axios.post("/doc/save", params).then((res) => {
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.$router.go(-1);
            } else {
              this.$message.error("发布文档失败");
            }
          });
        }
      }
      else {
        this.$message.warning("未选择【关联项目】或者文档【无内容】");
      }

    },
  },
};
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  align-items: center;
  width: calc(100% - 2.8rem);
  height: 5.334rem;
  padding: 0 1.4rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 100;

  input {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    border: none;
    outline: none;
  }

  .right-box {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-left: auto;

    .icon-tupian {
      font-size: 1.55rem;
      color: #999;
      position: relative;
      top: 0.15rem;
      cursor: pointer;
    }

    .toggle-btn {
      margin-left: 2rem;
      cursor: pointer;
      color: #007fff;
      font-size: 1.2rem;

      &:hover {
        opacity: 0.8;
      }

      &>.iconfont {
        padding: 0 0.2rem;
        font-size: 0.8rem;
        position: relative;
        top: -0.1rem;
      }
    }

    .avatar {
      width: 2.667rem;
      height: 2.667rem;
      margin-left: 1.5rem;
      border-radius: 50%;
      background-color: #eee;
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
}
</style>
