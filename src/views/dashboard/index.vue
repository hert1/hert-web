<template>
  <div class="app-container">
   name
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
