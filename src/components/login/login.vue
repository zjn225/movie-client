<template>
     <div class="login">
       <!-- 登录框 -->
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "base/loginForm/loginForm";
import { loginRequest } from "api/admin";
import { mapMutations } from "vuex";

export default {
  components: {
    LoginForm
  },
  methods: {
    async handleSubmit({ username, password }) {
      let res = await loginRequest({ username, password });
      if (res.data.success === true) {
        // 添加sessionStorage
        this.setManageStatus("退出登录")
        sessionStorage.setItem("user", username);
        this.$Message.success("登录成功");
        this.$router.push({
          path: "/admin"
        });
      } else {
        this.$Message.error(res.data.err);
      }
    },
     ...mapMutations({
      setManageStatus: "SET_MANAGESTATUS",
    })
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/login-bg.jpg");
  background-size: cover;
  background-position: center;
  .login-con {
    width: 420px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>


