<template>
  <div class="app-container">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="基本信息" name="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><h3>{{userInfo.name}}</h3></span>
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
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="直系下属" name="2">
        <el-table
          :data="userList"
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
              <el-button
                size="mini"
                @click="">详情</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="拥有角色" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="拥有权限" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
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
      userInfo: {},
      userList: null,
      listLoading: true,
      activeName: 1,
    }
  },
  created() {
    this.fetchUserData();
    this.fetchUserInfo();
  },
  methods: {
    fetchUserData() {
      fetchList().then(response => {
        this.userList = response.data.records
      })
    },
    fetchUserInfo() {
      detail({id: store.getters.userInfo.id}).then(response => {
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
