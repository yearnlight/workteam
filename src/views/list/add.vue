<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="160px">
      <el-form-item label>
        <div class="reminder">
          按照业务需求针对任务规划，创建出合理任务项，
          <span class="high">不分配所有者</span>的任务会进任务池。
        </div>
      </el-form-item>
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入任务名称" :maxlength="255" show-word-limit clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="所有者" prop="owner">
        <el-select filterable multiple v-model="formData.owner" placeholder="请选择所有者" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{item.name}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-if="isAdd" v-model="formData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in $enum.statusList.filter(n=>n.isInit)" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${$util.displayEnum($enum.statusList,item.value).color};`">{{item.label}}</span>
          </el-option>
        </el-select>
        <el-select v-else v-model="formData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in $enum.statusList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${$util.displayEnum($enum.statusList,item.value).color};`">{{item.label}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="formData.priority" size="medium">
          <el-radio v-for="(item, index) in $enum.prioritys" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预估日期范围" prop="startEndTime">
        <el-date-picker
          type="datetimerange"
          v-model="formData.startEndTime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '100%'}"
          start-placeholder="开始日期"
          end-placeholder="到期日期"
          range-separator="至"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预估时间" prop="estimatedTime">
        <el-input :disabled="true" v-model="formData.estimatedTime" placeholder="请输入预估时间" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="预估说明" prop="estimatedInfo">
        <el-input type="textarea" v-model="formData.estimatedInfo" placeholder="请输入预估时间说明信息" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-select v-model="formData.creator" placeholder="请选择创建者" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{item.name}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="已完成%" prop="finished" required>
        <div class="spans">
          <el-col :span="21">
            <el-slider :max="100" :step="1" v-model="formData.finished"></el-slider>
          </el-col>
          <el-col :span="3">
            <span class="spans-sum">{{formData.finished}} %</span>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      userList: [],
      isAdd: true,
      formData: {
        name: undefined,
        owner: [],
        status: "waitAssign",
        priority: "low",
        startEndTime: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
        estimatedTime: [
          {
            required: true,
            message: "请输入预估时间",
            trigger: "blur",
          },
        ],
        estimatedInfo: [
          {
            required: true,
            message: "请输入预估说明",
            trigger: "blur",
          },
        ],
        startEndTime: [
          {
            required: true,
            message: "日期范围不能为空",
            trigger: "change",
          },
        ],
        priority: [
          {
            required: true,
            message: "优先级不能为空",
            trigger: "change",
          },
        ],
        creator: [
          {
            required: true,
            message: "请输入创建者",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  watch: {
    "formData.startEndTime": {
      handler(n, o) {
        if (n && n.length) {
          let dur = new Date(n[1]) - new Date(n[0]);
          this.formData.estimatedTime = `${parseInt(
            dur / 1000 / 60 / 60 / 24
          )}天 ${parseInt((dur / 1000 / 60 / 60) % 24)}时`;
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.query.id) {
      this.isAdd = false;
      this.getTaskInfo(this.$route.query.id);
    }
    this.getUserList();
  },
  mounted() {},
  methods: {
    getUserList() {
      this.$axios.get("/task/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getTaskInfo(id) {
      this.$axios.post("/task/info", { id: id }).then((res) => {
        if (res.status == 200) {
          let formData = res.data;
          formData.startEndTime = [formData.startTime, formData.endTime];
          formData.owner = formData.owner.split(",");
          this.formData = formData;
        }
      });
    },
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        this.formData.startTime = this.formData.startEndTime[0];
        this.formData.endTime = this.formData.startEndTime[1];
        if (this.isAdd) {
          this.$axios.post("/task/create", this.formData).then((res) => {
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.$router.push("/work/tasklist");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$axios.post("/task/update", this.formData).then((res) => {
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.$router.push("/work/tasklist");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style lang="scss">
.addTask {
  padding: 20px;
  .el-form {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    padding: 20px;
    &-item {
      .el-select,
      .el-input,
      .el-date-editor,
      .el-textarea,
      .el-radio-group {
        width: 50% !important;
        .el-input {
          width: 100% !important;
        }
      }
    }
  }
  .spans {
    display: flex;
    padding: 0 10px;
    width: 50%;
    align-items: center;
    &-sum {
      padding: 0 10px;
    }
  }
}
</style>
