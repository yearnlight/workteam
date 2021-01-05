<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="160px">
      <el-form-item label="">
        <div class="reminder">
          按照业务需求针对任务规划，创建出合理任务项，
          <span class="high">不分配所有者</span>的任务会进任务池。
        </div>
      </el-form-item>
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入任务名称" :maxlength="255" show-word-limit clearable :style="{ width: '100%' }"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="formData.tag" placeholder="请输入标签" :maxlength="10" show-word-limit clearable :style="{ width: '100%' }"></el-input>
        <div class="reminderInline">任务分
          <span class="reminder-high">大类</span>，或者
          <span class="reminder-high">特殊标记</span>
        </div>
      </el-form-item>
      <el-form-item label="所有者" prop="owner" v-if="!isAdd">
        <el-select filterable multiple v-model="formData.owner" placeholder="请选择所有者" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-if="isAdd" v-model="formData.status" placeholder="请选择状态" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in $enum.statusList.filter((n) => n.isInit)" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${
                $util.displayEnum($enum.statusList, item.value).color
              };`">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-select v-else v-model="formData.status" placeholder="请选择状态" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in $enum.statusList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${
                $util.displayEnum($enum.statusList, item.value).color
              };`">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-popover placement="right" trigger="hover" popper-class="reminder">
          <span class="reminder-high">待分配、搁置状态的任务</span>才可以修改预估时间，任务一旦开始运行暂时不允许修改预估时间。
          <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-question"></el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="formData.priority" size="medium">
          <el-radio v-for="(item, index) in $enum.prioritys" :key="index" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row v-if="!isAdd">
        <el-col :span="6">
          <el-form-item label="预估开始时间" prop="startDate">
            <el-date-picker :picker-options="pickerOptions" :disabled="disabledUpdate" v-model="formData.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px" prop="startSmallTime">
            <el-time-select :disabled="disabledUpdate" v-model="formData.startSmallTime" :picker-options="{
                start: '09:00',
                step: '00:60',
                end: '18:00',
              }" placeholder="选择时间"></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isAdd">
        <el-col :span="6">
          <el-form-item label="预估完结时间" prop="endDate">
            <el-date-picker :picker-options="pickerOptions" :disabled="disabledUpdate" v-model="formData.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="10px" prop="endSmallTime">
            <el-time-select :disabled="disabledUpdate" v-model="formData.endSmallTime" :picker-options="{
                start: '09:00',
                step: '00:60',
                end: '18:00',
              }" placeholder="选择时间"></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="!isAdd" label="预估时间" prop="estimatedTime">
        <el-input :disabled="true" v-model="formData.estimatedTime" placeholder="请输入预估时间" clearable :style="{ width: '100%' }"></el-input>
        <el-popover placement="right" trigger="hover" popper-class="reminder">
          预估时间：根据预估完结时间 - 预估开始时间 = 预估时间
          <span class="reminder-high">（每天工作时间9小时计算,每周按照6天工作日不计算周天）</span>
          <el-button class="reminderBtn" type="text" slot="reference" icon="el-icon-question"></el-button>
        </el-popover>
        <div class="reminderInline">
          <span class="reminder-high">周天</span>休息日，不予计算,
          <span class="reminder-high">管理员角色</span>可以修改预估时间
        </div>
      </el-form-item>
      <el-form-item v-if="!isAdd" label="预估说明" prop="estimatedInfo">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="formData.estimatedInfo" placeholder="请输入预估时间说明信息" clearable :style="{ width: '100%' }"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-select v-model="formData.creator" placeholder="请选择创建者" clearable :style="{ width: '100%' }">
          <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="已完成%" prop="finished" required>
        <div class="spans">
          <el-col :span="21">
            <el-slider :max="100" :step="1" v-model="formData.finished"></el-slider>
          </el-col>
          <el-col :span="3">
            <span class="spans-sum">{{ formData.finished }} %</span>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item v-if="!isAdd" label="更新说明" prop="updateInfo">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="formData.updateInfo" placeholder="请输入更新说明信息" clearable :style="{ width: '100%' }"></el-input>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getDay() === 0;
        }
      },
      userList: [],
      isAdd: true,
      formData: {
        name: undefined,
        owner: [],
        status: "waitAssign",
        priority: "low"
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ],
        estimatedTime: [
          {
            required: true,
            message: "请输入预估时间",
            trigger: "blur"
          }
        ],
        estimatedInfo: [
          {
            required: true,
            message: "请输入预估说明",
            trigger: "blur"
          }
        ],
        updateInfo: [
          {
            required: true,
            message: "请输入更新说明",
            trigger: "blur"
          }
        ],
        startDate: [
          {
            required: true,
            message: "开始日期不能为空",
            trigger: "change"
          }
        ],
        startSmallTime: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        endDate: [
          {
            required: true,
            message: "完结日期不能为空",
            trigger: "change"
          }
        ],
        endSmallTime: [
          {
            required: true,
            message: "完结时间不能为空",
            trigger: "change"
          }
        ],
        priority: [
          {
            required: true,
            message: "优先级不能为空",
            trigger: "change"
          }
        ],
        creator: [
          {
            required: true,
            message: "请选择创建者",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    disabledDate() {
      let curUser = JSON.parse(sessionStorage.getItem("userInfo"));
      if (curUser.role == "super") {
        return false;
      }
      return !(
        this.formData.status == "shelve" || this.formData.status == "waitAssign"
      );
    }
  },
  watch: {},
  watch: {
    "formData.startDate": {
      handler(n, o) {
        if (n && n.length) {
          this.calcDur();
        }
      },
      deep: true
    },
    "formData.startSmallTime": {
      handler(n, o) {
        if (n && n.length) {
          this.calcDur();
        }
      },
      deep: true
    },
    "formData.endDate": {
      handler(n, o) {
        if (n && n.length) {
          this.calcDur();
        }
      },
      deep: true
    },
    "formData.status": {
      handler(n, o) {
        if (n && n == "end") {
          this.formData.finished = 100;
        }
      },
      deep: true
    },
    "formData.endSmallTime": {
      handler(n, o) {
        if (n && n.length) {
          this.calcDur();
        }
      },
      deep: true
    }
  },
  created() {
    if (this.$route.query.id) {
      this.isAdd = false;
      this.getTaskInfo(this.$route.query.id);
    } else {
      let userStr = sessionStorage.getItem("userInfo");
      if (userStr) {
        let userInfo = JSON.parse(userStr);
        this.formData.creator = userInfo.name;
      }
    }
    this.getUserList();
  },
  mounted() { },
  methods: {
    calcDur() {
      if (
        this.formData.endDate &&
        this.formData.endSmallTime &&
        this.formData.startDate &&
        this.formData.startSmallTime
      ) {
        let dur =
          new Date(`${this.formData.endDate} ${this.formData.endSmallTime}`) -
          new Date(
            `${this.formData.startDate} ${this.formData.startSmallTime}`
          );
        // 判断是否包含周天
        if (
          this.$util.isWeekDay(
            `${this.formData.startDate} ${this.formData.startSmallTime}`,
            `${this.formData.endDate} ${this.formData.endSmallTime}`
          )
        ) {
          this.formData.estimatedTime = this.$util.formatTime(dur, 1);
        } else {
          this.formData.estimatedTime = this.$util.formatTime(dur, 0);
        }
      }
    },
    getUserList() {
      this.$axios.get("/user/list", {}).then(res => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getTaskInfo(id) {
      this.$axios.post("/task/info", { id: id }).then(res => {
        if (res.status == 200) {
          let formData = res.data;
          if (formData.startTime) {
            let startTime = formData.startTime.split(" ");
            formData.startDate = startTime[0];
            formData.startSmallTime = startTime[1];
          }
          if (formData.endTime) {
            let endTime = formData.endTime.split(" ");

            formData.endDate = endTime[0];
            formData.endSmallTime = endTime[1];
          }
          if (formData.owner) {
            formData.owner = formData.owner.split(",");
            formData.owner = formData.owner ? formData.owner : [];
          }

          this.formData = formData;
        }
      });
    },
    submitForm() {
      this.$refs["elForm"].validate(valid => {
        if (!valid) return;
        if (this.isAdd) {
          this.$axios.post("/task/create", this.formData).then(res => {
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.$router.push("/work/tasklist");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.formData.startTime = `${this.formData.startDate} ${
            this.formData.startSmallTime
            }`;
          this.formData.endTime = `${this.formData.endDate} ${
            this.formData.endSmallTime
            }`;
          if (this.formData.status == "backlog") {
            this.$message.warning(
              "任务状态不允许更新成待办，分配后的任务未到开始时间默认设置成待办"
            );
            return;
          }
          this.$axios.post("/task/update", this.formData).then(res => {
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
    }
  }
};
</script>
<style lang="scss">
.addTask {
  padding: 20px;
  .reminder {
    max-width: 100%;
  }
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

    .el-col {
      .el-input.el-date-editor {
        width: 100% !important;
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
