<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #909399"><span style="color: #409EFF; font-size: 20px">{{nodeData.roleName}}</span>的详情信息</span>
        <el-button style="float: right; padding: 3px 3px; margin-left: 10px" type="primary" icon="el-icon-back" circle @click="reback"></el-button>
        <el-button style="float: right; padding: 3px 3px" type="primary" icon="el-icon-edit" circle @click="openEditModal"></el-button>
        <el-button style="float: right; padding: 3px 3px" type="primary" icon="el-icon-plus" circle @click="openAddModal"></el-button>
      </div>
      <span>{{nodeData}}</span>
    </el-card>
    <EditForm @handleSubmit="handleSubmit"
              @closeEditForm="closeEditForm"
              :editFormVisible="editFormVisible"
              :nodeData="editNodeData"/>
  </div>
</template>

<script>
import EditForm from './edit'
import {submit} from '@/api/role'
export default {
  components: {
    EditForm
  },
  data() {
    return {
      editFormVisible: false,
      editNodeData: {},
    }
  },
  props: {
    nodeData: {},
  },
  mounted() {

  },
  created() {
  },
  watch: {

  },

  methods: {
    handleSubmit(value) {
      submit(value).then(response => {
        this.$message({
          type: 'success',
          message: response.message || '操作成功'
        });
        this.editFormVisible = false;
        this.reback();
      })
    },
    closeEditForm() {
      this.editFormVisible = false;
    },
    openEditModal() {
      this.editFormVisible = true;
      this.editNodeData = this.nodeData
    },
    openAddModal() {
      this.editFormVisible = true
      const nodeData = this.nodeData
      let editNodeData = {'parentId': nodeData.id, 'parentName': nodeData.roleName}
      this.editNodeData = editNodeData
    },
    reback() {
      this.$emit('closeNodeDisplay')
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

</style>
