<template>
  <div class="cloudTable">
    <div class="cloudTable-operate">
      <div class="operate-left">
        <slot></slot>
      </div>
      <div
        :class="[{'noExtraPlace':!defaultConfig.setting},'operate']"
        v-if="defaultConfig.setting"
      >
        <el-button type="default" @click="set" icon="el-icon-setting"></el-button>
        <el-button type="default" @click="search()" icon="el-icon-refresh"></el-button>
      </div>
    </div>
    <el-table
      :data="data.records"
      row-key="uuid"
      border=""
      style="width: 100%"
      ref="multipleTable"
      :height="defaultConfig.height"
      @selection-change="multipleItems"
      @select="selectCheckBox"
      @cell-click="cellClick"
      v-bind="tableAttributes"
    >
      <!-- index -->
      <el-table-column
        v-if="indexColumn.type && indexColumn.type == 'index'"
        :type="indexColumn.type"
        :width="indexColumn.width || '50'"
        :label="indexColumn.label"
      ></el-table-column>
      <!-- checkbox -->
      <el-table-column
        v-if="indexColumn.type && indexColumn.type == 'selection'"
        :type="indexColumn.type"
        :width="indexColumn.width || '50'"
        :label="indexColumn.label"
        :selectable="handleSelect"
        reserve-selection
      ></el-table-column>
      <!-- radio -->
      <el-table-column v-if="indexColumn.type == 'radio'" label="" width="65">
        <template slot-scope="scope">
          <el-radio
            @change="singleItem(scope.row)"
            class="radio"
            v-model="selectIndex"
            :label="scope.$index"
          >
            <span class="radio-label"></span>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-bind="item"
        v-for="(item,index) in activeColumns"
        :key="index"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!-- 跳转列 -->
          <span class="operate" v-if="item.operateFun && !Array.isArray(item.operateFun)">
            <el-link
              @click="operate(scope.row,item.operateFun.function)"
              type="primary"
            >{{scope.row[item.prop]}}</el-link>
          </span>
          <!-- 最后一列操作类 -->
          <span class="operate" v-else-if="item.operateFun && Array.isArray(item.operateFun)">
            <span v-for="(oItem,oIndex) in item.operateFun" :key="oIndex">
              <span v-if="oItem.isDisplay">
                <span
                  v-if="(typeof oItem.isDisplay === 'function')?oItem.isDisplay(scope.row):oItem.isDisplay"
                >
                  <!-- 没有状态控制，一直启用 -->
                  <el-button
                    v-if="!oItem.isEnabled"
                    :key="oIndex"
                    type="text"
                    limit="small"
                    :title="oItem.title"
                    @click="operate(scope.row,oItem.function,scope.$index)"
                    :icon="oItem.icon"
                  >{{oItem.label}}</el-button>
                  <!-- 状态控制 -->
                  <el-button
                    type="text"
                    limit="small"
                    v-else
                    :class="[{'':oItem.isEnabled(scope.row),'operate-disabled':!oItem.isEnabled(scope.row)}]"
                    :title="oItem.title"
                    @click="operate(scope.row,oItem.function,scope.$index)"
                    :icon="oItem.icon"
                  >{{oItem.label}}</el-button>
                </span>
              </span>
              <span v-else>
                <!-- 没有状态控制，一直启用 -->
                <el-button
                  type="text"
                  limit="small"
                  v-if="!oItem.isEnabled"
                  :key="oIndex"
                  :title="oItem.title"
                  @click="operate(scope.row,oItem.function,scope.$index)"
                  :icon="oItem.icon"
                >{{oItem.label}}</el-button>
                <!-- 状态控制 -->
                <el-button
                  type="text"
                  limit="small"
                  v-else
                  :class="[{'':oItem.isEnabled(scope.row),'operate-disabled':!oItem.isEnabled(scope.row)}]"
                  :title="oItem.title"
                  @click="operate(scope.row,oItem.function,scope.$index)"
                  :icon="oItem.icon"
                >{{oItem.label}}</el-button>
              </span>
              <el-divider
                direction="vertical"
                v-if="item.operateFun.length != oIndex + 1 && (oItem.isDisplay && oItem.isDisplay(scope.row))"
              ></el-divider>
            </span>
          </span>
          <!-- 自定义渲染 -->
          <div v-else-if="item.renderPage">
            <slot :name="item.renderPage" :rowData="scope.row"></slot>
          </div>
          <!-- 常用渲染 -->
          <span
            v-else-if="(scope.row[item.prop] === 0) || (scope.row[item.prop] === false) || scope.row[item.prop]"
          >
            <el-tag
              v-if="(item.enums  && item.enums[scope.row[item.prop]]) && item.enums[scope.row[item.prop]].type"
              :type="item.enums[scope.row[item.prop]].type"
            >{{item.enums[scope.row[item.prop]].label}}</el-tag>
            <span
              v-else-if="(item.enums  && item.enums[scope.row[item.prop]]) && !item.enums[scope.row[item.prop]].type"
              :class="item.enums[scope.row[item.prop]].class"
            >{{item.enums[scope.row[item.prop]].label}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </span>
          <span v-else></span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="defaultConfig.pagination"
      @size-change="sizeChange"
      @page-change="currentChange"
      :page-page="inputParams.page"
      :page-sizes="defaultConfig.pageSizes"
      :page-size="inputParams.limit"
      :total="data.total"
      layout="total, prev, pager, next,sizes, jumper"
    ></el-pagination>
    <el-dialog title="自定义列表" :visible.sync="isSetColumn" custom-class="cloudtable-set">
      <div class="cloudtable-set-explain">
        选中：
        <span class="blue">{{t_all_columns.length}} / {{checked_t_props.length}}</span>，根据选中情况自定义列表展示
      </div>
      <div>
        <el-checkbox-group :min="2" v-model="checked_t_props">
          <el-checkbox
            v-for="(col,cIndex) in t_all_columns"
            :label="col.prop"
            :key="cIndex"
            :disabled="col.operateFun && Array.isArray(col.operateFun)"
          >{{col.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSet">取 消</el-button>
        <el-button type="primary" @click="saveSet">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from "@/utils/index";
import t_fields from "@/common/t_fields";
export default {
  components: {},
  props: {
    data: {
      type: Object
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableConfig: {
      type: Object
    },
    name: {
      type: String
    },
    tableAttributes: {
      type: Object
    }
  },
  computed: {
    activeColumns: function() {
      return this.t_columns.filter(function(item) {
        return item.isvisible !== false && item.prop;
      });
    },
    tableName: function() {
      let result = this.name;
      if (this.name) {
        if (this.name.endsWith("info") || this.name.endsWith("self")) {
          result = this.name;
        } else {
          result = `${this.name}_${
            this.defaultConfig.pagination ? "page" : "list"
          }`;
        }
      }
      return result;
    }
  },
  data() {
    return {
      defaultConfig: {
        setting: true,
        pagination: true,
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 10,
        search: true,
        isPublic: false
      },
      isSetColumn: false,
      inputParams: {
        page: 1,
        limit: 10
      },
      indexColumn: {},
      selectIndex: "",
      selectItems: [],
      selectItem: "",
      t_columns: [],
      t_all_columns: [],
      checked_t_props: [],
      clone_checked_t_props: []
    };
  },
  created() {
    this.defaultConfig = Object.assign(this.defaultConfig, this.tableConfig);
    this.inputParams.page = 1;
    this.inputParams.limit = this.defaultConfig.pageSize;
    this.init();
  },
  watch: {
    data: {
      handler(n, o) {},
      immediate: true, //关键
      deep: true
    },
    tableConfig: {
      handler(n, o) {
        this.defaultConfig = Object.assign(
          this.defaultConfig,
          this.tableConfig
        );
        this.inputParams.limit = this.defaultConfig.pageSize;
      },
      immediate: true, //关键
      deep: true
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },
    clearSelection() {
      this.$refs["multipleTable"].clearSelection();
    },
    toggleRowSelection(row) {
      this.$refs["multipleTable"].toggleRowSelection(row);
    },
    init() {
      if (!(this.columns && this.columns.length)) {
        this.columns = t_fields[this.name].tableColumns;
      }
      this.columns.forEach((item, index) => {
        // index radio selection
        if (item.type) {
          this.indexColumn = item;
        }
        // 操作列
        let isExist = true;
        if (item.operateFun && Array.isArray(item.operateFun)) {
          // isExist = this.isOperateItemExist(item.operateFun);
          if (!isExist) {
            this.columns.splice(index, 1);
          }
        }
        if (
          isExist &&
          (item.prop || item.operateFun) &&
          item.isvisible !== false
        ) {
          this.checked_t_props.push(item.prop);
        }
      });

      this.t_columns = this.columns;
      // 备份
      this.t_all_columns = util.deepCopy(
        this.columns.filter(n => n.prop || n.operateFun)
      );
      // 备份当前选中
      this.clone_checked_t_props = util.deepCopy(this.checked_t_props);
    },
    set() {
      this.isSetColumn = true;
    },
    cancelSet() {
      this.isSetColumn = false;
      this.checked_t_props = this.clone_checked_t_props;
    },
    saveSet() {
      if (this.checked_t_props.length < 2) {
        this.$message.warning("表格至少显示两列");
        return;
      }

      this.t_columns = this.t_all_columns.filter(n =>
        this.checked_t_props.includes(n.prop)
      );
      this.t_columns.forEach(n => {
        n.isvisible === false ? (n.isvisible = true) : "";
      });
      // 备份当前选中
      this.clone_checked_t_props = util.deepCopy(this.checked_t_props);

      this.isSetColumn = false;
    },
    isOperateItemExist(operateFuns) {
      let isExist = false;
      //如果不定义isDisplay方法，则该操作不做权限控制，isDisplay是function类型
      let noControl = operateFuns.some(i => !i.isDisplay);
      if (noControl) {
        return true;
      } else {
        isExist = operateFuns.some(
          i => (typeof i.isDisplay == "function" ? i.isDisplay() : true)
        );
        return isExist;
      }
    },
    multipleItems(items) {
      this.selectItems = items;
    },
    singleItem(item) {
      this.selectItem = item;
    },
    cellClick(row, column, cell, event) {
      this.$emit("cellClick", { row, column, cell, event });
    },
    operate(item, fun, index) {
      if (this.$parent[fun] && typeof this.$parent[fun] === "function") {
        this.$parent[fun](item, index);
      } else {
        this.$emit(fun, item, index);
      }
    },
    search(params) {
      let inputParams = {};
      // 查询操作
      if (params) {
        inputParams = Object.assign(this.inputParams, params);
        inputParams.page = 1;
        if (this.defaultConfig.isPublic) {
          Object.keys(inputParams).forEach(item => {
            if (!(inputParams[item] === 0 || inputParams[item])) {
              delete inputParams[item];
            }
          });
        }
      } else {
        // 刷新操作
        inputParams = this.inputParams;
      }
      if (this.$parent.search && typeof this.$parent.search === "function") {
        this.$parent.search(inputParams, this.name);
      } else {
        this.$emit("search", inputParams, this.name);
      }

      //单选table，重新查询后，上一次选中数据重置
      if (this.indexColumn.type == "radio") {
        this.selectIndex = "";
        this.selectItem = "";
      }
    },
    reset() {
      // 清理搜索条件
      this.inputParams = {
        page: 1,
        limit: this.defaultConfig.pageSize
      };
      this.search(this.inputParams);
    },
    sizeChange(limit) {
      this.inputParams.page = 1;
      this.inputParams.limit = limit;
      this.search();
    },
    currentChange(index) {
      this.inputParams.page = index;
      this.search();
    },
    selectCheckBox(selection, row) {
      if (
        this.$parent.selectCheckBox &&
        typeof this.$parent.selectCheckBox === "function"
      ) {
        this.$parent.selectCheckBox(selection, row);
      } else {
        this.$emit("selectCheckBox", { selection, row });
      }
    },
    handleSelect(row) {
      return !row.selected;
    }
  }
};
</script>

<style lang="scss">
.noExtraPlace {
  padding: 0 !important;
  margin: 0 !important;
}
.cloudTable {
  width: 100%;
  .el-tag {
    margin-bottom: 5px;
  }
  &-operate {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .operate-left {
      width: calc(100% - 90px);
    }
    .operate {
      width: 70px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      .el-button {
        padding: 5px;
      }
    }
  }
  .el-table {
    th {
      background: #f5f7fa !important;
      color: #606266;
      border-bottom: 1px solid #dcdfe6 !important;
    }
    .operate {
      min-width: 125px;
      cursor: pointer;
      &-disabled {
        opacity: 0.5;
      }
    }
    .radio-label {
      padding: 0;
      margin: 0;
    }
  }

  .el-pagination {
    float: right;
    padding: 10px;
  }
}
.cloudtable-set {
  .el-dialog__body {
    padding: 15px 20px;
    &-explain {
      margin-bottom: 10px;
    }
    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      .el-checkbox {
        width: 25%;
        padding: 10px 0;
        margin-right: 0;
      }
    }
  }
}

.add-table-pagination-set {
  .el-pagination .el-select {
    width: 110px !important;

    &el-input {
      width: 100px !important;
      margin: 0 5px !important;
    }
  }
}
</style>
