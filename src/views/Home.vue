<template>
  <div>
    <el-card>
      <el-button size="large" @click="dialogAddFormVisible = true">添加员工</el-button>
      <template #header>
        <el-input v-model="search" size="large" placeholder="Type to search" style="margin-right: 10px" />
      </template>
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="性别">
          <template #default="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" prop="phone" />
        <el-table-column label="身份证号" prop="idNumber" />

        <el-table-column label="在职状态">
          <template #default="scope">
            <span v-if="scope.row.status == 0">离职</span>
            <span v-else>在职</span>
          </template>
        </el-table-column>


        <el-table-column align="right">


          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="你确定要删除这个嘛?" confirm-button-text="确认" cancel-button-text="取消" @confirm="deleteRow(scope.row)">
              <template #reference>
                <el-button style="width:48px;" size="small" type="danger">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>

        </el-table-column>

      </el-table>
    </el-card>

    <!-- 编辑员工的dialog -->
    <el-dialog v-model="dialogEditFormVisible" title="编辑">
      <el-form :model="editFormData" ref="editFormData" :rules="addRules">
        <el-form-item label="用户名：" label-width="140px" prop="username">
          <el-input v-model="editFormData.username" clearable />
        </el-form-item>
        <el-form-item label="员工姓名：" label-width="140px" prop="name">
          <el-input v-model="editFormData.name" clearable />
        </el-form-item>
        <el-form-item label="手机号：" label-width="140px" prop="phone">
          <el-input v-model="editFormData.phone" clearable />
        </el-form-item>
        <el-form-item label="性别：" label-width="140px" prop="sex">
          <el-radio-group v-model="editFormData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：" label-width="140px" prop="idNumber">
          <el-input v-model="editFormData.idNumber" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="updateEmployee('editFormData')">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加员工的dialog -->
    <el-dialog v-model="dialogAddFormVisible" title="添加员工">
      <el-form :model="addFormData" ref="addFormData" :rules="addRules">
        <el-form-item label="用户名：" label-width="140px" prop="username">
          <el-input v-model="addFormData.username" clearable />
        </el-form-item>
        <el-form-item label="员工姓名：" label-width="140px" prop="name">
          <el-input v-model="addFormData.name" clearable />
        </el-form-item>
        <el-form-item label="手机号：" label-width="140px" prop="phone">
          <el-input v-model="addFormData.phone" clearable />
        </el-form-item>
        <el-form-item label="性别：" label-width="140px" prop="sex">
          <el-radio-group v-model.number="addFormData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号：" label-width="140px" prop="idNumber">
          <el-input v-model="addFormData.idNumber" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="addEmployee('addFormData')">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



<script>
import { ElMessage } from 'element-plus';
import { parseInt } from 'lodash';
import request from '../utils/request';



export default {
  data() {
    return {
      search: '',
      tableData: [],
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      addFormData: {
        username: '',
        name: '',
        phone: '',
        sex: 1,
        idNumber: ''
      },
      editFormData: {
        username: '',
        name: '',
        phone: '',
        sex: '',
        idNumber: ''
      },
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 16, message: "用户名长度必须在1-16之间", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码11位", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        idNumber: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          { min: 18, max: 18, message: "18位身份证号", trigger: "blur" },
        ],
      }
    }
  },
  created() {
    request.get("/employee/getEmployeeList").then(res => {
      this.tableData = res.data;
    })
  },
  methods: {
    handleEdit(index, row) {
      this.dialogEditFormVisible = true;
      this.editFormData.sex = parseInt(row.sex);
      console.log(row);
      this.editFormData = row;
    },
    deleteRow(row){
      console.log(row.username);
      request.post("/employee/deleteEmployee",row.username).then(res => {
        if(res.code === 1){
          ElMessage.success(res.data)
        }else{
          ElMessage.error(res.msg)
        }
      }).finally(()=>{
        this.$router.go(0)
      })
    },
    addEmployee(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/employee/add", this.addFormData).then(res => {
            ElMessage.success(res.data);
            this.dialogAddFormVisible = false;
            this.$router.go(0);
          })
        } else {
          ElMessage.error("新增失败");
          return false;
        }
      });
    },
    updateEmployee(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.editFormData);
          request.post("/employee/updateEmployee", this.editFormData).then(res => {

            if (res.data == true) {
              ElMessage.success("修改成功")
              this.dialogEditFormVisible = false;
            } else {
              ElMessage.error("修改失败,可能是用户名重复了哦！")
            }
          })
        } else {
          ElMessage.error("服务器请求异常");
          return false;
        }
      })
    }
  }
}

</script>
