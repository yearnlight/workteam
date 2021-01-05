<template>
  <div class="store">
    <div class="store-title"><span>应用服务</span>
      <el-button type="primary" icon="el-icon-plus" @click="create">添加服务</el-button>
    </div>
    <div class="store-content">
      <card :stores="stores" v-on:handDelete="handDelete"></card>
    </div>
    <el-dialog :visible.sync="isAdd" @close="onClose" title="添加应用服务" :close-on-click-modal="false">
      <el-form ref="storeForm" :model="formData" :rules="rules" size="small" label-width="120px" name="storeForm">
        <el-form-item label="应用服务名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入应用服务名称" clearable :maxlength="10" show-word-limit :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="href">
          <el-input v-model="formData.href" placeholder="请输入链接地址" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="服务Logo Url" prop="icon">
          <el-input v-model="formData.icon" placeholder="请输入服务Logo Url（可不填）" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-select v-model="formData.label" placeholder="请选择标签" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in labelOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题颜色" prop="color" required>
          <el-color-picker v-model="formData.color" size="small"></el-color-picker>
        </el-form-item>

        <el-form-item label="创建者" prop="creator">
          <el-input v-model="formData.creator" placeholder="请输入创建者" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="desc">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入描述" :maxlength="256" show-word-limit :autosize="{minRows: 2, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save('storeForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import card from "./card";
export default {
  components: { card },
  data() {
    return {
      isAdd: false,
      formData: {
        color: null
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入应用服务名称",
            trigger: "blur"
          }
        ],
        href: [
          {
            required: true,
            message: "请输入链接地址",
            trigger: "blur"
          }
        ],
        label: [
          {
            required: true,
            message: "请选择标签",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur"
          }
        ]
      },
      labelOptions: [
        {
          label: "工具",
          value: "工具"
        },
        {
          label: "素材",
          value: "素材"
        },
        {
          label: "业务",
          value: "业务"
        }
      ],
      stores: []
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      this.$axios.post("/store/list").then(res => {
        if (res.status == 200) {
          this.stores = res.data;
        }
      });
    },
    handDelete(name) {
      this.list();
    },
    create() {
      this.isAdd = true;
    },
    onClose() {
      this.$refs["storeForm"].resetFields();
    },
    close() {
      this.isAdd = false;
    },
    save() {
      this.$refs["storeForm"].validate(valid => {
        if (!valid) return;
        this.$axios.post("/store/create", this.formData).then(res => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.list();
            this.close();
          } else {
            this.$message.error("添加应用服务失败");
          }
        });
      });
    }
  }
};
</script>
<style lang="scss">
.store {
  &-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  &-content {
  }
}
</style>
