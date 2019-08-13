<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="操作"  width="150">
        <template slot-scope="scope">
          <router-link :to="{path:'/userInfo', query:{id: scope.row.id}}"><el-button size="mini">详情</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/user'

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
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.records
        this.listLoading = false
      })
    }
  }
}
</script>
