<template>
  <div class="user">
    <v-table name="user" :data="list" @info="info" @del="del" @edit="edit" @updatePass="updatePass">
      <el-button type="primary" icon="el-icon-plus" @click="add" v-if="isSuper">添加用户</el-button>
      <div class="reminderInline">
        <span class="high">超级管理</span>可以操作所有用户信息，
        <span class="high">普通用户</span>只能操作自身。
      </div>
      <template #role="slotProps">
        <span :class="{'warn':slotProps.rowData.role == 'super'}">{{slotProps.rowData.role == "super"?"超级管理员":"普通用户"}}</span>
      </template>
    </v-table>
    <el-dialog title="修改密码" :visible.sync="isUpdatePass">
      <el-form :model="form" :rules="rules" ref="updatePassForm" label-width="140px">
        <el-form-item label>
          <div class="reminder">
            原始密码：
            <span class="high">123456</span>
          </div>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="form.oldPass" type="password" placeholder="请输入旧密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" type="password" placeholder="请输入新密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass2">
          <el-input v-model="form.newPass2" type="password" placeholder="请再次输入新密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isUpdatePass = false">取 消</el-button>
        <el-button type="primary" @click="save('updatePassForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vTable from "@/components/vTable";
export default {
  components: { vTable },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!(value && value.length >= 6)) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      list: { records: [], total: 0 },
      form: {},
      rules: {
        oldPass: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        newPass: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        newPass2: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
      },
      isUpdatePass: false,
      selectItem: {},
      isSuper: false,
    };
  },
  created() {
    this.search();
    this.isSuper = this.$util.getUser().role == "super";
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/user/update", {
              pass: this.form.newPass2,
              oldPass: this.form.oldPass,
              id: this.selectItem.id,
            })
            .then((res) => {
              if (res.status == 200) {
                sessionStorage.clear();
                this.$router.push("/login");
                this.$message.success("更新密码成功");
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    search() {
      this.$axios.get("/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.list.records = res.data;
          this.list.total = res.data.length;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    info() {},
    updatePass(item) {
      this.isUpdatePass = true;
      this.selectItem = item;
    },
    del(item) {
      this.$confirm(`你确定删除 ${item.name} ?`, "删除").then(() => {
        this.$axios.post("/user/delete", { id: item.id }).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getList();
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    edit(item) {
      this.$router.push({ path: "/work/userlistAdd", query: { id: item.id } });
    },
    add() {
      this.$router.push("/work/userlistAdd");
    },
  },
};
</script>