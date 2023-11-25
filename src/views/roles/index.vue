<script setup lang="ts">
import { reactive, ref } from 'vue';
// 搜索
const searchForm = reactive({
  name: ''
})

//
const handleClickQuery = () => {
  console.log('handleClickQuery')
}

// 表格展示
const tableData = reactive([
  {
    name: '管理员',
    permission: ''
  }
])

// 编辑
const handleClickEdit = () => {
  modalTitle.value = '编辑'
  dialogFormVisible.value = true
  console.log('handleClickEdit')
}

const deleteModalVisible = ref(false)

// 删除按钮
const handleClickRemove = () => {
  console.log('handleClickRemove')
  deleteModalVisible.value = true
}

// 确定删除
const handleDeleteRecord = () => {
  console.log('handleDeleteRecord')
}



// 新增

const dialogFormVisible = ref(false)

const modalTitle = ref('新增')

const roleForm = reactive({
  role: '',
  permission: []
})

const permissions = [
  {
    id: 1,
    name: 'CREATE'
  },
  {
    id: 2,
    name: 'UPDATE'
  },
  {
    id: 3,
    name: 'REMOVE'
  },
  {
    id: 4,
    name: 'FIND'
  },
  {
    id: 5,
    name: 'MANAGE'
  }
]

const handleClickAdd = () => {
  // console.log('handleClickAdd')
  dialogFormVisible.value = true
}

// 确定新增角色
const handleAddUser = () => {
  // console.log('handleAddUser')
  dialogFormVisible.value = false
}

const handleDialogClose = () => {
  // console.log('handleDialogClose')
  Object.assign(roleForm, {
    role: '',
    permission: []
  })
}


</script>

<template>
  <div class="roles">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input v-model="searchForm.name" placeholder="请输入角色名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClickQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-button type="primary" @click="handleClickAdd">
        新增
      </el-button>
    </div>


    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="角色名" />
        <el-table-column prop="permission" label="分配权限" />
        <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClickEdit">编辑</el-button>
            <el-button link type="primary" size="small" @click="handleClickRemove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <!-- 新增/编辑模态框 -->
    <el-dialog v-model="dialogFormVisible" :title="modalTitle" @close="handleDialogClose">
      <el-form :model="roleForm">
        <el-form-item label="角色名" :label-width="'140px'">
          <el-input v-model="roleForm.role" autocomplete="off" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="菜单" :label-width="'140px'">
          <el-checkbox-group v-model="roleForm.permission">
            <el-checkbox v-for="permission in permissions" :key="permission.id" :label="permission.id">
              {{ permission.name }}
            </el-checkbox>
          </el-checkbox-group>
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

  </div>
</template>

<style lang="scss" scoped>
</style>
