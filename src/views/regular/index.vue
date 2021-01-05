<template>
  <div class="regular">
    <el-scrollbar style="height:100%">
      <div class="regular-header">正则表达式集</div>
      <div class="regular-create">
        <el-button icon="el-icon-plus" plain @click="create">添加正则</el-button>
        <el-input @keyup.enter.native="search" placeholder="请输入匹配目的或标签，支持回车" v-model="searchVal" class="select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div v-if="!(list && list.length)" class="regular-nodata">未搜索到匹配正则信息</div>
      <el-card v-else v-for="(item,index) in list" :key="index" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
          <el-button @click="doCopy(item.expression)" style="float: right; padding: 3px 0" type="text">复制表达式</el-button>
        </div>
        <div class="regular-express">
          正则表达式：
          <span class="blue">{{item.expression}}</span>
        </div>
        <div class="regular-exam">
          <span class="label">测试匹配:</span>
          <el-input v-model="item.example" @input="(v)=>{test(v,item)}" class="input" size="small"></el-input>
          <span :class="[{'green':item.result&&item.result.includes('通过'),'red':item.result&&item.result.includes('失败')},'result']">{{item.result}}</span>
        </div>
        <div class="regular-label">
          <el-tag v-for="(tag,tindex) in item.label&&item.label.split(',')" :key="tindex">{{tag}}</el-tag>
        </div>
        <div class="regular-create blue">{{item.creater}} 创建于{{item.createtime | DateTime}}</div>
      </el-card>
    </el-scrollbar>

    <el-dialog title="创建正则" custom-class="regularCreate" :visible.sync="isCreate">
      <div class="tip">约束较松散，创建时尽量按照规则。标签可以约束行业、验证目的、类型等。测试数据会实时校验，校验通过方可创建。</div>
      <el-form :rules="rules" ref="createRegular" :model="form" label-width="140px">
        <el-form-item label="正则匹配目的" prop="name" required>
          <el-input size="small" maxlength="100" placeholder="请描述清楚正则表达式匹配目的" show-word-limit v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正则表达式" prop="expression" required>
          <el-input size="small" maxlength="200" placeholder="请填写正则表达式,例如：\w" show-word-limit v-model="form.expression" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="测试数据" prop="test" required>
          <el-input @input="textExam" size="small" maxlength="100" placeholder="输入测试数据保证正则表达式验证通过" show-word-limit v-model="form.test" autocomplete="off"></el-input>
          <span :class="[{'green':form.result&&form.result.includes('通过'),'red':form.result&&form.result.includes('失败')},'result']">{{form.result}}</span>
        </el-form-item>
        <el-form-item label="创建者" prop="creater">
          <el-input size="small" maxlength="30" placeholder="请填写创建者" show-word-limit v-model="form.creater" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正则验证数据类型" required>
          <el-select size="small" v-model="form.type" placeholder="请数据类型">
            <el-option label="字符串" value="string"></el-option>
            <el-option label="整数" value="int"></el-option>
            <el-option label="小数" value="float"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="labels" required>
          <el-tag :key="tag" v-for="tag in form.labels" closable :disable-transitions="false" @close="closeTag(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="inputConfirm" @blur="inputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="isCreate = false">取 消</el-button>
        <el-button size="small" type="primary" @click="save('createRegular')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from "@/utils/index";
export default {
  data() {
    return {
      searchVal: "",
      isCreate: false,
      inputVisible: false,
      inputValue: "",
      copyMessage: "",
      rules: {
        name: [{ required: true, message: "正则匹配目的必填" }],
        expression: [
          { required: true, message: "正则表达式必填" },
          { pattern: /^[^\u4e00-\u9fa5]+$/, message: "表达式不支持中文" },
        ],
        test: [{ required: true, message: "测试数据必填" }],
        labels: [{ required: true, message: "标签必填" }],
      },
      form: {
        name: "",
        expression: "",
        type: "string",
        test: "",
        labels: [],
        result: "",
        creater: "",
      },
      backupForm: {},
      backupList: [],
      list: [],
    };
  },
  created() {
    this.getList().then(() => {
      this.backupList = util.deepCopy(this.list);
    });
    this.backupForm = util.deepCopy(this.form);
  },
  filters: {
    DateTime: (datetime) => {
      return util.dateFormat(datetime);
    },
  },
  watch: {
    isCreate(n, o) {
      if (!n) {
        this.form = {
          name: "",
          expression: "",
          type: "string",
          test: "",
          labels: [],
          result: "",
          creater: "",
        };
      } else {
        this.$refs["createRegular"].clearValidate();
      }
    },
  },
  methods: {
    getList() {
      let promise = this.$axios.post("/regular/list").then((res) => {
        if (res.status == 200) {
          this.list = res.data;
        }
      });
      return promise;
    },
    test(v, item) {
      //防抖
      util.debounce(this.testExec(v, item), 1000, true);
    },
    textExam() {
      //防抖
      util.debounce(this.testExec(this.form.test, this.form), 1000, true);
    },
    testExec(v, item) {
      if (/^\/.*\/$/.test(item.expression)) {
        item.expression = item.expression.substring(
          1,
          item.expression.length - 1
        );
      }
      let regularExpress = eval(`/${item.expression}/`);
      if (!v) {
        item.result = "";
        return;
      }
      if (regularExpress.test(v)) {
        item.result = "验证通过";
      } else {
        item.result = "验证失败";
      }
    },
    create() {
      this.isCreate = true;
    },
    closeTag(tag) {
      this.form.labels.splice(this.form.labels.indexOf(tag), 1);
    },
    inputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.labels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    save(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (/^\/.*\/$/.test(this.form.expression)) {
            this.form.expression = this.form.expression.substring(
              1,
              this.form.expression.length - 1
            );
          }
          let regularExpress = eval(`/${this.form.expression}/`);
          if (regularExpress.test(this.form.test)) {
          } else {
            this.$message.error("用正则表达式匹配测试数据失败");
            return;
          }
          this.$axios.post("/regular/create", this.form).then((res) => {
            if (res.status == 200) {
              self.$message.success("创建成功");
              self.getList();
              self.isCreate = false;
            } else {
              self.$message.error(res.msg || "创建失败");
            }
          });
        } else {
          return false;
        }
      });
    },
    search() {
      if (this.searchVal) {
        this.list = this.list.filter(
          (n) =>
            n.name.includes(this.searchVal) || n.label.includes(this.searchVal)
        );
      } else {
        this.list = this.backupList;
      }
    },
    doCopy(expression) {
      this.$copyText(expression).then(
        (e) => {
          console.log(e);
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
};
</script>

<style lang="scss">
.regular {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  margin: 0 auto;
  .red {
    color: #f56c6c;
    margin-left: 10px;
  }
  .green {
    color: #67c23a;
    margin-left: 10px;
  }
  &-header {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    padding: 10px;
  }
  &-nodata {
    text-align: center;
    padding: 20px;
  }
  width: 60%;
  padding: 20px;
  &-create {
    padding: 10px 0;
    .select {
      float: right;
      width: 300px;
    }
  }
  &-express {
    padding: 10px 0;
  }
  &-create {
    padding: 10px 0;
    font-size: 12px;
    color: #999999;
  }
  &-exam {
    padding: 10px 0;
    display: flex;
    align-items: center;
    .label {
      flex: 1;
    }
    .input {
      flex: 4;
    }
    .result {
      text-align: center;
      flex: 3;
    }
  }
  &-label {
    padding: 10px 0;
    .el-tag {
      margin-right: 10px;
    }
  }
  .el-card {
    margin-bottom: 20px;
  }
}
.regularCreate {
  .tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 0 5px 20px 30px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
