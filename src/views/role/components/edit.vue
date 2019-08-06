<template>
  <div class="app-container">
    <el-dialog title="收货地址" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="nodeData">
        <el-form-item label="主键" :label-width="formLabelWidth">
          <el-input v-model="nodeData.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级主键" :label-width="formLabelWidth">
          <el-input v-model="nodeData.parentId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级" :label-width="formLabelWidth">
          <el-input v-model="nodeData.parentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="nodeData.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色别名" :label-width="formLabelWidth">
          <el-input v-model="nodeData.roleAlias" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="nodeData.sort" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formLabelWidth: '120px',
    }
  },
  props: {
    nodeData: {},
    editFormVisible: Boolean
  },
  mounted() {
  },
  created() {
  },
  watch: {

  },

  methods: {
    submit() {
      this.$emit('handleSubmit', this.nodeData)
    },
    close() {
      this.$emit('closeEditForm')
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
