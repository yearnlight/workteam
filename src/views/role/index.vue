<template>
  <div class="role">
    <v-table :name="name" v-loading="loading" :searchConfig="searchConfig" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search">
      <template>
        <el-button icon="el-icon-plus" type="primary" @click="add">添加</el-button>
      </template>
    </v-table>

    <el-dialog :visible.sync="isForm" @close="onClose" :title="`${isAdd?'新增':'编辑'}角色`">
      <el-form ref="roleForm" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="enName">
          <el-input v-model="formData.enName" placeholder="请输入英文名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-radio-group v-model="formData.level" size="medium">
            <el-radio v-for="(item, index) in levelOptions" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
          </el-radio-group>
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

    <el-dialog @opened="onOpenedMenu" :visible.sync="isMenu" @close="onCloseMenu" :title="`设置菜单权限`">
      <div v-loading="treeLoading">
        <el-tree node-key="id" show-checkbox class="menu-tree" :expand-on-click-node="false" :data="menuList" :props="defaultProps" default-expand-all ref="tree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span :class="{'dryAsh':data.isHide}">{{ data.title ? data.title : '' }}<span v-if="data.isHide && node" class="dryAsh-flag">[隐藏]</span></span>
          </span>
        </el-tree>
      </div>
      <div slot="footer">
        <el-button @click="closeMenu">取消</el-button>
        <el-button type="primary" @click="saveMenu">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vTable from "@/components/vTable"
// 角色管理
export default {
  name: 'role',
  components: { vTable },
  data() {
    return {
      name: "role",
      loading: false,
      list: {
        records: [{ "name": "超级管理员", "enName": "super", "level": "全系统", "remark": "最大权限", "createtime": "2021-01-30 16:15:27" }],
        total: 0
      },
      inputParams: {
        page: 1,
        limit: 10
      },
      isForm: false,
      isMenu: false,
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      columns: [{ "prop": "name", "label": "名称" }, { "prop": "enName", "label": "英文名称", "width": "" }, {
        "prop": "level", "label": "级别", "isEnum": true,
        "enums": {
          "1": {
            "label": "全系统级别",
            "type": "warning",
            "component": "tag"
          },
          "2": {
            "label": "业务组级别",
            "type": "success",
            "component": "tag"
          },
          "3": {
            "label": "游客级别",
            "type": "primary",
            "component": "tag"
          }
        }
      }, { "prop": "remark", "label": "备注" }, { "prop": "createtime", "label": "创建时间" }, { "prop": "uuid", "label": "操作", "isOperate": true, "operateFun": [{ "function": "del", "label": "删除", "icon": "" }, { "prop": "", "label": "编辑", "function": "edit" }, { "prop": "", "label": "菜单权限", "function": "setMenu" }] }],
      tableConfig: { "setting": true, "pagination": false, "isPublic": true, "pageSize": 10, "type": null },
      searchConfig: { "labels": [{ "name": "名称", "field": "name", "value": "", "type": "input", "connector": "0", "hide": false }], "btns": [{ "name": "查询", "click": "" }], "inputParams": {} },
      formData: {
        name: undefined,
        enName: undefined,
        level: 3,
        remark: undefined,
      },
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        enName: [{
          required: true,
          message: '请输入英文名称',
          trigger: 'blur'
        }],
        level: [{
          required: true,
          message: '等级不能为空',
          trigger: 'change'
        }],
      },
      levelOptions: [{
        "label": "全系统级别",
        "value": 1
      }, {
        "label": "普通用户",
        "value": 2
      }, {
        "label": "游客",
        "value": 3
      }],
      row: null,
      treeLoading: false
    }
  },
  computed: {
    isAdd() {
      return this.formData.id ? false : true;
    }
  },
  created() {
    this.search();
  },
  methods: {
    search(params) {
      this.$axios.post("/role/list", params).then(res => {
        if (res.status == 200) {
          this.list = res.data;
        }
      })
    },
    del(item, index) {
      this.$confirm(`你确定删除此项 ?`, "删除").then(() => {
        this.$axios.post("/role/delete", { id: item.id }).then(res => {
          if (res.status == 200) {
            this.$message.success("删除角色成功")
            this.search();
          }
          else {
            this.$message.error("删除角色失败")
          }
        })
      })
    },
    edit(item, index) {
      this.isForm = true;
      this.formData = this.$util.deepCopy(item);
    },
    setMenu(item, index) {
      this.isMenu = true;
      this.row = this.$util.deepCopy(item)
    },
    saveMenu() {
      let roleId = this.row.id;
      let menuIds = this.$refs.tree.getCheckedKeys()
      let menuHalfIds = this.$refs.tree.getHalfCheckedKeys()
      this.$axios.post("/role/set-menus", { roleId, menuIds, menuHalfIds }).then(res => {
        this.isMenu = false;
        if (res.status == 200) {
          this.$message.success("设置菜单成功")
        }
        else {
          this.$message.error("设置菜单失败")
        }
      })
    },
    info(item, index) {
      // 跳入详情
      this.$router.push({ path: "/work/role_detail" })
    },
    add() {
      this.isForm = true;
    },
    onClose() {
      this.$refs['roleForm'].resetFields()
    },
    close() {
      this.isForm = false;
    },
    onCloseMenu() {

    },
    onOpenedMenu() {
      this.$refs.tree.setCheckedKeys([])
      this.treeLoading = true;
      this.$axios.post("/menu/list").then(res => {
        if (res.status == 200) {
          this.menuList = res.data.records;
        }
      }).then(() => {
        this.$axios.post("/role/get-menus", { roleId: this.row.id }).then(res => {
          if (res.status == 200) {
            if (res.data && res.data.length) {
              this.$refs.tree.setCheckedKeys(res.data.map(m => m.menuId));
            }
          }
          this.treeLoading = false;
        }).catch(err => {
          this.treeLoading = false;
        })
      }).catch(err => {
        this.treeLoading = false;
      })
    },
    closeMenu() {
      this.isMenu = false;
    },
    save() {
      this.$refs['roleForm'].validate(valid => {
        if (!valid) return
        let url = this.isAdd ? "/role/add" : "/role/update"
        this.$axios.post(url, this.formData).then(res => {
          if (res.status == 200) {
            this.$message.success(`${this.isAdd ? "新增" : "编辑"}角色成功`);
            this.search();
          }
          else {
            this.$message.error(`${this.isAdd ? "新增" : "编辑"}角色失败`);
          }
          this.close()
        })

      })
    },
  }
}
</script>

<style lang="scss">
.role {
}
</style>