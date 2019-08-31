<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="服务器IP">
          <el-input v-model="query.serverIp_equal" placeholder="服务器IP"></el-input>
        </el-form-item>
        <el-form-item label="环境">
          <el-select v-model="query.env_equal" placeholder="环境">
            <el-option label="开发环境" value="dev"></el-option>
            <el-option label="生产环境" value="prod"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchApiList">查询</el-button>
          <el-button type="primary" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  <el-table
    :data="page.records"
    v-loading="listLoading"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="创建人：">
            <span>{{ props.row.createBy }}</span>
          </el-form-item>
          <el-form-item label="创建时间：">
            <span>{{ props.row.createTime }}</span>
          </el-form-item>
          <el-form-item label="异常：">
            <span>{{ props.row.exceptionName }}</span>
          </el-form-item>
          <el-form-item label="方法：">
            <span>{{ props.row.fileName }}</span>
          </el-form-item>
          <el-form-item label="行数：">
            <span>{{ props.row.lineNumber }}</span>
          </el-form-item>
          <el-form-item label="message：">
            <span>{{ props.row.message }}</span>
          </el-form-item>
          <el-form-item label="methodClass：">
            <span>{{ props.row.methodClass }}</span>
          </el-form-item>
          <el-form-item label="methodName：">
            <span>{{ props.row.methodName }}</span>
          </el-form-item>
          <el-form-item label="参数：">
            <span>{{ props.row.params }}</span>
          </el-form-item>
          <el-form-item label="来源：">
            <span>{{ props.row.remoteIp }}</span>
          </el-form-item>
          <el-form-item label="请求地址：">
            <span>{{ props.row.requestUri }}</span>
          </el-form-item>
          <el-form-item label="使用方式：">
            <span>{{ props.row.userAgent }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      :show-overflow-tooltip='true'
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="环境"
      prop="env">
    </el-table-column>
    <el-table-column
    label="提交方式"
    prop="method">
  </el-table-column>
    <el-table-column
    label="服务"
    prop="serviceId">
  </el-table-column>
    <el-table-column
      label="服务ip"
      :show-overflow-tooltip='true'
      prop="serverIp">
    </el-table-column>
  </el-table>
    <el-pagination
      style="float: right; margin-top: 15px"
      background
      layout="prev, pager, next"
      @current-change="currentPageChange"
      :pager-count="5"
      :hide-on-single-page="true"
      :total="page.total">
    </el-pagination>
    <pagination v-show="page.total>0" :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="fetchUsualList" />
  </div>
</template>

<script>
  import {api_list} from '@/api/log'
  import pagination from '@/components/Pagination'
  export default {
    components: {
      pagination
    },
    created() {
      this.fetchApiList()
    },
    data() {
      return {
        listLoading: true,
        page: [],
        query: {},
      }
    },
    methods: {
      resetQuery() {
        this.query = {};
        this.fetchApiList()
      },
      fetchApiList(new_query) {
        this.listLoading = true
        new_query = {...new_query, ...this.query}
          api_list(new_query).then(response => {
            this.page = response.data
            this.listLoading = false
          }).catch(() => {this.listLoading = false})
      }
    },
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
