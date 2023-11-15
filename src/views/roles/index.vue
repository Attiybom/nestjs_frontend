<script setup lang="ts">
import { reactive } from 'vue';
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
    name: '管理员'
  }
])

// 删除按钮
const handleClickRemove = () => {
  console.log('handleClickRemove')
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
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="角色名" />
        <el-table-column fixed="right" label="操作" >
          <template #default>
            <el-button link type="primary" size="small" @click="handleClickRemove">删除</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
