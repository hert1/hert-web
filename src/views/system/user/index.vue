<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="账号">
          <el-input v-model="query.account_equal" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="query.name_like" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="query.phone_like" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="primary" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

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
      <el-table-column align="center" prop="created_at" label="status" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status === 1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleSubmit(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="250">
        <template slot-scope="scope">
          <router-link :to="{path:'/userInfo', query:{id: scope.row.id}}"><el-button size="mini">详情</el-button></router-link>
          <el-button @click="resetPassword(scope.$index, scope.row)" size="mini" type="danger">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="page.total>0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="fetchUsualList" />
  </div>
</template>

<script>
import { fetchList, resetPassword, submit } from '@/api/user'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
  },
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
      page: {},
      listLoading: true,
      query: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSubmit(value) {
      if (value.status === 1) {
        value.status = 0
      } else {
        value.status = 1
      }
      submit(value).then(response => {
        this.$message({
          type: 'success',
          message: response.message || '操作成功'
        });
        this.fetchData();
      })
    },
    resetPassword(index, row) {
      resetPassword([row.id]).then(response => {
        this.$message.success("密码重置成功！")
      }).catch(() => {this.$message.error("密码重置失败！")})
    },
    resetQuery() {
      this.query = {};
      this.fetchData()
    },
    fetchData(new_query) {
      this.listLoading = true
      new_query = {...new_query, ...this.query}
      fetchList(new_query).then(response => {
        this.page = response.data
        this.listLoading = false
      }).catch(() => {this.listLoading = false})
    }
  }
}
</script>
