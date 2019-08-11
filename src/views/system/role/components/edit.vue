<template>
  <div class="app-container">
    <el-dialog title="角色" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="nodeData" ref="refForm" :rules="rules">
        <el-form-item label="主键" :label-width="formLabelWidth" style="display: none">
          <el-input v-model="nodeData.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级主键" :label-width="formLabelWidth" style="display: none">
          <el-input v-model="nodeData.parentId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级" :label-width="formLabelWidth">
          <el-input v-model="nodeData.parentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="nodeData.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色别名" :label-width="formLabelWidth" prop="roleAlias">
          <el-input v-model="nodeData.roleAlias" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <treeselect v-model="nodeData.permissions" :multiple="true" :normalizer="normalizer"  :options="options" />
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
 import Treeselect from '@riophae/vue-treeselect'
 import '@riophae/vue-treeselect/dist/vue-treeselect.css'
 import { fetchTree} from '@/api/menu'
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      formLabelWidth: '15%',
      options: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleAlias: [
          { required: true, message: '请输入角色别名', trigger: 'blur' },
        ],
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children,
        }
      },
    }
  },
  props: {
    nodeData: {},
    editFormVisible: Boolean
  },

  watch: {

  },

  mounted() {
  },

  created() {
    this.fetchTree()
  },

  methods: {
    fetchTree() {
        fetchTree().then(response => {
          this.data = response.data
          response.data.map(item => this.options.push(item))
        })
    },
    submit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.nodeData)
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
