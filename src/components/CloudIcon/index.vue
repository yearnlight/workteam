<template>
  <div class="iconOperate">
    <el-button type="primary" icon="el-icon-s-flag" @click="isIcon = true">选择图标</el-button>
    <div class="iconOperate-icon">
      <svg-icon v-if="iconItem &&iconItem.name" class="icon-svg" :icon-class="iconItem.name" />
      <span class="icon-name" v-if="iconItem && iconItem.name">{{iconItem.name}}</span>
    </div>
    <el-dialog append-to-body custom-class="icons" title="云计算图标素材" :visible.sync="isIcon" :close-on-click-modal="false" :width="'800px'">
      <div class="icons-content">
        <div class="icons-content-list">
          <div @click="saveIcon(item)" :class="[{'active':iconItem && (iconItem.name == item.name)},'li']" v-for="(item,index) in icons" :key="index">
            <svg-icon v-if="item.useType == 'svg-icon'" class="icon-svg" :icon-class="item.name" />
            <img v-else src="" />
            <span class="icon-name">{{item.name}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const req = require.context('@/icons/svg', false, /\.svg$/);

const requireAll = requireContext => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const Icons = requireAll(req).map(i => {
  return i.match(re)[1]
});
export default {
  props: {
    iconName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      iconItem: null,
      isIcon: false,
      icons: []
    }
  },
  created() {
    this.icons = Icons.map(m => {
      return { name: m, suffix: ".svg", useType: "svg-icon" }
    })
    this.iconItem = this.$util.deepCopy({ name: this.iconName });
  },
  watch: {
    iconName(n, o) {
      if (n) {
        this.iconItem = this.$util.deepCopy({ name: n });
      }
    }
  },
  methods: {
    saveIcon(item) {
      this.isIcon = false;
      this.iconItem = item;
      this.$emit('selectIcon', item)
    },
  }
}
</script>

<style scoped lang="scss">
.iconOperate {
  display: flex;
  align-items: center;
  &-icon {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .icon-svg {
      border: 1px solid #eee;
      padding: 10px;
      margin-top: 10px;
      width: 60px !important;
      height: 60px !important;
      color: #5cb6ff;
    }
    .icon-name {
      padding: 5px;
      color: #5cb6ff;
    }
  }
}

.icons {
  &-content {
    height: 500px;
    overflow-y: auto;
    &-list {
      overflow: hidden;
      padding: 0 !important;
      border: 1px solid #eaeefb;
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      .li {
        &.active {
          color: #5cb6ff;
        }
        display: flex;
        width: calc(20% - 21px);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #666;
        font-size: 13px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        padding: 10px;
        .icon-name {
          display: inline-block;
          padding: 3px;
        }
        .icon-svg {
          width: 60px !important;
          height: 60px !important;
        }
        &:hover {
          color: #5cb6ff;
        }
      }
    }
  }
}
</style>