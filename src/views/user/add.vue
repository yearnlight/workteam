<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="160px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="Code" prop="key">
        <el-input v-model="formData.key" placeholder="请输入Code" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="formData.department" placeholder="请输入部门" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="组" prop="group">
        <el-input v-model="formData.group" placeholder="请输入组" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="团队" prop="team">
        <el-input v-model="formData.team" placeholder="请输入团队" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
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
        name: undefined,
        key: undefined,
        department: undefined,
        group: undefined,
        team: undefined,
        remark: undefined,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        key: [
          {
            required: true,
            message: "请输入Code",
            trigger: "blur",
          },
        ],
        department: [],
        group: [],
        team: [
          {
            required: true,
            message: "请输入团队",
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
        this.$axios.post("/task/user/add", this.formData).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.$router.push("/work/userlist");
          } else {
            this.$message.error("添加失败");
          }
        });
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>