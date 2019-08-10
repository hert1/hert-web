<template>
  <div class="app-container">
    <el-card v-if="!nodeInfoVisible" class="box-card" v-loading="treeDataLoading">
      <div slot="header" class="clearfix">
        <span>role-organization</span>
        <el-button style="float: right; padding: 3px 3px" type="text" @click="remove">remove</el-button>
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
            size="mini"
            @click="() => handleClickView(data)">
            查看
          </el-button>
        </span>
      </span>
      </el-tree>
    </el-card>
    <Info v-if="nodeInfoVisible" :nodeData="nodeData" @closeNodeDisplay="closeNodeDisplay" />
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
      },
    }
  },
  created() {
    this.fetchTreeData()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    handleClickView(data) {
      this.nodeData = data; this.nodeInfoVisible = true
    },
    closeNodeDisplay() {
      this.nodeInfoVisible = false;
      this.fetchTreeData();
    },
    remove() {
      const ids = this.$refs.tree.getCheckedKeys();
      remove(ids.toString()).then(response => {
        this.fetchTreeData()
      })
    },
    fetchTreeData() {
      this.treeDataLoading = true
      fetchTree().then(response => {
        this.treeData = response.data
        this.treeDataLoading = false
      })
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
