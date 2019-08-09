<template>
  <div class="app-container">
      <el-table
      :data="data"
      v-loading="listLoading"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        type="selection"
        width="30"/>
      <el-table-column
        prop="parentName"
        label="上级">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="别名">
      </el-table-column>
      <el-table-column
        prop="code"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column label="操作"  width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAdd(scope.$index, scope.row)">添加</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditForm @handleSubmit="handleSubmit"
              @closeEditForm="closeEditForm"
              :editFormVisible="editFormVisible"
              :nodeData="editNodeData"/>
  </div>
</template>

<script>
import { fetchTree } from '@/api/menu'
import { remove } from '@/api/menu'
import EditForm from './components/edit'

export default {
  components: {
    EditForm
  },
  data() {
    return {
      data: null,
      listLoading: true,
      editData: {},
      editFormVisible: false,
    }
  },
  created() {
    this.fetchTree()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd(index, row) {
      this.editFormVisible = true;
    },
    handleEdit(index, row) {
      this.editFormVisible = true;
    },
    handleDelete(index, row) {
      this.listLoading = true
      remove().then(response => {
        this.data = response.data
        this.listLoading = false
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (row.isDeleted === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
  },
    fetchTree() {
      this.listLoading = true
      fetchTree().then(response => {
        this.data = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: red;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
