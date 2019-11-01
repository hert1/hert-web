<template>
  <div class="app-container">
    <el-dialog title="用户" :visible.sync="editFormVisible" :before-close='close'>
      <el-form :model="cache_data" :label-width="formLabelWidth" ref="refForm" :rules="rules">
        <el-form-item label="主键" style="display: none">
          <el-input v-model="cache_data.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: " style="display: none">
          <el-input v-model="cache_data.parentId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级: ">
          <el-input v-model="cache_data.parentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="cache_data.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称: " prop="deptName">
          <el-input v-model="cache_data.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真名: ">
          <el-input v-model="cache_data.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别: ">
          <el-select v-model="cache_data.sex" placeholder="请选择" style="width: 100%">
            <el-option label="男" :key=1 value=1></el-option>
            <el-option label="女" :key=2 value=2></el-option>
            <el-option label="保密" :key=3 value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机: ">
          <el-input v-model="cache_data.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="email: ">
          <el-input v-model="cache_data.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色: ">
          <treeselect v-model="cache_data.roles" :multiple="true" :normalizer="roleNormalizer" :options="roleTreeData"/>
        </el-form-item>
        <el-form-item label="部门: ">
          <treeselect v-model="cache_data.depts" :multiple="true" :normalizer="deptNormalizer" :options="deptTreeData"/>
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
  import { fetchTree as deptFetchTree } from '@/api/dept'
  import { fetchTree as roleFetchTree } from '@/api/role'

  export default {
  components: {
    Treeselect
  },
  data() {
    return {
      formLabelWidth: '15%',
      roleTreeData: [],
      deptTreeData: [],
      rules: {
      },
      deptNormalizer(node) {
        return {
          id: node.id,
          label: node.deptName,
          children: node.children
        }
      },
      roleNormalizer(node) {
        return {
          id: node.id,
          label: node.roleName,
          children: node.children
        }
      },
      cache_data: {}
    }
  },
  props: {
    data: {},
    editFormVisible: Boolean
  },

  watch: {
    data(new_val, old_val) {
      this.cache_data = JSON.parse(JSON.stringify(new_val))
    }
  },
  mounted: {

  },

  created() {
    roleFetchTree().then(response => {
      this.roleTreeData = response.data
    })
    deptFetchTree().then(response => {
      this.deptTreeData = response.data
    })
  },

  methods: {
    submit() {
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.cache_data)
        } else {
          return false
        }
      })
    },
    close() {
      this.$refs.refForm.resetFields()
      this.$emit('closeEditForm')
    }
  }
}
</script>

<style>

</style>
