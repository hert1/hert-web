<template>
  <div class="app-container">
    <el-dialog title="菜单" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="cache_data"  :label-width="formLabelWidth" ref="refForm" :rules="rules" >
        <el-form-item label="主键" style="display: none"  >
          <el-input v-model="cache_data.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: " >
          <treeselect v-model="cache_data.parentId" :normalizer="normalizer"  :options="now_options" />
        </el-form-item>
        <el-form-item label="名称: " prop="name">
          <el-input v-model="cache_data.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型: " prop="category" >
          <el-select v-model="cache_data.category" placeholder="请选择" style="width: 100%">
            <el-option label="菜单" value= 1> </el-option>
            <el-option label="按钮" value= 2> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号: " >
          <el-input v-model="cache_data.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径: " >
          <el-input v-model="cache_data.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源: " >
          <el-input v-model="cache_data.source" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="icon: " >
          <el-input v-model="cache_data.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否缓存: " >
          <el-select v-model="cache_data.isCache"  :key="cache_data.isCache" placeholder="请选择" style="width: 100%">
            <el-option label="是" value= 1 > </el-option>
            <el-option label="否" value= 2> </el-option>
          </el-select>
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
      cache_data: {},
    };
  },
  props: {
    data: {},
    editFormVisible: Boolean,
    options: {type: Array}
  },

  watch: {
    data(new_val, old_val) {
      this.cache_data = JSON.parse(JSON.stringify(new_val))
    }
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
