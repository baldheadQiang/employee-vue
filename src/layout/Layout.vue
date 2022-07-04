<template>
  <div>
    <!-- 头部 -->
    <div style="
        height: 50px;
        line-height: 50px;
        display: flex;
        border-bottom: 1px solid black;
      ">
      <div style="width;200px;margin-left:20px;">公司员工人员管理系统</div>
      <div style="flex: 1"></div>
      <div style="width: 80px; margin-top: 15px">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div style="display: flex">
      <div style="width: 200px">
        <el-menu default-active="/home" style="height: calc(100vh - 51px)" router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>员工管理</span>
            </template>
            <el-menu-item index="/home">
              <el-icon>
                <icon-menu />
              </el-icon>
              主页
            </el-menu-item>
          </el-sub-menu>
          <!-- 
          <el-menu-item index="/login">
            <el-icon><icon-menu /></el-icon>
            <span>管理</span>
          </el-menu-item> -->
        </el-menu>
      </div>
      <div style="flex: 1; padding: 5px">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ArrowDown, Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import router from "../router";
import request from "../utils/request";
const userInfo = reactive({
  name: ""
});
if (sessionStorage.length != 0) {
  userInfo.name = JSON.parse(sessionStorage.getItem("user")).name;
} else {
  router.push("/login")
}
const logout = () => {
  sessionStorage.clear();
  request.post("/admin/logout").then(res => {
    ElMessage.success(res.data)
  })
  router.push("/login")
}
</script>

