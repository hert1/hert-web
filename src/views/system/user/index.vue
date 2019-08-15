<template>
  <div class="app-container">
    <router-link :to="{path:'/userInfo'}">
      <el-button type="primary" round style="margin-bottom: 20px;">个人信息</el-button>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="page.records"
      fit
      highlight-current-row
    >
      <el-table-column label="account" align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="name"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="email" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="phone" align="center">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="sex" width="200">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sexName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="250">
        <template slot-scope="scope">
          <router-link :to="{path:'/userInfo', query:{id: scope.row.id}}"><el-button size="mini">详情</el-button></router-link>
          <el-button @click="resetPassword(scope.$index, scope.row)" size="mini" type="danger">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, resetPassword } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      page: null,
      listLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetPassword(index, row) {
      resetPassword([row.id]).then(response => {
        this.$message.success("密码重置成功！")
      }).catch(() => {this.$message.error("密码重置失败！")})
    },
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.page = response.data
        this.listLoading = false
      }).catch(() => {this.listLoading = false})
    }
  }
}
</script>
