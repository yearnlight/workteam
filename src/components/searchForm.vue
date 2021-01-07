<template>
  <div class="search">
    <el-form :inline="true" ref="elform" :model="searchConfig.inputParams" @submit.native.prevent>
      <div class="search-items" v-if="searchConfig.labels && searchConfig.labels.length">
        <el-form-item v-if="!item.hide && getEnabled(item) " :label="item.name" v-for="(item,index) in searchConfig.labels" :key="index" :class="{'haveLabel':item.name,'noLabel':!item.name}" :style="`width:${item.width}px`">
          <el-select v-if="item.type == 'select' && item.data != 'map'" v-model="searchConfig.inputParams[item.field]" :placeholder="`${item.placeholder || '请选择'}`" clearable filterable>
            <el-option :label="Array.isArray(item.data)?sitem.label:sitem[item.data.labelName]" :value="Array.isArray(item.data)?sitem.value:sitem[item.data.valueName]" v-for="(sitem,sindex) in getSelectData(item.data)" :key="sindex"></el-option>
          </el-select>

          <el-select v-else-if="item.type == 'select' && item.data == 'map'" v-model="searchConfig.inputParams[item.field]" :placeholder="`${item.placeholder || '请选择'}`" clearable filterable>
            <el-option :label="item.valueName" :value="index" v-for="(item,index) in dicts[item.field]" :key="index">
            </el-option>
          </el-select>
          <el-date-picker v-else-if="item.type == 'datetime'" v-model="searchConfig.inputParams[item.field]" type="datetime" clearable :placeholder="`${item.placeholder || '请选择日期时间'}`"></el-date-picker>
          <el-input v-else @keyup.enter.native="search" clearable v-model="searchConfig.inputParams[item.field]" :placeholder="`${item.placeholder || '请输入'}`"></el-input>
        </el-form-item>
      </div>
      <div class="search-operate" v-if="searchConfig.labels && searchConfig.labels.length">
        <el-button type="primary" @click="search">
          <icon iconSymbol="search" /> 查询</el-button>
        <el-button type="default" @click="reset">
          <icon iconSymbol="reset" /> 重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    },
    ispublic: {
      type: Boolean
    },
    name: {
      type: String
    },
  },
  data() {
    return {
      searchConfig: {},
      allDicts: {},
      dicts: {},
      //      menuName: "",
    };
  },
  created() {
    if (this.name) {
      this.dicts = this.allDicts[this.name];
    }
    this.searchConfig = this.config || {};
    //初始化清空入参 为什么要情况入参？如果有默认值情况；测试
    // this.searchConfig.inputParams = {};
  },
  methods: {
    getEnabled(item) {
      let flag = true;
      if (item.role) {
        if (this.$store.state.currentUserRole == 1) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = true;
      }
      return flag;
    },
    search() {
      if (this.ispublic) {
        this.$parent.search(this.searchConfig.inputParams);
      } else {
        let searchDTOList = [];
        // 普通接口不组装成searchDTOList结构
        if (this.searchConfig.noPackage) {
          this.$parent.search(this.searchConfig.inputParams);
        } else {
          Object.keys(this.searchConfig.inputParams).forEach(item => {
            if (this.searchConfig.inputParams[item]) {
              searchDTOList.push({
                key: item,
                value: this.searchConfig.inputParams[item],
                connector: this.getConnector(item)
              });
            }
          });
          this.$parent.search({
            searchDTOList
          });
        }
      }
    },
    getConnector(value) {
      let connector = 0;
      this.searchConfig.labels.forEach(item => {
        if (value === item.field) {
          connector = item.connector ? item.connector : 0;
        }
      });
      return connector;
    },
    reset() {
      this.searchConfig.inputParams = {};
      if (typeof this.$parent.reset === "function") {
        this.$parent.reset();
      }
    },
    getSelectData(data) {
      if (Array.isArray(data)) {
        return data;
      } else {
        if (data.type === "store") {
          // return this.$store.state[data.dataKey] || [];
          return [];
        } else if (data.type === "request") {
          //  return function();
        } else if (data.type === "enums") {
          // 获取enums
        }
      }
    }
  }
};
</script>

<style lang="scss">
.search {
  .el-form {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    .search-items {
      text-align: right;
      .el-form-item {
        margin-bottom: 10px;
        &.haveLabel {
          .el-form-item__content {
            width: 200px;
            .el-input {
              width: 100% !important;
            }
          }
        }

        &.noLabel {
          .el-form-item__content {
            width: 100%;
            .el-input {
              width: 100% !important;
            }
          }
        }
      }
    }
  }
  &-operate {
    min-width: 155px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .el-form-item__label {
  }
}
</style>
