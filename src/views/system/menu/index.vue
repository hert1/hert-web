<template>
  <div class="app-container">
    <el-button
      size="mini"
      @click="handleAdd(0, {'id': 0, name: '顶级'})">添加</el-button>
      <el-table
      :data="data"
      v-loading="listLoading"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :row-class-name="tableRowClassName"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="parentName"
        label="上级"
        width="150">
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
          prop="source"
          label="资源">
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
              :options="data"
              :menuData="editMenuData"/>
  </div>
</template>

<script>
import { fetchTree, remove, submit } from '@/api/menu'
import { treeToArray } from '@/utils/index'
import EditForm from './components/edit'

export default {
  components: {
    EditForm
  },
  data() {
    return {
      data: Object,
      confirmVisible: false,
      listLoading: true,
      editData: Object,
      editMenuData: Object,
      editFormVisible: false,
    }
  },
  created() {
    this.fetchTree()
  },
  methods: {
    closeEditForm() {
      this.editFormVisible = false;
    },
    handleSubmit(value) {
      submit(value).then(response => {
        this.editFormVisible = false;
        this.fetchTree()
      })
    },
    handleSelectionChange(val) {
      return selectRow = treeToArray([], val);
    },
    handleAdd(index, row) {
      this.editFormVisible = true;
      this.editMenuData = {'parentId': row.id, parentName: row.name};
    },
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editMenuData = row;
    },
    handleDelete(index, row) {
      const selectRow = treeToArray([], row.children);
      let ids = [row.id];
      selectRow && selectRow.map(item => ids.push(item.id))
      this.$confirm('此操作将删除该菜单下的所有菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        remove(ids.toString()).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetchTree()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
