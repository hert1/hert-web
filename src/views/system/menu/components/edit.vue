<template>
  <div class="app-container">
    <el-dialog title="菜单" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="menuData"  :label-width="formLabelWidth" ref="refForm" :rules="rules" >
        <el-form-item label="主键" style="display: none"  >
          <el-input v-model="menuData.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: " >
          <treeselect v-model="menuData.parentId" :normalizer="normalizer"  :options="now_options" />
        </el-form-item>
        <el-form-item label="名称: " prop="name">
          <el-input v-model="menuData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型: " prop="category" >
          <el-select v-model="menuData.category" placeholder="请选择" style="width: 100%">
            <el-option label="菜单" value= 1> </el-option>
            <el-option label="按钮" value= 2> </el-option>
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
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      formLabelWidth: '15%',
      now_options: [{name: '顶级', id: 0 }],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '请选择类型', trigger: 'blur' },
        ],
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
    };
  },
  props: {
    menuData: {},
    editFormVisible: Boolean,
    options: []
  },

  watch: {
  },

  mounted() {

  },

  created() {
    this.now_options = this.options
  },

  methods: {
    submit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.menuData)
        } else {
          return false;
        }
      });
    },
    close() {
      this.$refs.refForm.resetFields();
      this.$emit('closeEditForm')
    }
  }
}
</script>

<style>

</style>
