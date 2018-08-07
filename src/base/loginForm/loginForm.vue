<template>
  <Form ref="loginForm" :model="form" :rules="rules">
      <!-- 用户名 -->
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <!-- 密码 -->
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <!-- 登录 -->
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  // 定义验证规则
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            type: "string",
            min: 4,
            message: "用户名长度至少为4位",
            trigger: "blur"
          }
        ];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            min: 4,
            message: "密码长度至少为4位",
            trigger: "blur"
          }
        ];
      }
    }
  },
  data() {
    return {
      form: {
        username: "admin",
        password: "admin"
      }
    };
  },
  computed: {
    rules() {
      return {
        username: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      // 判断是否验证都通过
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            username: this.form.username,
            password: this.form.password
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
