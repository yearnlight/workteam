<template>
  <div class="menuSet">
    <div class="menuSet-tree">
      <div class="menuSet-tree-add">
        <el-button type="primary" plain @click="add">添加一级菜单</el-button>
      </div>

      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree class="menu-tree" :expand-on-click-node="false" :data="menuList" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{'dryAsh':data.isHide}">{{ data.title ? data.title : '' }}<span v-if="data.isHide && node" class="dryAsh-flag">[隐藏]</span></span>
          <el-dropdown size="mini" @command="(e) => handleCommand(e, data)">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="append">添加子菜单</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-operation" command="order">调整顺序</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" command="remove" divided>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-tree>
    </div>
    <div class="menuSet-content"></div>

    <el-dialog :visible.sync="isForm" @close="onClose" :title="`${operateName}菜单`">
      <el-form ref="menuForm" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入菜单名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="formData.path" placeholder="请输入菜单路径" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input v-model="formData.icon" placeholder="请输入菜单图标" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="isHide" required>
          <el-switch v-model="formData.isHide" :active-value='1' :inactive-value='0'></el-switch>
        </el-form-item>
        <el-form-item label="是否开放" prop="isWhite" required>
          <el-switch v-model="formData.isWhite" :active-value='1' :inactive-value='0'></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isOrder" title="调整顺序">
      <el-form ref="menuForm" :model="orderData" size="small" label-width="100px">
        <el-form-item label="菜单顺序" prop="title">
          <el-input v-model.number="orderData.order" placeholder="请输入菜单顺序" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isOrder = false;">取消</el-button>
        <el-button type="primary" @click="saveOrder">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isOrder: false,
      orderData: {
        order: 0
      },
      filterText: '',
      isForm: false,
      formData: {
        title: undefined,
        path: undefined,
        icon: undefined,
        isHide: 0,
        isWhite: 0,
        remark: undefined,
      },
      rules: {
        title: [{
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur'
        }],
        path: [{
          required: true,
          message: '请输入菜单路径',
          trigger: 'blur'
        }]
      },
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  computed: {
    isAdd() {
      return this.formData.id ? false : true;
    },
    operateName() {
      return this.formData.id ? "编辑" : "添加";
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.fetchMenuList();
  },
  methods: {
    saveOrder() {
      this.$axios.post("/menu/set-order", this.orderData).then(res => {
        if (res.status == 200) {
          this.$message.success("调整菜单顺序成功");
          this.fetchMenuList();
          this.isOrder = false;
        }
        else {
          this.$message.error("调整菜单顺序失败");
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    fetchMenuList() {
      let that = this;
      this.$axios.post("/menu/list").then(res => {
        if (res.status == 200) {
          let menuList = res.data.records;
          that.menuList = menuList;
        }
      })
    },
    add(pid) {
      this.formData.pid = undefined;
      this.isForm = true;
    },
    handleCommand(command, item) {
      switch (command) {
        case "append":
          this.append(item);
          break;
        case "remove":
          this.remove(item);
          break;
        case "edit":
          this.edit(item);
          break;
        case "order":
          this.order(item);
          break;
      }
    },
    append(item) {
      this.formData.pid = item.id;
      this.isForm = true;
    },
    remove(item) {
      this.$confirm(`你确定删除菜单【${item.title}】?`, "删除").then(() => {
        this.$axios.post("/menu/delete", { id: item.id }).then(res => {
          if (res.status == 200) {
            this.$message.success("删除菜单成功");
            this.fetchMenuList();
          }
          else {
            this.$message.error("删除菜单失败");
          }
        })
      })
    },
    onClose() {
      this.formData = {
        title: undefined,
        path: undefined,
        icon: undefined,
        isHide: 0,
        isWhite: 0,
        remark: undefined,
      }
      this.$refs['menuForm'].resetFields()
    },
    close() {
      this.isForm = false;
    },
    edit(item) {
      this.isForm = true;
      this.formData = this.$util.deepCopy(item);
    },
    order(item) {
      this.isOrder = true;
      this.orderData.order = item.order ? item.order : 0;
      this.orderData.id = item.id;
    },
    save() {
      let that = this;
      this.$refs['menuForm'].validate(valid => {
        if (!valid) return
        let url = this.isAdd ? "/menu/add" : "/menu/update";
        this.$axios.post(url, that.formData).then(res => {
          if (res.status == 200) {
            this.$message.success(`${this.operateName}菜单成功`)
            this.fetchMenuList();
          }
          else {
            this.$message.error(res.msg || `${this.operateName}菜单失败`)
          }
          this.close()
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.menuSet {
  display: flex;
  &-tree {
    width: 250px;
    &-add {
      display: flex;
      margin-bottom: 10px;
      .el-button {
        margin-left: auto;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      padding-right: 8px;
      .el-dropdown {
        font-size: 13px;
      }
      .dryAsh {
        color: #c0c4cc;
        &-flag {
          color: #e6a23c99;
          margin-left: 3px;
          font-size: 10px;
          transform: scale(0.5);
        }
      }
    }
  }
  &-content {
    flex: 1;
  }
}
</style>