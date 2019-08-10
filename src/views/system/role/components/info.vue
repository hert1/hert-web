<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>role-info</span>
        <el-button style="float: right; padding: 3px 3px" type="text" @click="reback">reback</el-button>
        <el-button style="float: right; padding: 3px 3px" type="text" @click="openEditModal">edit</el-button>
        <el-button style="float: right; padding: 3px 3px" type="text" @click="openAddModal">add</el-button>
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
