
<template>
  <div class="businessMenu">
    <div class="businessMenu-left">
      <div class="businessMenu-left-operate">
        <el-button type="primary" icon="el-icon-plus" @click="create">创建</el-button>
      </div>
      <el-tree ref="tree" :default-expanded-keys="['fitmgr']" :accordion="true" :data="treeData" node-key="key" :current-node-key="active" :highlight-current="true" :props="defaultProps" @node-click="nodeClick">
        <span class="tree-node" slot-scope="{ node, data }">
          <!-- <svg-icon v-if="data.icon" class="tree-node-icon" :icon-class="data.icon"></svg-icon> -->
          <span>{{ data.name }}</span>
          <span v-if="node.isLeaf && data.project != 'base'">
            <span class="el-icon-delete red" @click.stop.prevent="removeNode(data)"></span>
            <span class="el-icon-edit blue" @click.stop.prevent="editNode(data)"></span>
          </span>

        </span>
      </el-tree>
    </div>

    <div class="businessMenu-right">
      <Model :name="active" :config="activeServer" />
    </div>

  </div>
</template>

<script>
import Model from "./model";
import t_fields from "@/resource/t_fields";
import fields from "@/resource/fields";

export default {
  components: { Model },
  data() {
    return {
      contextMenuTarget: this.$refs["tree"], // 可右键区域，这里也可以绑定$refs
      contextMenuVisible: false,
      isCollapse: false,
      active: "",
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [
        { name: "云管(静态)", key: "base", children: [] },
      ],
      activeServer: {}
    };
  },
  created() {
    let that = this;
    let menus = [];
    // 深度合并fields、t_fields
    let allFields = that.$util.deepMerge(fields, t_fields)
    for (let key in allFields) {
      let item = allFields[key];
      if (item.tableColumns && item.tableColumns.length) {
        menus.push({ key: key, ...item, project: "base" });
      }
    }
    that.treeData[0].children = menus;


    that.fetchServerList();
  },
  methods: {
    fetchServerList() {
      let that = this;
      this.$axios.get("/server-config/list").then(res => {
        if (res.status == 200) {
          let dyncMenus = res.data.records;
          if (dyncMenus && dyncMenus.length) {
            let menus = this.groupBy(dyncMenus)
            menus.forEach(item => {
              that.treeData.push({ name: item.key, key: item.key, children: item.data })
            })

          }
        }
      })
    },
    groupBy(arr) {
      let map = {},
        dest = [];
      for (let i = 0; i < arr.length; i++) {
        var ai = arr[i];
        ai = { key: ai.code, ...ai }
        if (!map[ai.project]) {
          dest.push({
            key: ai.project,
            data: [ai]
          });
          map[ai.project] = ai;
        } else {
          for (let j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.key == ai.project) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    create() {
      // 创建服务配置
      this.$router.push("/work/business_create")
    },
    nodeClick(data, node) {
      if (node.isLeaf) {
        this.active = data.key;
        this.activeServer = data;
      }
    },
    removeNode(data) {
      this.$confirm(`是否删除服务【${data.name}】 ?`, "删除").then(() => {
        this.$axios.post("/server-config/delete", { uuid: data.uuid }).then(res => {
          if (res.status == 200) {
            this.$message.success("删除服务成功");
            this.fetchServerList();
          }
          else {
            this.$message.error("删除服务失败");
          }
        })
      })
    },
    editNode({ uuid }) {
      this.$router.push({ path: "/work/business_edit", query: { id: uuid } })
    }
  }
}
</script>


<style lang="scss">
.businessMenu {
  display: flex;
  &-left {
    width: 200px;
    .tree {
      &-node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        font-size: 13px;
        .blue {
          margin-left: 5px;
        }
        &-icon {
          height: 15px !important;
          width: 15px !important;
          margin-right: 5px;
        }
      }
    }
    .el-tree {
      border-right: none;
      overflow-y: scroll;
      height: calc(100% - 52px);
      &-node {
        &.is-current {
          .el-tree-node__content {
            color: #409eff;
          }
        }
      }
    }
    .remark {
      font-size: 12px;
      color: #999;
      margin-left: 3px;
    }
  }
  &-right {
    flex: 1;
    padding: 10px;
    border-left: 1px solid #eaeefb;
    overflow-y: scroll;
  }
}
</style>