
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { createUserReq, deleteUserReq, getUsersReq, updateUserReq } from '@/api/user';
import { UserItem, RoleType } from '@/types/user';

const tableData = ref([
] as UserItem[]);

const deleteId = ref(0)
const deleteRow = async (id: number) => {
  // tableData.value.splice(index, 1);
  deleteModalVisible.value = true

  deleteId.value = id
  // const deleteRes =  await deleteUserReq(id)

};

const handleDeleteRecord = async () => {
  await deleteUserReq(deleteId.value)
  deleteModalVisible.value = false
  await getUsers()
}

async function getUsers() {
  const res = await getUsersReq() as unknown as UserItem[]
  if (res && res.length > 0) {
    tableData.value = res
  }
}

//
onMounted(async () => {
  await getUsers()
})

const handlePageChange = async (e: number) => {
  console.log('handlePageChange', e)
  const res = await getUsersReq({
    page: e
  }) as unknown as UserItem[]
  if (res && res.length > 0) {
    tableData.value = res
  } else {
    tableData.value = []
  }
}


// 模态框
const dialogFormVisible = ref(false)
const deleteModalVisible = ref(false)

const userForm = reactive({
  id: 0,
  username: '',
  password: '',
  profile: {
    gender: '1',
    address: '',
    photo: ''
  },
  roles: [],
})

const roles = [
  {
    id: 1,
    name: '管理员'
  },
  {
    id: 2,
    name: '游客'
  },
  {
    id: 3,
    name: '普通用户'
  },
  {
    id: 4,
    name: '测试员'
  }
]

const modalTitle = ref('新增')
const openAddModel = (type: string, row?: any) => {
  if (type === 'add') {
    modalTitle.value = '新增'
  } else if (type === 'edit') {
    modalTitle.value = '编辑'
    userForm.id = row.id
    userForm.profile.address = row.profile?.address
    userForm.profile.gender = row.profile?.gender + ''
    userForm.profile.photo = row.profile?.photo
    userForm.username = row.username
    userForm.password = row.password
    userForm.roles = row.roles.map((role: RoleType) => role.id)
  }
  dialogFormVisible.value = true
}

async function handleAddUser() {

  if (modalTitle.value === '新增') {
    // 直接新增
    const res = await createUserReq(userForm)
    // 清空
    Object.assign(userForm, {
      username: '',
      password: '',
      profile: {
        gender: '1',
        address: '',
        photo: ''
      },
      roles: [],
    })
    if (res.status === 201) {
      await getUsers()
    }
  } else {

    await updateUserReq(userForm.id, userForm)
    await getUsers()
    // 清空
    Object.assign(userForm, {
      username: '',
      password: '',
      profile: {
        gender: '1',
        address: '',
        photo: ''
      },
      roles: [],
    })
  }

  dialogFormVisible.value = false
}


const searchForm = reactive({
  username: '',
  gender: '',
  role: '',
})

const onSubmit = async () => {
  const res = await getUsersReq(searchForm) as unknown as UserItem[]
  if (res && res.length > 0) {
    tableData.value = res
  } else {
    tableData.value = []
  }
}

// 新增/编辑模态框关闭
const handleDialogClose = () => {
  Object.assign(userForm, {
    id: 0,
    username: '',
    password: '',
    profile: {
      gender: '1',
      address: '',
      photo: ''
    },
    roles: [],
  })
}

</script>

<template>
  <div class="user">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.gender" placeholder="请选择性别" clearable>
            <el-option label="男性" value="1" />
            <el-option label="女性" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="searchForm.role" clearable placeholder="请选中角色类型" style="width: 240px">
            <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-button type="primary" @click="openAddModel('add')">新增</el-button>
      <el-table :data="tableData" style="width: 100%" max-height="500">
        <!-- <el-table-column fixed prop="date" label="Date" /> -->
        <!-- <el-table-column prop="city" label="City" /> -->
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="profile.gender" label="性别">
          <template #default="{ row }">
            {{ row.profile && row.profile.gender === 1 ? '男性' : '女性' }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="role" label="头像" /> -->
        <el-table-column prop="profile.address" label="地址" />
        <el-table-column prop="profile.photo" label="头像" />
        <el-table-column label="角色">
          <template #default="scope">
            <span v-for="(role, index) in scope.row.roles" :key="role.id">
              {{ role.name }}<span v-if="index < scope.row.roles.length - 1">, </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row.id)">
              删除
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="openAddModel('edit', scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增模态框 -->
      <el-dialog v-model="dialogFormVisible" :title="modalTitle" @close="handleDialogClose">
        <el-form :model="userForm">
          <el-form-item label="用户名" :label-width="'140px'">
            <el-input v-model="userForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="'140px'">
            <el-input v-model="userForm.password" type="password" autocomplete="off" show-password />
          </el-form-item>
          <el-form-item label="角色" :label-width="'140px'">
            <el-checkbox-group v-model="userForm.roles">
              <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">
                {{ role.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="性别" :label-width="'140px'">
            <el-radio-group v-model="userForm.profile.gender" class="ml-4">
              <el-radio label="1" size="large">男性</el-radio>
              <el-radio label="2" size="large">女性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="头像" :label-width="'140px'">
            <el-input v-model="userForm.profile.photo" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地址" :label-width="'140px'">
            <el-input v-model="userForm.profile.address" autocomplete="off" />
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="handleAddUser()">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 删除模态框 -->
      <el-dialog v-model="deleteModalVisible" title="删除" width="30%">
        <span>确定要删除该记录吗？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleDeleteRecord()">删除</el-button>
            <el-button @click="deleteModalVisible = false">
              取消
            </el-button>
          </span>
        </template>
      </el-dialog>

      <el-pagination class="pagination-container" @current-change="handlePageChange" small background
        layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  width: 100%;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
</style>
