<template>
  <div class="cloudTable">
    <serach-form :config="searchConfig" ref="search-form" v-if="defaultConfig.search && searchConfig &&searchConfig.labels " :ispublic="defaultConfig.isPublic" :name="mapName"></serach-form>
    <div class="cloudTable-operate">
      <div class="operate-left">
        <slot></slot>
      </div>
      <div :class="[{'noExtraPlace':!defaultConfig.setting},'operate']" v-if="defaultConfig.setting">
        <!-- 下载Excel -->
        <el-button title="下载Excel" type="default" @click="download" v-if="defaultConfig.isDownload" icon="el-icon-download"></el-button>
        <!-- 自定义列 -->
        <el-button title="自定义表格列" type="default" @click="set" icon="el-icon-setting"></el-button>
        <!-- 刷新表格 -->
        <el-button title="刷新表格" type="default" @click="search()" icon="el-icon-refresh"></el-button>
      </div>
    </div>
    <el-table tooltip-effect="light" border style="width: 100%" ref="multipleTable" :data="data.records" :row-key="getRowKeys" :height="defaultConfig.height" v-bind="tableAttributes" @selection-change="multipleItems" @select="selectCheckBox" @cell-click="cellClick">
      <!-- index -->
      <el-table-column align="center" v-if="indexColumn.type && indexColumn.type == 'index'" :type="indexColumn.type" :width="indexColumn.width || '45'" :label="indexColumn.label">
      </el-table-column>
      <!-- checkbox -->
      <el-table-column align="center" v-if="indexColumn.type && indexColumn.type == 'selection'" :type="indexColumn.type" :width="indexColumn.width || '45'" :label="indexColumn.label" :selectable="handleSelect" reserve-selection>
      </el-table-column>
      <!-- radio -->
      <el-table-column align="center" v-if="indexColumn.type == 'radio'" label width="45">
        <template slot-scope="scope">
          <el-radio @change="singleItem(scope.row)" class="radio" v-model="selectIndex" :label="scope.$index" :disabled="scope.row.disabled">
            <span class="radio-label"></span>
          </el-radio>
        </template>
      </el-table-column>

      <el-table-column :fixed="(item.operateFun && Array.isArray(item.operateFun)) || item.isOperate?'right':null" v-bind="item" v-for="(item,index) in activeColumns" :key="index" :width="item.width">
        <template slot-scope="scope">

          <!-- 跳转列 -->
          <div class="operate operate-info" v-if="item.operateFun && !Array.isArray(item.operateFun)">
            <div class="comtext" style="font-size:12px;" @click="operate(scope.row,item.operateFun.function)" type="primary">{{scope.row[item.prop] | handleEmpty}}</div>
            <span style="color:#999" v-if="item.hasIdLabel">{{`(${scope.row[item.hasIdLabel]})`}}</span>
          </div>

          <!-- 最后一列操作类 -->
          <span class="operate" v-else-if="item.operateFun && Array.isArray(item.operateFun)">
            <span v-for="(oItem,oIndex) in item.operateFun" :key="oIndex">
              <span v-if="oItem.isDisplay">
                <span v-if="(typeof oItem.isDisplay === 'function')?oItem.isDisplay(scope.row):getPermission(name,oItem.isDisplay)">
                  <!-- 没有状态控制，一直启用 -->
                  <el-button v-if="!oItem.isEnabled" :key="oIndex" type="text" size="small" :title="oItem.title" @click="operate(scope.row,oItem.function,scope.$index)">
                    <i style="margin-right:3px;" v-if="oItem.icon" :class="oItem.icon" />{{oItem.label}}
                  </el-button>
                  <!-- 状态控制 -->
                  <el-button type="text" size="small" v-else :disabled="!oItem.isEnabled(scope.row)" :title="oItem.title" @click="operate(scope.row,oItem.function,scope.$index)">
                    <i style="margin-right:3px;" v-if="oItem.icon" :class="oItem.icon" />{{oItem.label}}
                  </el-button>
                  <el-divider direction="vertical" v-if="item.operateFun.length != oIndex + 1"></el-divider>
                </span>
              </span>
              <span v-else>
                <!-- 没有状态控制，一直启用 -->
                <el-button type="text" size="small" v-if="!oItem.isEnabled" :key="oIndex" :title="oItem.title" @click="operate(scope.row,oItem.function,scope.$index)">
                  <i style="margin-right:3px;" v-if="oItem.icon" :class="oItem.icon" />{{oItem.label}}
                </el-button>
                <!-- 状态控制 -->
                <el-button type="text" size="small" v-else :disabled="!oItem.isEnabled(scope.row)" :title="oItem.title" @click="operate(scope.row,oItem.function,scope.$index)">
                  <i style="margin-right:3px;" v-if="oItem.icon" :class="oItem.icon" />{{oItem.label}}
                </el-button>
                <el-divider direction="vertical" v-if="item.operateFun.length != oIndex + 1"></el-divider>
              </span>
            </span>
          </span>

          <!-- 自定义渲染 -->
          <div v-else-if="item.render" :id="`render_id_${scope.$index}_${inputParams.page}_${item.prop}`" v-html="item.render(scope.row,`render_id_${scope.$index}_${inputParams.page}_${item.prop}`) || '-'"></div>

          <!-- 自定义渲染template模式 -->
          <div v-else-if="item.renderPage">
            <slot :name="item.renderPage" :rowData="scope.row" :rowIndex="scope.$index"></slot>
          </div>

          <!-- input输入框渲染 -->
          <div v-else-if="item.renderInput">
            <slot :name="item.renderInput" :rowData="scope.row" :rowIndex="scope.$index"></slot>
          </div>

          <!-- el-tag根据枚举渲染 -->
          <el-tag v-else-if="item.enums  && item.enums[scope.row[item.prop]] && item.enums[scope.row[item.prop]].type && !item.enums[scope.row[item.prop]].component" :type="item.enums[scope.row[item.prop]].type">
            {{item.enums[scope.row[item.prop]].label}}
          </el-tag>

          <!-- dot根据枚举渲染 -->
          <dot v-else-if="item.enums  && item.enums[scope.row[item.prop]] && item.enums[scope.row[item.prop]].type && item.enums[scope.row[item.prop]].component == 'dot'" :level="item.enums[scope.row[item.prop]].type">
            {{item.enums[scope.row[item.prop]].label}}
          </dot>

          <!-- dot根据枚举渲染 -->
          <level v-else-if="item.enums  && item.enums[scope.row[item.prop]] && item.enums[scope.row[item.prop]].type && item.enums[scope.row[item.prop]].component == 'level'" :level="item.enums[scope.row[item.prop]].type">
            {{item.enums[scope.row[item.prop]].label}}
          </level>

          <!-- 枚举渲染 -->
          <span v-else-if="item.enums && item.enums[scope.row[item.prop]] && !item.enums[scope.row[item.prop]].type" :class="item.enums[scope.row[item.prop]].class">{{item.enums[scope.row[item.prop]].label}}</span>

          <!-- 常用渲染,如果设置show-overflow-tooltip，启用提示 -->
          <div class="comtext" v-else>{{scope.row[item.prop] || "-"}}</div>

        </template>
        <!-- 表头添加tooltip -->
        <template slot="header" slot-scope="scope">
          <span v-show="scope">{{item.label}}</span>
          <el-popover v-if="item.inputPopover" placement="right" trigger="hover" popper-class="reminder">
            <span>{{item.inputPopover}}</span>
            <el-button style="font-size:13px;" class="reminderBtn" type="text" slot="reference" icon="el-icon-warning-outline"></el-button>
          </el-popover>
        </template>
      </el-table-column>

      <template slot="empty">
        <no-data />
      </template>
    </el-table>
    <el-pagination v-if="defaultConfig.pagination" @size-change="sizeChange" @current-change="currentChange" :current-page="inputParams.page" :page-sizes="defaultConfig.pageSizes" :page-size="inputParams.limit" :total="data.total" layout="total, prev, pager, next,sizes, jumper"></el-pagination>
    <el-dialog title="自定义列表" :visible.sync="isSetColumn" custom-class="cloudtable-set">
      <div class="cloudtable-set-explain">
        选中：
        <span class="blue">{{t_all_columns.length}} / {{checked_t_props.length}}</span>，根据选中情况自定义列表展示
      </div>
      <div>
        <el-checkbox-group :min="2" v-model="checked_t_props">
          <el-checkbox v-for="(col,cIndex) in t_all_columns" :label="col.prop" :key="cIndex" :disabled="col.operateFun && Array.isArray(col.operateFun)">{{col.label}}</el-checkbox>
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
import SerachForm from "@/components/searchForm";
import com from "@/utils/common";
import util from "@/utils/index";
import t_fields from "@/common/t_fields";
export default {
  components: { SerachForm },
  props: {
    data: {
      type: Object,
    },
    columns: {
      type: Array,
    },
    tableConfig: {
      type: Object,
    },
    name: {
      type: String,
    },
    tableAttributes: {
      type: Object,
    },
  },
  computed: {
    activeColumns: function () {
      return this.t_columns.filter(function (item) {
        return item.isvisible !== false && item.prop;
      });
    },
    tableName: function () {
      let result = this.name;
      if (this.name) {
        if (this.name.endsWith("info") || this.name.endsWith("self")) {
          result = this.name;
        } else {
          result = `${this.name}_${this.defaultConfig.pagination ? "page" : "list"
            }`;
        }
      }
      return result;
    },
  },
  data() {
    return {
      defaultConfig: {
        isDownload: false,//是否下载Excel
        setting: true,
        pagination: true,
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 10,
        search: true,
        isPublic: false,
      },
      searchConfig: {},
      isSetColumn: false,
      inputParams: {
        page: 1,
        limit: 10,
      },
      indexColumn: {},
      selectIndex: "",
      selectItems: [],
      selectItem: "",
      t_columns: [],
      t_all_columns: [],
      checked_t_props: [],
      clone_checked_t_props: [],
      allDicts: {},
      dicts: {},
      //      menuName: "",
      mapName: "",
    };
  },
  created() {
    this.mapName = this.name;
    if (this.name) {
      this.dicts = this.allDicts[this.name];
    }

    this.defaultConfig = Object.assign(this.defaultConfig, this.tableConfig || t_fields[this.name].tableConfig);
    this.inputParams.page = 1;
    this.inputParams.limit = this.defaultConfig.pageSize;
    this.init();
  },
  watch: {
    data: {
      handler(n, o) { },
      immediate: true, //关键
      deep: true,
    },
    columns: {
      handler(n, o) {
        if (n) {
          this.init();
        }
      },
      immediate: true, //关键
      deep: true,
    },
    tableConfig: {
      handler(n, o) {
        this.defaultConfig = Object.assign(
          this.defaultConfig,
          this.tableConfig || t_fields[this.name].tableConfig
        );
        this.inputParams.limit = this.defaultConfig.pageSize;
      },
      immediate: true, //关键
      deep: true,
    },
  },
  methods: {
    download() {
      // 下载Excel走业务回调,如果业务中存在多个表格，以入参name区分处理
      if (this.$parent.download && typeof this.$parent.download === "function") {
        this.$parent.download(this.name);
      } else {
        this.$emit("download", this.name);
      }
    },
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
      this.checked_t_props = [];
      this.searchConfig = com.getSearchFormConfig(this.name);
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
          isExist = this.isOperateItemExist(item.operateFun);
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
        this.columns.filter((n) => n.prop || n.operateFun)
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

      this.t_columns = this.t_all_columns.filter((n) =>
        this.checked_t_props.includes(n.prop)
      );
      this.t_columns.forEach((n) => {
        n.isvisible === false ? (n.isvisible = true) : "";
      });
      // 备份当前选中
      this.clone_checked_t_props = util.deepCopy(this.checked_t_props);

      this.isSetColumn = false;
    },
    isOperateItemExist(operateFuns) {
      let isExist = false;
      //如果不定义isDisplay方法，则该操作不做权限控制，isDisplay是function类型
      let noControl = operateFuns.some((i) => !i.isDisplay);
      if (noControl) {
        return true;
      } else {
        isExist = operateFuns.some((i) =>
          typeof i.isDisplay == "function"
            ? i.isDisplay()
            : this.getPermission(this.name, i.isDisplay)
        );
        return isExist;
      }
    },
    getPermission(r, o) {
      r = (r + "").toUpperCase();
      return com.isHasPermission(r, o);
    },
    multipleItems(items) {
      this.selectItems = items;
      if (
        this.$parent.selectChange &&
        typeof this.$parent.selectChange === "function"
      ) {
        this.$parent.selectChange(items);
      } else {
        this.$emit("selectChange", items);
      }
    },
    singleItem(item) {
      this.selectItem = item;
      this.$emit("singleItem", { item });
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
      // this.data.loading = true;
      let inputParams = {};
      // 查询操作
      if (params) {
        inputParams = Object.assign(this.inputParams, params);
        inputParams.page = 1;
        if (this.defaultConfig.isPublic) {
          Object.keys(inputParams).forEach((item) => {
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
        limit: this.defaultConfig.pageSize,
      };
      this.search(this.inputParams);
    },
    sizeChange(size) {
      this.inputParams.page = 1;
      this.inputParams.limit = size;
      this.search();
    },
    currentChange(index) {
      this.inputParams.page = index;
      this.search();
    },
    switchChange(row) {
      if (
        this.$parent.switchChange &&
        typeof this.$parent.switchChange === "function"
      ) {
        this.$parent.switchChange(row);
      } else {
        this.$emit("switchChange");
      }
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
    },
    getRowKeys(row) {
      return row.uuid || row.id
    },
    clearRadio() {
      this.selectItem = "";
      this.selectIndex = "";
    }
  },
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
    }
    .comtext {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .operate {
      /* 详情跳转列 */
      &-info {
        .comtext {
          &:hover {
            color: #66b1ff;
            border-color: transparent;
            background-color: transparent;
          }
        }
        min-width: auto;
      }
      min-width: 125px;
      color: #409eff;
      cursor: pointer;
      &-disabled {
        color: #606266;
        cursor: no-drop;
        pointer-events: none;
        opacity: 0.5;
      }
    }
    .radio-label {
      padding: 0;
      margin: 0;
    }
  }
  .el-pagination {
    text-align: right;
    margin-top: 5px;
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
