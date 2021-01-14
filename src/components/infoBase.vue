<template>
  <div class="detail">
    <div class="detail-base" v-for="(fItem,findex) in baseInfo" :key="findex">
      <div class="detail-base-header">{{fItem.name || "基本信息"}}</div>
      <div class="detail-base-content">
        <div class="detail-base-content-item" v-for="(item,index) in fItem.fields" :key="index">
          <template v-if="!item.showFalse || item.showFalse(fItem.fields) ">
            <div class="detail-base-content-item-label">{{item.name}}：</div>
            <!-- 渲染为el-tag组件 -->
            <div v-if="item.component == 'el-tag'" class="detail-base-content-item-value">
              <el-tag v-if="item.value" :type="item.type||''">{{item.value}}</el-tag>
              <span v-else></span>
            </div>
            <!-- 渲染为dot组件 -->
            <div v-else-if="item.component == 'dot'" class="detail-base-content-item-value">
              <dot v-if="item.value" :level="item.type||''">{{item.value}}</dot>
              <span v-else></span>
            </div>
            <!-- 渲染为level组件 -->
            <div v-else-if="item.component == 'level'" class="detail-base-content-item-value">
              <level v-if="item.value" :level="item.type||''">{{item.value}}</level>
              <span v-else></span>
            </div>
            <!-- 渲染为tag组件 -->
            <div v-else-if="item.component == 'tag'" class="detail-base-content-item-value">
              <tag v-if="item.value" :type="item.type||''">{{item.value}}</tag>
              <span v-else></span>
            </div>
            <!-- 自定义渲染template -->
            <div v-else-if="item.renderPage" class="detail-base-content-item-value">
              <slot :name="item.renderPage" :param="item.value"></slot>
            </div>
            <!-- render自定义渲染 -->
            <div v-else-if="item.render" class="detail-base-content-item-value" v-html="item.render(item.value,`render_id_${findex}_${index}`)"></div>
            <div v-else class="detail-base-content-item-value">{{item.value | handleEmpty}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import com from "@/utils/common.js";
export default {
  props: {
    infos: {
      type: Object
    },
    detailName: {
      type: String,
      default: ''
    },
    detailColumns: {
      type: Array
    }
  },
  data() {
    return {
      baseInfo: []
    }
  },
  watch: {
    detailName(n, o) {
      // 详情配置未传入时，用组件Code去获取配置
      if (n && n != o && !this.detailColumns) {
        this.baseInfo = com.parseFields(n, this.infos);
      }
    },
    detailColumns(n, o) {
      if (n) {
        this.baseInfo = this.parseFields(n, this.infos)
      }
    }
  },
  created() {
    let that = this;
    //传入详情配置时，用当前详情配置渲染;
    if (that.detailColumns) {
      that.baseInfo = this.parseFields(that.detailColumns, that.infos)
    }
    else if (that.detailName) {
      //未传入详情配置时，尝试用唯一Code在fields中去获取详情配置
      that.baseInfo = com.parseFields(that.detailName, that.infos);
    }
  },
  methods: {
    parseFields(detailColumns, resourceInfo) {
      let tempColumns = this.$util.deepCopy(detailColumns);
      if (resourceInfo) {
        tempColumns.forEach(dItem => {
          // 遍历字段
          if (Array.isArray(dItem.fields)) {
            // 对于页面显示但是详情没有返回的 字段没有处理，使其为空，会保留上一次的数据；且不需要双层循环
            dItem.fields.forEach(item => {
              if (item.key in resourceInfo) {
                if (item.enums) {
                  let _eValue = item.enums[resourceInfo[item.key]];
                  if (_eValue) {
                    item.value = _eValue.label || "";
                    // 当前属性配置为组件类型
                    if (_eValue.component) {
                      item.type = _eValue.type || undefined;
                      item.component = _eValue.component || undefined
                    }
                  }

                }
                else {
                  item.value = resourceInfo[item.key];
                }
              } else {
                item.value = "";
              }
            })
          }
        })
      }
      return tempColumns;
    }
  }
};
</script>

<style lang="scss">
.detail {
  &-base {
    border: 1px solid #eceff8;
    margin-bottom: 10px;
    padding: 10px 20px 0;
    &-header {
      font-size: 16px;
      line-height: 1;
      margin-top: 5px;
      margin-bottom: 25px;
      border-left: solid 4px #409eff;
      padding-left: 14px;
      vertical-align: middle;
    }
    &-content {
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      padding: 12px;
      .item-container {
        width: calc(50% - 20px);
      }
      &-item {
        width: calc(50% - 20px);
        padding: 10px 10px;
        display: flex;
        align-items: center;
        &-label {
          flex: 1;
          text-align: end;
          margin-right: 25px;
          color: #7f7f7f;
        }
        &-value {
          flex: 3;
        }
      }
    }
  }
}
</style>
