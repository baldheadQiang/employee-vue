<template>
  <div>
    <el-form :model="form" label-width="100px" :rules="rules">
      <h4 class="form-title">管理系统</h4>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" show-password v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
          plain
          :loading="isLoading"
          class="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
import router from "../router";


const isLoading = ref(false);
const form = reactive({});
const rules = reactive({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 1, max: 16, message: "用户名长度必须在1-16之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 32, message: "用户名长度必须在6-32之间", trigger: "blur" },
  ],
});
const login = () => {
  if (form.username == null) {
    ElMessage.error("请输入用户名");
    return
  } else if (form.password == null) {
    ElMessage.error("请输入密码");
    return
  } else {
    request.post("/admin/login", form).then((res) => {
      isLoading.value = false;
      if (res.code === 0) {
        ElMessage.error(res.msg);
      } else {
        ElMessage.success("登录成功");
        sessionStorage.setItem("user", JSON.stringify(res.data)); //缓存用户信息
        router.push("/home");
      }
    }).catch(()=>{
      ElMessage.error("服务器异常")
    });
  }
};

</script>
<style scoped>
form {
  text-align: center;
  width: 420px;
  height: 200px;
  padding: 20px 30px 20px 0;
  margin: 250px auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.login {
  width: 100%;
}
.form-title {
  width: 450px;
  text-align: center;

  margin-bottom: 30px;
}
</style>>
    
