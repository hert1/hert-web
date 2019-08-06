<template>
  <div class="app-container">
    <el-card v-if="!nodeInfoVisible" class="box-card">
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
          highlight-current
          node-key="id"
          default-expand-all
          :render-content="renderContent"
        />
    </el-card>
    <Info @closeNodeDisplay="closeNodeDisplay" v-if="nodeInfoVisible" :nodeData="nodeData"/>
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
      nodeInfoVisible: false,
      nodeData: '',
      treeData: null,
      treeDataLoading: true,
      props: {
        label: 'roleName'
      }
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
    closeNodeDisplay() {
      this.nodeInfoVisible = false;
      this.fetchTreeData();
    },
    renderContent(h, { node, data, store }) {
        return(
        <span
          style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              style='font-size: 12px'
              type='text' on-click={ () => {this.nodeData = data, this.nodeInfoVisible = true} }>view</el-button>
          </span>
        </span>)
    },
    remove() {
      const ids = this.$refs.tree.getCheckedKeys();
      remove(ids.toString()).then(response => {
        this.fetchTreeData()
      })
    },
    fetchTreeData() {
      this.listLoading = true
      fetchTree().then(response => {
        this.treeData = response.data
        this.treeDataLoading = false
      })
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
