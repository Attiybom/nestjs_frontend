<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { getMenusReq, addMenuReq, deleteMenuReq, editMenuReq } from "@/api/menus";
import { MenusType } from '@/types/menus';

// 获取菜单列表
const getMenus = async () => {
  const res = await getMenusReq() as unknown as MenusType[]
  console.log('res', res)
  if (res && res.length > 0) {
    tableData.value = res
  }
}

// 生命周期中获取菜单列表
onMounted(async () => {
  await getMenus()
})

const searchForm = reactive({
  name: ''
})

const handleClickQuery = () => {
  console.log('handleClickQuery')
}


const tableData = ref([
  // {
  //   name: '管理员',
  //   route: '/dashboard',
  //   sort: 1,
  //   action: 'READ, UPDATE, DELETE, CREATE'
  // }
] as MenusType[])


const editId = ref(0)
const handleClickEdit = (row: any) => {
  console.log('res', row)
  // 赋值
  editId.value = row.id
  roleForm.role = row.name
  roleForm.route = row.route
  roleForm.sort = row.sort
  roleForm.permission = row.action.split(',')
  modalTitle.value = '编辑'
  dialogFormVisible.value = true
  console.log('handleClickEdit')
}


// modal
const dialogFormVisible = ref(false)

const modalTitle = ref('新增')

const roleForm = reactive({
  role: '',
  route: '',
  sort: '',
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

const handleAddMenus = async () => {
  console.log('handleAddMenus', roleForm)
  // 判断新增还是编辑
  if (modalTitle.value === '新增') {
    const newMenus = {
      name: roleForm.role,
      route: roleForm.route,
      sort: roleForm.sort,
      action: roleForm.permission.join(',')

    }

    const res = await addMenuReq(newMenus)
    console.log('addres', res)
  } else {
    const newMenus = {
      name: roleForm.role,
      route: roleForm.route,
      sort: roleForm.sort.toString(),
      action: roleForm.permission.join(',')

    }

    const res = await editMenuReq(editId.value, newMenus)
    console.log('updateres', res)
  }

  await getMenus()
  dialogFormVisible.value = false
}

const handleClickAdd = async () => {
  modalTitle.value = '新增'
  dialogFormVisible.value = true
  await getMenus()
  console.log('handleClickAdd')
}

const handleDialogClose = () => {
  dialogFormVisible.value = false
  console.log('handleDialogClose')
}

// 删除模态框
const dialogVisible = ref(false)
const deleteId = ref(0)

const handleClickRemove = (id: number) => {
  console.log('id', id)
  deleteId.value = id
  dialogVisible.value = true
  console.log('handleClickRemove')
}

const handleDeleteRole = async () => {
  console.log('handleDeleteRole')
  await deleteMenuReq(deleteId.value)
  await getMenus()
  dialogVisible.value = false
}

</script>

<template>
  <div class="menus">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="菜单名">
          <el-input v-model="searchForm.name" placeholder="请输入菜单名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClickQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-button type="primary" @click="handleClickAdd">新增</el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="route" label="菜单路径" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="action" label="操作策略" />
        <el-table-column fixed="right" label="操作">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleClickEdit(row)">编辑</el-button>
            <el-button link type="primary" size="small" @click="handleClickRemove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div>
      <el-dialog v-model="dialogFormVisible" :title="modalTitle" @close="handleDialogClose">
        <el-form :model="roleForm">
          <el-form-item label="菜单名">
            <el-input v-model="roleForm.role" autocomplete="off" placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input v-model="roleForm.route" autocomplete="off" placeholder="请输入菜单路径" />
          </el-form-item>
          <el-form-item label="菜单排序">
            <el-input v-model="roleForm.sort" autocomplete="off" placeholder="请输入菜单排序" />
          </el-form-item>
          <el-form-item label="允许的操作策略">
            <el-checkbox-group v-model="roleForm.permission">
              <el-checkbox v-for="permission in permissions" :key="permission.id" :label="permission.name">
                {{ permission.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="handleAddMenus()">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 删除模态框 -->
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <span>确认删除该菜单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDeleteRole">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
