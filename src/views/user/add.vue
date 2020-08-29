<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="160px">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="key">
        <el-input v-model="formData.key" placeholder="请输入Code" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="isAdd" label="密码" prop="pass">
        <el-input v-model="formData.pass" type="password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="formData.department" placeholder="请输入部门" clearable></el-input>
      </el-form-item>
      <el-form-item label="组" prop="group">
        <el-input v-model="formData.group" placeholder="请输入组" clearable></el-input>
      </el-form-item>
      <el-form-item label="团队" prop="team">
        <el-input v-model="formData.team" placeholder="请输入团队" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
          :autosize="{minRows: 4, maxRows: 4}"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button v-if="isAdd" @click="resetForm">重置</el-button>
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
      isAdd: true,
      formData: {
        name: undefined,
        key: undefined,
        department: undefined,
        group: undefined,
        team: undefined,
        remark: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        key: [
          {
            required: true,
            message: "请输入Code",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        department: [],
        group: [],
        team: [
          {
            required: true,
            message: "请输入团队",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query.id) {
      this.isAdd = false;
      this.getInfo();
    }
  },
  mounted() {},
  methods: {
    getInfo() {
      this.$axios
        .post("/task/user/info", { id: this.$route.query.id })
        .then(res => {
          if (res.status == 200) {
            this.formData = res.data;
          }
        });
    },
    submitForm() {
      this.$refs["elForm"].validate(valid => {
        if (!valid) return;
        if (this.isAdd) {
          this.$axios.post("/task/user/add", this.formData).then(res => {
            if (res.status == 200) {
              this.$message.success(res.msg);
              this.$router.push("/work/userlist");
            } else {
              this.$message.error("添加失败");
            }
          });
        } else {
          this.$axios
            .post(
              "/task/user/update",
              Object.assign(this.formData, { id: this.$route.query.id })
            )
            .then(res => {
              if (res.status == 200) {
                this.$message.success(res.msg);
                this.$router.push("/work/userlist");
              } else {
                this.$message.error("更新失败");
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