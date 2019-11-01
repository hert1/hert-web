<template>
  <div class="app-container">
    <el-card v-if="!nodeInfoVisible" class="box-card" v-loading="treeDataLoading">
      <div slot="header" class="clearfix">
        <span><el-button type="success">角色树</el-button></span>
        <el-button size="large" style="float: right; padding: 3px 3px" type="danger" icon="el-icon-delete" circle @click="remove"></el-button>
      </div>
      <el-tree
        ref="tree"
        :data="treeData"
        :props="props"
        class="filter-tree"
        show-checkbox
        node-key="id"
        :expand-on-click-node="false"
        default-expand-all>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="float: right">
          <el-button
            type="text"
            @click="() => handleClickView(data)">
            详情
          </el-button>
        </span>
      </span>
      </el-tree>
    </el-card>
    <Info v-if="nodeInfoVisible" :nodeData="nodeData" @closeNodeDisplay="closeNodeDisplay"/>
  </div>
</template>

<script>

import { fetchTree, remove } from '@/api/role'
import Info from './components/info'

export default {

  components: {
    Info
  },
  data() {
    return {
      treeData: null,
      treeDataLoading: true,
      nodeInfoVisible: false,
      props: {
        label: 'roleName'
      }
    }
  },
  created() {
    this.fetchTreeData()
  },
  watch: {
  },

  methods: {
    handleClickView(data) {
      this.nodeData = data; this.nodeInfoVisible = true
    },
    closeNodeDisplay() {
      this.nodeInfoVisible = false
      this.fetchTreeData()
    },
    remove() {
      const ids = this.$refs.tree.getCheckedKeys()
      if (!ids.length) return
      remove(ids).then(response => {
        this.$message({
          type: 'success',
          message: response.message || '操作成功'
        })
        this.fetchTreeData()
      }).catch(() => { this.treeDataLoading = false })
    },
    fetchTreeData() {
      this.treeDataLoading = true
      fetchTree().then(response => {
        this.treeData = response.data
        this.treeDataLoading = false
      }).catch(() => { this.treeDataLoading = false })
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
