<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><h3>详情信息</h3></span>
        <el-button style="float: right; padding: 3px 0; margin-top: -40px" type="primary">修改</el-button>
      </div>
    <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span><h4>{{userInfo.name}}</h4></span>
            <el-image
              style="width: 50px; height: 50px; float: right; margin-top: -50px"
              :src="userInfo.avatar | avatarFilter "
              fit="contain"></el-image>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><span>真名：{{userInfo.realName}}</span></el-col>
            <el-col :span="8"><span>昵称：{{userInfo.name}}</span></el-col>
            <el-col :span="8"><span>上级：{{userInfo.parentName}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><span>性别：{{userInfo.sexName}}</span></el-col>
            <el-col :span="8"><span>手机：{{userInfo.phone}}</span></el-col>
            <el-col :span="8"><span>email：{{userInfo.email}}</span></el-col>
          </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><span>角色：<el-tag style="margin-left: 10px" v-for="item in userInfo.roleName">{{item}}</el-tag></span></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><span>部门：<el-tag style="margin-left: 10px" v-for="item in userInfo.deptName">{{item}}</el-tag></span></el-col>
      </el-row>
        </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span><h4>直系下属</h4></span>
      </div>
      <el-table
        :data="userList"
        v-loading="loading"
        fit
        highlight-current-row
      >
        <el-table-column label="account" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/userInfo', query:{id: scope.row.id}}">{{ scope.row.account }}</router-link>
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
      </el-table>
    </el-card>
    </el-card>
  </div>
</template>

<script>
import { fetchList, detail } from '@/api/user'
import store from '@/store'

export default {
  filters: {
    avatarFilter:function (dateStr) {
      return dateStr ? dateStr : 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
  },
  computed: {
  },
  data() {
    return {
      id: null,
      userInfo: {},
      userList: null,
      loading: true,
      activeName: 1,
    }
  },
  created() {
    this.id = this.$route.query.id
    this.fetchUserList();
    this.fetchUserInfo();
  },
  methods: {
    fetchUserList() {
      fetchList({id: this.id}).then(response => {
        this.userList = response.data.records
        this.loading = false
      })
    },
    fetchUserInfo() {
      detail({id: this.id}).then(response => {
        this.userInfo = response.data
      })
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
