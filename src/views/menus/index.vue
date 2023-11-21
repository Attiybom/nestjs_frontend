<script setup lang="ts">
import { reactive } from 'vue';


const searchForm = reactive({
  name: ''
})

const handleClickQuery = () => {
  console.log('handleClickQuery')
}


const tableData = reactive([
  {
    name: '管理员',
    route: '/dashboard',
    sort: 1,
    operation: 'READ, UPDATE, DELETE, CREATE'
  }
])


const handleClickEdit = () => {
  console.log('handleClickEdit')
}

const handleClickRemove = () => {
  console.log('handleClickRemove')
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
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="route" label="菜单路径" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="operation" label="操作策略" />
        <el-table-column fixed="right" label="操作" >
          <template #default>
            <el-button link type="primary" size="small" @click="handleClickEdit">编辑</el-button>
            <el-button link type="primary" size="small" @click="handleClickRemove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
