<template>
  <div class="detail">
    <div class="detail-base" v-for="(fItem,findex) in baseInfo" :key="findex">
      <div class="detail-base-header">{{fItem.name || "基本信息"}}</div>
      <div class="detail-base-content">
        <div class="detail-base-content-item" v-for="(item,index) in fItem.fields" :key="index">
          <template v-if="!item.showFalse || item.showFalse(fItem.fields) ">
            <div class="detail-base-content-item-label">{{item.name}}：</div>
            <!-- 渲染为el-tag组件 -->
            <div v-if="item.component == 'tag'" class="detail-base-content-item-value">
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
      type: Object,
    },
    detailName: {
      type: String,
      default: ''
    }
  },
  watch: {
    detailName(n, o) {
      if (n && n != o) {
        this.baseInfo = com.parseFields(n, this.infos);
      }
    }
  },
  computed: {
    baseInfo: function () {
      return com.parseFields(this.detailName, this.infos);
    },
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
