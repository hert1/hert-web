<template>
  <div class="app-container">
    <el-button type="primary" round icon="el-icon-plus"
      @click="handleAdd(0, {'id': 0, name: '顶级'})" style="margin-bottom: 20px">添加</el-button>
    <el-button style="float: right;margin-top: 10px" round size="mini" icon="el-icon-refresh"
               @click="fetchTree()"></el-button>
      <el-table
      :data="data"
      ref="multipleTable"
      v-loading="listLoading"
      style="width: 100%;margin-bottom: 20px;"
      tooltip-effect="dark"
      row-key="id"
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
        prop="category"
        label="类型">
        <template slot-scope="scope">
          <span v-html="scope.row.category === 1 ? 'menu' : 'button'"></span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        prop="code"
        label="编号">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        prop="path"
        label="路径">
      </el-table-column>
        <el-table-column
          :show-overflow-tooltip='true'
          prop="source"
          label="资源">
        </el-table-column>
      <el-table-column label="操作"  width="150">
        <template slot-scope="scope">
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
              :options="options"
              :data="editData"/>
  </div>
</template>

<script>
import { fetchTree, remove, submit } from '@/api/menu'
import { generateList, } from '@/utils/index'
import EditForm from './components/edit'

export default {
  components: {
    EditForm
  },
  data() {
    return {
      options: [],
      data: [],
      confirmVisible: false,
      listLoading: true,
      editData: {},
      editFormVisible: false,
    }
  },
  created() {
    this.fetchTree()
  },
  methods: {
    closeEditForm() {
      this.editFormVisible = false;
      this.editData = {}
    },
    handleSubmit(value) {
      submit(value).then(response => {
        this.$message({
          type: 'success',
          message: response.message || '操作成功'
        });
        this.editFormVisible = false;
        this.fetchTree()
      }).catch(error => {this.editFormVisible = false;})
    },
    handleAdd(index, row) {
      this.editFormVisible = true;
      this.editData = {'parentId': row.id, parentName: row.name};
    },
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editData = row;
    },
    handleDelete(index, row) {
      const selectRow = generateList(row.children);
      let ids = [row.id];
      selectRow && selectRow.map(item => ids.push(item.id))
      this.$confirm('此操作将删除该菜单下的所有菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        remove(ids).then(response => {
          this.$message({
            type: 'success',
            message: response.message || '操作成功'
          });
          this.fetchTree()
        }).catch(() => {  this.listLoading = false;})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    tableRowClassName({row, rowIndex}) {
      if (row.category === 1) {
        return 'menu';
      } else if (row.category === 2) {
        return 'button';
      }
      return '';
  },
    fetchTree() {
      this.listLoading = true
      this.options = [{name: '顶级', id: 0 }],
      fetchTree().then(response => {
        this.data = response.data
        response.data.map(item => this.options.push(item))
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
  .el-table .menu {
    background: #F2F6FC;
  }

  .el-table .button {
    background: #EBEEF5;
  }
</style>
