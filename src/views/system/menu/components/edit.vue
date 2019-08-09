<template>
  <div class="app-container">
    <el-dialog title="编辑菜单" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="menuData"  :label-width="formLabelWidth">
        <el-form-item label="主键"  style="display: none" >
          <el-input v-model="menuData.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级主键" style="display: none" >
          <el-input v-model="menuData.parentId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: "  >
          <el-input readonly v-model="menuData.parentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称: " >
          <el-input v-model="menuData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名: "  >
          <el-select v-model="menuData.alias" placeholder="请选择" style="width: 100%">
            <el-option label="菜单" value="menu" />
            <el-option label="按钮" value="button" />
          </el-select>
        </el-form-item>
        <el-form-item label="编号: " >
          <el-input v-model="menuData.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径: " >
          <el-input v-model="menuData.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源: " >
          <el-input v-model="menuData.source" auto-complete="off"></el-input>
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
      formLabelWidth: '15%'
    }
  },
  props: {
    options: Object,
    menuData: Object,
    editFormVisible: Boolean
  },

  watch: {

  },

  mounted() {
  },

  created() {
  },

  methods: {
    submit() {
      this.$emit('handleSubmit', this.menuData)
    },
    close() {
      this.$emit('closeEditForm')
    }
  }
}
</script>

<style>

</style>
