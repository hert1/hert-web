<template>
  <div class="app-container">
    <el-dialog title="部门" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="cache_data"  :label-width="formLabelWidth" ref="refForm" :rules="rules" >
        <el-form-item label="主键" style="display: none"  >
          <el-input v-model="data.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: " >
          <treeselect v-model="cache_data.parentId" :normalizer="normalizer"  :options="options" />
        </el-form-item>
        <el-form-item label="简称: " prop="deptName">
          <el-input v-model="cache_data.deptName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="全称: " >
          <el-input v-model="cache_data.fullName" prop="fullName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序: " >
          <el-input v-model="cache_data.sort" prop="sort" auto-complete="off"></el-input>
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
          label: node.deptName,
          children: node.children,
        }
      },
      cache_data: {},
    };
  },
  props: {
    data: {},
    editFormVisible: Boolean,
    options: null,
  },

  watch: {
    data(new_val, old_val) {
      this.cache_data = JSON.parse(JSON.stringify(new_val))
    }
  },

  mounted() {

  },

  created() {
  },

  methods: {
    submit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.cache_data)
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
