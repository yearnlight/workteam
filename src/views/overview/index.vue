<template>
  <div class="overviewList">
    <v-table :name="name" v-loading="loading" :searchConfig="searchConfig" :tableConfig="tableConfig" :columns="columns" :data="list" @del="del" @edit="edit" @search="search">
      <template>
        <el-button type="primary" icon="el-icon-plus" @click="create">添加</el-button>
      </template>
    </v-table>

    <el-dialog :title="overviewForm.id?'编辑':'创建'" :visible.sync="isOperate" @close="closeOperate" @open="openOperate" custom-class="operateOverview">
      <el-form :model="overviewForm" ref="overviewForm" :rules="rules" label-width="120px">
        <el-form-item label>
          <div class="reminder">
            创建、编辑概览基本信息，详细配置请操作<span class="high">概览配置</span>
          </div>
        </el-form-item>
        <el-form-item label="概览标题" prop="title">
          <el-input v-model="overviewForm.title" placeholder="请输入概览标题"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="overviewForm.type">
            <el-radio label="overview">概览</el-radio>
            <el-radio label="bigscreen">大屏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目" prop="project">
          <el-input v-model="overviewForm.project" placeholder="请输入项目"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="overviewForm.remark" type="textarea" maxlength="255" show-word-limit placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="creator">
          <el-select :disabled="overviewForm.id?true:false" filterable v-model="overviewForm.creator" placeholder="请选择创建者" clearable>
            <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
              <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOperate = false">取 消</el-button>
        <el-button type="primary" @click="save('overviewForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vTable from "@/components/vTable"
// 概览列表
export default {
  name: 'overview',
  components: { vTable },
  data() {
    return {
      name: "overview",
      isOperate: false,
      userList: [],
      overviewForm: {
        title: undefined,
        type: "overview",
        project: undefined,
        creator: undefined
      },
      rules: {
        title: [{ required: true, message: '请输入概览标题', trigger: 'blur' }],
        project: [{ required: true, message: '请输入项目', trigger: 'blur' }]
      },
      loading: false,
      list: {
        records: [],
        total: 0
      },
      inputParams: {
        page: 1,
        limit: 10
      },
      columns: [{ "prop": "title", "label": "概览标题" }, { "prop": "project", "label": "项目", "width": "", "isEnum": false }, {
        "prop": "type", "label": "类型", "isEnum": true,
        "enums": {
          "overview": {
            "label": "概览",
            "type": "success",
            "component": "tag"
          },
          "bigscreen": {
            "label": "大屏",
            "type": "info",
            "component": "tag"
          }
        }
      }, { "prop": "remark", "label": "备注" }, { "prop": "createtime", "label": "创建时间" }, { "prop": "updatetime", "label": "更新时间" }, { "prop": "creator", "label": "创建者" }, { "prop": "updator", "label": "更新者" }, { "prop": "id", "label": "操作", "width": 160, "isOperate": true, "operateFun": [{ "function": "config", "label": "配置", "icon": "" }, { "prop": "", "label": "编辑", "function": "edit" }, { "prop": "", "label": "删除", "function": "del" }] }],
      tableConfig: { "setting": true, "pagination": true, "isPublic": true, "pageSize": 10, "type": null },
      searchConfig: { "labels": [{ "name": "概览标题", "field": "title", "value": "", "type": "input", "connector": "0", "hide": false, "placeholder": "请输入概览标题" }], "btns": [{ "name": "查询", "click": "" }], "inputParams": {} }
    }
  },
  created() {
    this.search();
  },
  methods: {
    getUserList() {
      return this.$axios.get("/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openOperate() {
      this.getUserList();
    },
    closeOperate() {
      this.$refs['overviewForm'].clearValidate();
      this.overviewForm = {
        title: undefined,
        type: "overview",
        project: undefined,
        creator: undefined
      }
    },
    search(params) {
      if (params) this.inputParams = params;
      this.loading = true;
      this.$axios.post("/bigscreen/list", params).then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.list = res.data;
        }
      })
    },
    del(item, index) {
      this.$confirm(`你确定删除此项 ?`, "删除").then(() => {
        this.$axios.post("/bigscreen/delete", { id: item.id }).then(res => {
          if (res.status == 200) {
            this.$message.success("删除大屏概览项成功");
            this.search();
          }
          else {
            this.$message.error("删除大屏概览项失败");
          }
        })
      })
    },
    edit(item, index) {
      this.isOperate = true;
      this.overviewForm = item;
    },
    config(item, index) {
      if (item.type == "overview") {
        this.$router.push({ path: "/overview", query: { id: item.id, title: item.title } })
      }
      else {
        this.$router.push({ path: "/bigscreen", query: { id: item.id, title: item.title } })
      }

    },
    create() {
      this.isOperate = true;
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let apiUrl = this.overviewForm.id ? "/bigscreen/update" : "/bigscreen/create";
          this.$axios.post(apiUrl, this.overviewForm).then(res => {
            if (res.status == 200) {
              this.$message.success("操作大屏概览项成功");
              this.isOperate = false;
              this.search();
            }
            else {
              this.$message.error("操作大屏概览项失败");
            }
          })

        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.overviewList {
}
</style>