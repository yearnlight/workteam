<template>
  <div class="login" :style="{backgroundImage:'url('+ imgUrl+')'}">
    <div class="login-content">
      <el-form ref="loginForm" :model="form" :rules="loginRules" class="login-form">
        <div class="login-content-title">工作协作平台</div>
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入登录账号" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="form.pass" type="password" placeholder="请输入密码" prefix-icon="el-icon-key" @keyup.enter.native="handleLogin" clearable></el-input>
        </el-form-item>
        <el-button size="medium" :loading="loading" class="login-btn" @click.native.prevent="handleLogin">{{loading?"登录中...":"登 录"}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!(value && value.length >= 5)) {
        callback(new Error("用户名不能少于5位"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!(value && value.length >= 6)) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      imgUrl: require("../../assets/login.jpg"),
      form: {},
      loading: false,
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        pass: [{ required: true, trigger: "blur", validator: validatePassword }]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios.post("/auth/login", this.form).then(res => {
            if (res.status == 200) {
              window.sessionStorage.setItem("token", res.data.token);
              window.sessionStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$router.push("/work");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  &-btn {
    width: 100%;
    margin-bottom: 30px;
    background: -webkit-linear-gradient(to left, #005bea, #00c6fb);
    background: -o-linear-gradient(to left, #005bea, #00c6fb);
    background: -moz-linear-gradient(to left, #005bea, #00c6fb);
    background: linear-gradient(to left, #005bea, #00c6fb);
    color: #e0e0e0;
    border: none;
    &:focus,
    :active {
      color: #e0e0e0 !important;
    }
    &:hover {
      color: #e0e0e0 !important;
      background: -webkit-linear-gradient(
        to left,
        rgba(0, 91, 234, 0.9),
        rgba(0, 198, 251, 0.9)
      );
      background: linear-gradient(
        to left,
        rgba(0, 91, 234, 0.9),
        rgba(0, 198, 251, 0.9)
      );
    }
  }
  &-content {
    padding: 40px;
    margin-left: auto;
    margin-right: 200px;
    z-index: 100;
    width: 280px;
    height: 280px;
    &-title {
      text-align: center;
      padding: 30px 20px;
      font-size: 22px;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>