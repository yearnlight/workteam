<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="160px">
      <el-form-item label>
        <div class="reminder">
          按照业务需求针对任务规划，创建出合理任务项，
          <span class="high">不分配所有者</span>的任务会进任务池。
        </div>
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="formData.taskName" placeholder="请输入任务名称" :maxlength="255" show-word-limit clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="所有者" prop="owner">
        <el-input v-model="formData.owner" placeholder="请输入所有者" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in $enum.statusList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${$util.displayEnum($enum.statusList,item.value).color};`">{{item.label}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围" prop="startEndTime">
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
      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="formData.priority" size="medium">
          <el-radio v-for="(item, index) in $enum.prioritys" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-input v-model="formData.creator" placeholder="请输入创建者" clearable :style="{width: '100%'}"></el-input>
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
      formData: {
        taskName: undefined,
        owner: "",
        status: "waitAssign",
        priority: "low",
        field113: 0,
      },
      rules: {
        taskName: [
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
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
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
